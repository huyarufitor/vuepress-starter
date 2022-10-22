# vue3 的composition API

## composition API解决了什么问题？

## vue2的options API 有什么缺点？

1、代码的可读性随着组件变大而变差
2、每一种代码复用的方式，都存在缺点
3、Typescript 支持有限

### 什么是options API ？

以.vue 为后缀的文件，通过定义methods、computed、watch、data等属性与方法，共同处理页面逻辑。

选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断“跳转”相关代码的选项块。

### competition API 解决了？

将某个逻辑关注点相关的代码全都放在一个函数里，这样需要修改一个功能时，就不用需要在文件中跳来跳去。
例如：处理count的逻辑都放在函数里，再在setup()中返回

function compuCount(){

}
