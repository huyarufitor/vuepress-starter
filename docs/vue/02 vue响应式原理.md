# vue2 的响应式原理 和vue3的响应式原理

## vue2

### 原理

采用数据劫持结合发布-订阅模式，通过object.defineproperty()监听数据的getter和setter，在数据变化的时候，发布者发布变化到订阅者，订阅者接受到变化进行处理更新视图。

### 缺点

使用 Object.defineProperty定义响应式的数据对象的访问器属性getter和setter进行数据劫持时存在以下问题：
比较爱问的---
1、无法监控对象的增删
    因为初始化Vue构建函数的配置对象时，会遍历已有的每个属性，并添加到getter和setter,后设置的属性没用getter和setter所以，监控不到变化。
2、检测不到数组的变化
    数组在使用push、pop、shift、unshift、splice等方法操作数组元素时，数组的getter和setter无法监控到变化。
    vue通过重写Array默认方法到方式，在调用这些方法的时候发布更新消息，一般无需关注。
两种情况的解决办法：
    (1)当利用索引值设置某项数组元素时： vm.items[index] = newValue
    (2)当修改数组长度时：vm.items.length = newLength
可以 用：
    vm.$set/Vue.set 和vm.items.splice(newLength)解决

## vue3

### vue3原理

本质是通过Proxy API 劫持了数据对象的读写：
（1）当我们访问数据时，会触发getter 执行依赖收集；
（2）修改数据时，会触发setter派发通知。
