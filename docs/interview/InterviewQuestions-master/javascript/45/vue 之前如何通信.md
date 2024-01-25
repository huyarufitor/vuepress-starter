# Vue 组件间如何通信？

## 父子组件通信

1. props（父） + emit（子）
2. $refs + $parent / $children
3. provider/inject

## 兄弟组件通信

1. eventBus
2. $parent.$refs

## 通用

vuex commit
