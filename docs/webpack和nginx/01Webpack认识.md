# 模块化规范

（1）统一的模块化标准规范
（2）自动加载模块的基础库

CommonJS 规范
---是nodejs中遵循的模块规范
一个文件就是一个模块，每个模块都有单独的作用域，通过module.exports 导出成员，再通过require函数载入模块；

为什么不选择CoommonJS 规范呢-----因为这是同步的，不适用于浏览器中一些异步行为，所以出了一个AMD（异步模块定义规范）

## 最终的模块化标准

在nodejs环境中，遵循Commonjs规范来组织模块；---也在慢慢遵循ES Modules
在浏览器中，遵循ES Modules规范

## ESModules

(1)特性和语法---MDN/ECMAScript 官方可找到
比如：
//module.js
var foo = 'today is sunday';
export {foo}
// app.js
import { foo } from 'module.js';
console.log(foo)

## ES Modules 问题---所以才有模块打包工具的出现

1、环境兼容问题
2、模块化方式划分的模块文件过多，每个文件都会单独从服务器请求回来，会导致浏览器频繁发送网络请求，影响应用的工作效率；
3、不仅仅js文件需要模块化，css\html也需要模块化

所以，要有这些功能的工具：
（1）代码编译能力----解决兼容
（2）打包到一起----解决频繁请求的问题
（3）不同种类的模块类型-解决css、js、html

解决（1）和（2）可以用gulp这样的工具就可以解决，但是解决（3）就得webpack出马了；
webpack是模块化解决方案，静态模块打包器
