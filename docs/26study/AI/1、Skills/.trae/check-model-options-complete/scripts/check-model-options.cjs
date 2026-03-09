/* eslint-disable no-console */
/**
 * 扫描项目内机型枚举（modelOptions/DEVICE_MODEL_OPTIONS/productModelList）
 * 并与 baseline(默认 src/components/constant.js 的 DEVICE_MODEL_OPTIONS) 做一致性对比。
 *
 * 用法：
 *   node .cursor/skills/check-model-options-complete/scripts/check-model-options.cjs
 *   node .cursor/skills/check-model-options-complete/scripts/check-model-options.cjs --baseline src/components/constant.js
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_BASELINE = "src/components/constant.js";
const DEFAULT_KEYS = [
  "DEVICE_MODEL_OPTIONS",
  "modelOptions",
  "productModelList",
  // 常见：el-select 的 options: [...]
  "options"
];

function isLikelyModelCode(s) {
  // 机型码通常是 C1/C2/U1 这种短字母数字组合
  // 规则：
  // - 字母开头
  // - 必须包含至少 1 个数字（避免把 timeAsc / all 之类误判为机型）
  // - 总长度 2~8
  return /^(?=.{2,8}$)(?=.*\d)[A-Za-z][A-Za-z0-9]*$/.test(s);
}

function parseArgs(argv) {
  const args = { baseline: DEFAULT_BASELINE };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--baseline") {
      args.baseline = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function isIgnoredDir(name) {
  return (
    name === "node_modules" ||
    name === ".git" ||
    name === "dist" ||
    name === "output" ||
    name === ".claude" ||
    name === ".agents"
  );
}

function isTargetFile(filePath) {
  return filePath.endsWith(".js") || filePath.endsWith(".ts") || filePath.endsWith(".vue");
}

function walkFiles(rootDir) {
  /** @type {string[]} */
  const out = [];

  /** @type {string[]} */
  const stack = [rootDir];
  while (stack.length) {
    const cur = stack.pop();
    if (!cur) break;
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) {
        if (isIgnoredDir(ent.name)) continue;
        stack.push(full);
      } else if (ent.isFile()) {
        if (isTargetFile(full)) out.push(full);
      }
    }
  }
  return out;
}

function readTextSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

/**
 * 从 `startIndex` 开始，找到一个 `[` 开头的数组字面量，并返回完整片段（含括号）。
 * 用简易括号平衡 + 字符串/注释跳过，避免把 `]` 误判。
 */
