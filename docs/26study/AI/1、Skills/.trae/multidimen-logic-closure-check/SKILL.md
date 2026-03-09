---
name: multidimen-logic-closure-check
description: 检查多维曲谱（MultiDimen）相关 Vue 文件的逻辑闭合性与可维护性：方法/职责是否封装、是否存在冗余逻辑、复杂父子组件数据流是否应提取到 Vuex、watch/事件/定时器等监听是否在生命周期内正确开启与关闭、超长文件（>1000 行）是否需要抽离公共方法或拆分模块。适用于用户提到“多维曲谱/多维/ MultiDimen / 逻辑闭合性 / 父子组件数据调用 / 提取到 vuex / watch 监听 / 关闭监听 / 文件太长”等场景，并输出一份分析文档与对应代码调整提示。
---

# MultiDimen 逻辑闭合性检查

本技能用于对以下重点文件做**逻辑闭合性**审查与重构建议输出：

- `src/views/basicConfig.vue`
- `src/views/MultiDimen/**/*.vue`

“逻辑闭合性”在这里指：**副作用有完整生命周期**、**数据流有清晰归属**、**职责边界可解释**、**重复逻辑可复用**、**复杂度可拆解**。

## 快速开始（推荐）

在仓库根目录运行快速扫描脚本（生成 Markdown 摘要）：

```bash
node .cursor/skills/multidimen-logic-closure-check/scripts/scan-multidimen-health.cjs
```

脚本只做“提示风险点”，最终结论以人工审查为准。

## Agent 工作流（必须按此输出）

### 1) 明确审查范围

- 默认范围：`src/views/basicConfig.vue`、`src/views/MultiDimen/**/*.vue`
- 如果 `src/views/MultiDimen/components/MelodyTimeline.vue` 等文件超长，优先用“按主题定位”的方式审查（例如先找 watch/事件/定时器/数据流入口），不要从头到尾硬读。

### 2) 先跑扫描，再做定点深挖

1. 运行脚本获取风险索引（行数、watch、事件、定时器等）。
2. 对每个被标红或可疑的文件，按下面清单逐项核对，并补充“证据”（代码片段、调用链、数据流路径）。

### 3) 检查清单（按优先级）

#### A. 副作用是否闭合（监听/订阅/定时器/动画帧）

重点关注是否做到“创建即登记、销毁即清理”：

- watch / 监听：
  - Composition API：`watch()` 的 stop 是否在 `onUnmounted()`/`onBeforeUnmount()` 执行
  - Options API：watcher 是否会在组件销毁时自动清理（通常会），但**手动注册的监听**（如 event bus、window/document 事件）必须手动解绑
- 事件：
  - `addEventListener` 必须对应 `removeEventListener`
  - event bus：`$on` 必须对应 `$off`（或统一在 `beforeUnmount/beforeDestroy` 清理）
- 定时器/循环：
  - `setInterval`/`setTimeout` 必须 `clearInterval/clearTimeout`
  - `requestAnimationFrame` 必须 `cancelAnimationFrame`

输出时要回答：

- **谁创建的副作用**（函数/生命周期/条件分支）
- **何时清理**（对应钩子/回调）
- **是否存在重复注册**（例如每次打开弹窗都 `addEventListener`，但关闭不解绑）

#### B. 数据归属是否合理（父子组件复杂数据流是否应上收）

判断是否应提取到 Vuex（或至少抽成单一 store/模块）的信号：

- 同一份状态被多个组件读写（尤其是跨层级/跨兄弟）
- 通过多层 props 传递（>2 层）或频繁 `emit` 回传导致“数据回路”难追踪
- 为了同步状态引入大量 watch（例如 watch prop → 更新本地 → 再 emit）
- 需要被路由切换/弹窗打开关闭保留的状态，却散落在多个组件里

建议输出要落地：

- **建议的 state 归属**（例如 `multiDimen` 模块下的 `timeline`, `tracks`, `selection`, `playback` 等）
- **最小迁移路径**（先只上收 X/Y 两个共享状态 → 再替换其余派生逻辑）
- **替代方案**（如果不适合上 Vuex：抽 `useXXX` 组合函数 / 抽 `services/` 模块 / 提炼纯函数 utils）

#### C. 封装与冗余（方法调用是否应封装、重复逻辑是否可复用）

高风险信号：

- 一个方法/生命周期里做了过多职责（解析数据 + 计算 + DOM 操作 + 业务提交混在一起）
- 同类逻辑在多个组件重复（例如同一段“音轨/时间轴/标尺”计算散落多处）
- 组件之间“隐式耦合”（通过 `$parent`/`ref` 互相调用内部方法）

建议倾向：

- 把可测试的“纯计算”提炼为纯函数（`utils/`）
- 把可复用的“业务流程”提炼为 service（`services/`）
- 把 UI 层与数据层分离：组件只负责渲染和用户交互，计算/状态变更尽量集中

#### D. 超长文件拆分（>1000 行）

当单文件逻辑代码超过 1000 行（或明显难以导航）时，必须输出：

- **拆分建议**：按领域拆（例如 timeline / grid / notes / playback / selection / io）
- **抽公共方法**：把重复的计算、映射、格式化、边界处理抽到共享函数
- **减少跨区变量共享**：降低“全文件范围变量”耦合（尤其是多个函数读写同一对象）

拆分原则：优先“抽纯函数/抽模块”而不是无意义地拆组件。

### 4) 输出格式（必须）

产出一个 Markdown 分析文档，结构严格按模板（见 `REPORT_TEMPLATE.md`）：

- **范围与结论**（含总体风险等级）
- **逐文件发现**（每条包含：现象、证据、影响、建议、改动点）
- **代码调整提示清单**（可直接按条落地改）
- **回归验证点**（仅列多维曲谱相关交互的验证项）

> 证据要求：每个“问题点”至少提供一个明确的代码位置（文件路径 + 关键片段/调用链描述）。

## 附：模板

- 输出模板：[`REPORT_TEMPLATE.md`](REPORT_TEMPLATE.md)

