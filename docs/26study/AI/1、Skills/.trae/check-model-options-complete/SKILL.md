---
name: check-model-options-complete
description: 检查项目内产品机型枚举是否一致，包含 modelOptions/DEVICE_MODEL_OPTIONS/productModelList，以及 el-select 常见的 options: [...]（支持仅 label: "C1"/"C2" 的写法）。适用于改动机型枚举字段后快速扫描全项目并提示需要同步修改的文件。
---

# Check Model Options Complete

当项目里**产品机型枚举**发生变更时，用本技能做一次全仓库一致性检查，输出不一致的文件与差异（缺少/多出哪些机型）。

本技能会识别两类常见写法：

- `modelOptions` / `DEVICE_MODEL_OPTIONS` / `productModelList` 这类“明确命名”的枚举数组
- `el-select` 常见的 `options: [...]` 数组（即使对象里**只有** `label: "C1"` / `label: "C2"`，没有 `value`，也会被识别为机型枚举）

## 快速开始

在仓库根目录运行：

```bash
node .cursor/skills/check-model-options-complete/scripts/check-model-options.cjs
```

默认基准（source of truth）为：`src/components/constant.js` 里的 `DEVICE_MODEL_OPTIONS`。

## 使用方式（给 Agent 的工作流）

当用户说“我改了机型枚举 / modelOptions / DEVICE_MODEL_OPTIONS”等类似需求时：

1. 运行检查脚本：

   ```bash
   node .cursor/skills/check-model-options-complete/scripts/check-model-options.cjs
   ```

2. 如果输出 `MISMATCH`：
   - 先给出**基准机型列表**（baseline）。
   - 再逐个列出不一致的文件与差异：
     - **missing**：基准里有、该文件里没有
     - **extra**：该文件里有、基准里没有
   - 明确提示用户“这些文件可能需要一起改”。

3. 常见修复建议（按优先级）：
   - **优先统一使用基准常量**：把手写/局部拼接（例如 `...[DEVICE_MODEL_OPTIONS, { ... }]`）改成直接引用统一常量。
   - **确实需要新增机型**：先改 `src/components/constant.js` 的 `DEVICE_MODEL_OPTIONS`，再让所有引用方跟随，不要在各页面“偷偷加一项”。

## 可选参数

```bash
node .cursor/skills/check-model-options-complete/scripts/check-model-options.cjs --baseline src/components/constant.js
```

- `--baseline <path>`：指定基准文件（默认 `src/components/constant.js`）

## 输出示例（脚本格式约定）

- 一致：
  - `OK baseline=[C1,C2] checked=12`
- 不一致：
  - `MISMATCH baseline=[C1,C2]`
  - `- src/views/Tutorial.vue (modelOptions) extra=[U1]`
  - `- src/views/VersionDevice.vue (DEVICE_MODEL_OPTIONS) extra=[U1]`

