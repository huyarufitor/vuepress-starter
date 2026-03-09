#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * 快速扫描多维曲谱相关文件的“风险信号”：
 * - 行数（>1000 视为超长）
 * - watch / 监听 stop
 * - add/removeEventListener、$on/$off
 * - setInterval/clearInterval、setTimeout/clearTimeout
 * - requestAnimationFrame/cancelAnimationFrame
 *
 * 输出：Markdown（stdout）
 *
 * 用法：
 *   node .cursor/skills/multidimen-logic-closure-check/scripts/scan-multidimen-health.cjs
 *   node .../scan-multidimen-health.cjs --maxLines 1200
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { maxLines: 1000 };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--maxLines') {
      const v = Number(argv[i + 1]);
      if (!Number.isNaN(v) && v > 0) args.maxLines = v;
      i += 1;
    }
  }
  return args;
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

function isVueFile(p) {
  return p.endsWith('.vue');
}

function walk(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    if (!cur) break;
    let entries = [];
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const p = path.join(cur, ent.name);
      if (ent.isDirectory()) stack.push(p);
      else out.push(p);
    }
  }
  return out;
}

function countLines(text) {
  // 保持简单可靠：按 \n 计数，空文件算 0
  if (!text) return 0;
  return text.split('\n').length;
}

function countRegex(text, re) {
  const m = text.match(re);
  return m ? m.length : 0;
}

function fileReport(filePath, text, maxLines) {
  const lines = countLines(text);
  const metrics = [
    ['watch(', countRegex(text, /\bwatch\s*\(/g)],
    ['watch:', countRegex(text, /\bwatch\s*:\s*\{/g)],
    ['addEventListener', countRegex(text, /\baddEventListener\s*\(/g)],
    ['removeEventListener', countRegex(text, /\bremoveEventListener\s*\(/g)],
    ['$on(', countRegex(text, /\.\$on\s*\(/g)],
    ['$off(', countRegex(text, /\.\$off\s*\(/g)],
    ['setInterval', countRegex(text, /\bsetInterval\s*\(/g)],
    ['clearInterval', countRegex(text, /\bclearInterval\s*\(/g)],
    ['setTimeout', countRegex(text, /\bsetTimeout\s*\(/g)],
    ['clearTimeout', countRegex(text, /\bclearTimeout\s*\(/g)],
    ['requestAnimationFrame', countRegex(text, /\brequestAnimationFrame\s*\(/g)],
    ['cancelAnimationFrame', countRegex(text, /\bcancelAnimationFrame\s*\(/g)],
    ['onMounted', countRegex(text, /\bonMounted\s*\(/g)],
    ['onUnmounted', countRegex(text, /\bonUnmounted\s*\(/g)],
    ['beforeUnmount', countRegex(text, /\bbeforeUnmount\s*\(/g)],
    ['unmounted', countRegex(text, /\bunmounted\s*\(/g)],
    ['beforeDestroy', countRegex(text, /\bbeforeDestroy\s*\(/g)],
    ['destroyed', countRegex(text, /\bdestroyed\s*\(/g)],
  ];

  const pairs = Object.fromEntries(metrics);

  const warnings = [];
  if (lines >= maxLines) warnings.push(`超长文件（${lines} 行）`);

  // 粗略不平衡提示（只是信号，不代表一定泄漏）
  if (pairs.addEventListener > pairs.removeEventListener) warnings.push('事件监听可能未完全解绑（add > remove）');
  if (pairs.setInterval > pairs.clearInterval) warnings.push('定时器可能未完全清理（setInterval > clearInterval）');
  if (pairs.requestAnimationFrame > pairs.cancelAnimationFrame) warnings.push('RAF 可能未完全取消（request > cancel）');
  if (pairs['$on('] > pairs['$off(']) warnings.push('event bus 监听可能未完全注销（$on > $off）');

  // watch stop 很难静态判断，只提示存在 watch
  if (pairs['watch('] + pairs['watch:'] > 0) warnings.push('存在 watch：关注 stop/重复触发/深度监听开销');

  return { filePath, lines, pairs, warnings };
}

function rel(p) {
  return p.split(path.sep).join('/');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();

  const targets = [];
  const basicConfig = path.join(root, 'src/views/basicConfig.vue');
  if (exists(basicConfig)) targets.push(basicConfig);

  const multiDimenDir = path.join(root, 'src/views/MultiDimen');
  if (exists(multiDimenDir)) {
    for (const p of walk(multiDimenDir)) {
      if (isVueFile(p)) targets.push(p);
    }
  }

  if (targets.length === 0) {
    console.log('未找到目标文件：请确认路径 `src/views/basicConfig.vue` 与 `src/views/MultiDimen/` 是否存在。');
    process.exitCode = 1;
    return;
  }

  const reports = [];
  for (const p of targets) {
    let text = '';
    try {
      text = readText(p);
    } catch {
      continue;
    }
    reports.push(fileReport(p, text, args.maxLines));
  }

  reports.sort((a, b) => b.lines - a.lines);

  console.log('# MultiDimen 快速健康扫描（风险信号）');
  console.log('');
  console.log(`- 扫描范围：\`src/views/basicConfig.vue\`、\`src/views/MultiDimen/**/*.vue\``);
  console.log(`- 超长阈值：${args.maxLines} 行（仅提示，不代表必须拆）`);
  console.log(`- 文件数：${reports.length}`);
  console.log('');
  console.log('> 说明：以下输出是“风险信号索引”，不直接等价于 bug。最终请结合业务与生命周期逻辑人工确认。');
  console.log('');

  for (const r of reports) {
    const p = rel(path.relative(root, r.filePath));
    const warn = r.warnings.length ? `\n  - ⚠️ ${r.warnings.join('；')}` : '';
    console.log(`## \`${p}\``);
    console.log('');
    console.log(`- 行数：**${r.lines}**${r.lines >= args.maxLines ? '（≥阈值）' : ''}`);
    console.log('- 命中计数：');
    console.log(`  - watch: **${r.pairs['watch('] + r.pairs['watch:']}**（watch()=${r.pairs['watch(']}, watch:{}=${r.pairs['watch:']}）`);
    console.log(`  - add/removeEventListener: **${r.pairs.addEventListener}/${r.pairs.removeEventListener}**`);
    console.log(`  - $on/$off: **${r.pairs['$on(']}/${r.pairs['$off(']}**`);
    console.log(`  - setInterval/clearInterval: **${r.pairs.setInterval}/${r.pairs.clearInterval}**`);
    console.log(`  - setTimeout/clearTimeout: **${r.pairs.setTimeout}/${r.pairs.clearTimeout}**`);
    console.log(`  - RAF request/cancel: **${r.pairs.requestAnimationFrame}/${r.pairs.cancelAnimationFrame}**`);
    console.log(`  - mounted/unmounted 钩子命中：onMounted=${r.pairs.onMounted}, onUnmounted=${r.pairs.onUnmounted}, beforeUnmount=${r.pairs.beforeUnmount}, unmounted=${r.pairs.unmounted}, beforeDestroy=${r.pairs.beforeDestroy}, destroyed=${r.pairs.destroyed}`);
    if (warn) console.log(warn);
    console.log('');
  }
}

main();