function extractBalancedArrayLiteral(src, startIndex) {
  const start = src.indexOf("[", startIndex);
  if (start < 0) return null;

  let i = start;
  let depth = 0;
  let inStr = null; // "'" | '"' | "`"
  let inLineComment = false;
  let inBlockComment = false;

  for (; i < src.length; i += 1) {
    const ch = src[i];
    const next = src[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (inStr) {
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === inStr) {
        inStr = null;
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inStr = ch;
      continue;
    }

    if (ch === "[") depth += 1;
    if (ch === "]") depth -= 1;

    if (depth === 0) {
      return src.slice(start, i + 1);
    }
  }
  return null;
}

function uniqSorted(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function extractOptionValuesFromSnippet(snippet) {
  // 支持两类：
  // 1) value: "C1"
  // 2) label: "C1"（即使没有 value，也按机型枚举处理）
  const values = [];
  const addIfModelCode = (v) => {
    if (typeof v !== "string") return;
    if (!isLikelyModelCode(v)) return;
    values.push(v);
  };

  const valueRe = /\bvalue\s*:\s*(["'`])([^"'`]+)\1/g;
  const labelRe = /\blabel\s*:\s*(["'`])([^"'`]+)\1/g;

  let m;
  while ((m = valueRe.exec(snippet))) addIfModelCode(m[2]);
  while ((m = labelRe.exec(snippet))) addIfModelCode(m[2]);

  return uniqSorted(values);
}

function extractBaselineValues(baselineAbsPath) {
  const text = readTextSafe(baselineAbsPath);
  if (!text) return null;
  const src = stripBom(text);

  const idx = src.search(/\bDEVICE_MODEL_OPTIONS\b\s*=\s*\[/);
  if (idx < 0) return null;

  const snippet = extractBalancedArrayLiteral(src, idx);
  if (!snippet) return null;
  return extractOptionValuesFromSnippet(snippet);
}

function fileToRepoRel(repoRoot, absPath) {
  return path.relative(repoRoot, absPath).split(path.sep).join("/");
}

function findKeyArrayInText(text, key) {
  // 1) key = [ ... ] 或 const key = [ ... ] 或 export const key = [ ... ]
  // 2) key: [ ... ]（对象字面量里）
  const patterns = [new RegExp(`\\b${key}\\b\\s*=\\s*\\[`, "g"), new RegExp(`\\b${key}\\b\\s*:\\s*\\[`, "g")];

  /** @type {{key: string, index: number}[]} */
  const hits = [];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      hits.push({ key, index: m.index });
    }
  }
  return hits;
}

function extractAllOptionSets(repoRoot) {
  const files = walkFiles(repoRoot);
  /** @type {{file: string, key: string, values: string[], hasDeviceModelOptionsSpread: boolean}[]} */
  const sets = [];

  for (const abs of files) {
    const raw = readTextSafe(abs);
    if (!raw) continue;
    const text = stripBom(raw);

    for (const key of DEFAULT_KEYS) {
      const hits = findKeyArrayInText(text, key);
      for (const hit of hits) {
        const snippet = extractBalancedArrayLiteral(text, hit.index);
        if (!snippet) continue;
        const values = extractOptionValuesFromSnippet(snippet);
        const hasDeviceModelOptionsSpread =
          /\.\.\.\s*(?:(?:this|props)\s*\.)?\s*DEVICE_MODEL_OPTIONS\b/.test(snippet) ||
          /\.\.\.\s*DEVICE_MODEL_OPTIONS\b/.test(snippet);
        if (!values.length && !hasDeviceModelOptionsSpread) continue;

        // 对于通用 key=options，过滤掉与机型无关的 options 数组，降低误报：
        // - 至少包含一个“看起来像机型码”的 label/value 才纳入检查
        if (key === "options" && values.length === 0) continue;

        sets.push({
          file: fileToRepoRel(repoRoot, abs),
          key,
          values,
          hasDeviceModelOptionsSpread
        });
      }
    }

    // 额外：抓 `modelOptions: [...DEVICE_MODEL_OPTIONS, { value: "U1" }]` 这种“在基准上拼接”的场景
    // 这类不是完整数组字面量对象列表也能被上面的 balanced array 命中（因为还是 `[` 开头），所以无需单独处理。
  }

  return sets;
}

function diffSets(baseline, values) {
  const baseSet = new Set(baseline);
  const valSet = new Set(values);
  const missing = baseline.filter((v) => !valSet.has(v));
  const extra = values.filter((v) => !baseSet.has(v));
  return { missing, extra };
}

function main() {
  const repoRoot = process.cwd();
  const args = parseArgs(process.argv);
  const baselineAbs = path.resolve(repoRoot, args.baseline);

  const baseline = extractBaselineValues(baselineAbs);
  if (!baseline || baseline.length === 0) {
    console.error(`ERROR: 无法从 baseline 解析 DEVICE_MODEL_OPTIONS：${fileToRepoRel(repoRoot, baselineAbs)}`);
    process.exit(2);
  }

  const sets = extractAllOptionSets(repoRoot);
  const mismatches = [];

  for (const s of sets) {
    // baseline 文件里导出的 DEVICE_MODEL_OPTIONS 作为基准本体，不参与对比
    if (s.file === fileToRepoRel(repoRoot, baselineAbs) && s.key === "DEVICE_MODEL_OPTIONS") {
      continue;
    }
    const effectiveValues = s.hasDeviceModelOptionsSpread ? uniqSorted([...s.values, ...baseline]) : s.values;
    const { missing, extra } = diffSets(baseline, effectiveValues);
    if (missing.length || extra.length) {
      mismatches.push({ ...s, missing, extra });
    }
  }

  if (mismatches.length === 0) {
    console.log(`OK baseline=[${baseline.join(",")}] checked=${sets.length}`);
    return;
  }

  console.log(`MISMATCH baseline=[${baseline.join(",")}]`);
  for (const m of mismatches) {
    const parts = [];
    if (m.missing.length) parts.push(`missing=[${m.missing.join(",")}]`);
    if (m.extra.length) parts.push(`extra=[${m.extra.join(",")}]`);
    console.log(`- ${m.file} (${m.key}) ${parts.join(" ")}`.trim());
  }
  process.exit(1);
}

main();
