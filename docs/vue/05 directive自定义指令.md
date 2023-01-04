# 自定义指令是什么？

https://cn.vuejs.org/guide/reusability/custom-directives.html#usage-on-components

除了vue的内置指令v-bind、v-model、v-if/v-show外，vue允许注册自定义指令（custom Directive）；

 自定义指令主要是为了重用涉及普通元素的底层DOM访问逻辑，简而言之，就是如果要内置指令不方便操作DOM的时候，或者一直重复操作DOM做同样的事，就可以使用自定义指令。

## 自定义指令构成

  由一个包含类似组件生命周期钩子的对象 来定义，钩子函数会接收到指令所绑定元素作为其参数。

  ```javascript
  <script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
  ```

上述例子，是自定义了一个自动聚焦的指令。在页面加载完生效，还可以在Vue动态插入元素后生效。

### 自定义指令注册

在没有使用```javascript <script setup>```的情况下，自定义指令需要通过directives选项注册：

```javascript
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    return {};
  },
  directives: {
    focus: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      async mounted(el) {
        console.log("绑定的是哪个dom元素", el);
        el.innerHTML = "122";
        el.focus();
      },
    },
  },
  
};
</script>
<template>
    <input v-focus placeholder="输入appid" />
</template>
```

### 注册到全局

一般都直接注册到全局，这样可以直接复用

```javascript
const app = createApp({})

app.directive('focus',{
    /* 钩子函数... */
})
```

### 指令钩子

指令的定义对象可以提供几种钩子函数：

```javascript
  const myDirective = {
    // 在绑定元素的属性attribute前，或者事件监听器应用前调用
    created(el,binding,vnode,prevVnode){
      //el: 指令绑定到的元素，可以直接操作DOM元素
      /**binding:一个对象，包含：
       * value:传递给指令的值。v-focus="2",2就是这个value；
       * oldValue: 之前的值，仅在beforeUpdated和updated中可用。如论值是否更改，它都可用
       * arg:传递给指令的参数，v-focus:params,params就是这个参数
       * modifiers:包含修饰符的对象，v-focus.foo.bar ，修饰符对象就是 {foo:true,bar:true}
       * instance:使用指令的组件实例
       * dir:指令的定义对象
       * /
       * vnode:底层Vnode
       * prevNode:之前的渲染中代表指令所绑定元素的VNode。
       * /
    },
    //
    beforeMount(){
      // 元素被插入到DOM前调用
    },
    mounted(){
      //绑定元素的父组件及他自己的所有子节点都挂载完成后调用
    },
    beforeUpdate(){
      //绑定元素的父组件更新前调用
    },
    updated(){
      //在绑定元素的父组件 及他自己的所有子节点都更新后调用
    },
    beforeUnmount(){
      // 绑定元素的父组件卸载前调用
    },
    unmoounted(){
      //绑定元素的父组件卸载后调用
    },
  }
```