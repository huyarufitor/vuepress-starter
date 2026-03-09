---
name: frontend-vue-style-guide
description: 当为 Vue3 项目编写或修改组件时，自动按照团队约定规范进行代码风格与结构约束。
---

# 前端 Vue3 项目编码规范
## 文件命名
- 组件文件使用 PascalCase，如：UserProfile.vue
- 工具函数文件使用 kebab-case，如：user-utils.ts
## 组件结构
- 单文件组件必须包含三个块：<template>、<script>、<style>
- 在 <script> 中使用 Composition API 时，统一将 setup 写法写在 <script setup> 中
## CSS 类命名
- 使用 kebab-case，如：user-profile、btn-primary
- 避免用标签名作为类名，如：.div、.span 等
## 注释要求
- 对复杂业务逻辑添加中文注释，说明「为什么这么做」
- 公共组件必须在其文件顶部添加用途说明注释
## 代码检查步骤
1. 检查文件命名是否符合上述规则
2. 检查组件结构是否完整
3. 检查类名和函数名是否符合命名约定
4. 检查是否为复杂逻辑添加了必要的注释
5. 如不符合，指出具体位置并给出修改建议