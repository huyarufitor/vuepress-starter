# 如何解决三个问题

（1）代码编译能力----解决兼容
（2）打包到一起----解决频繁请求的问题
（3）不同种类的模块类型-解决css、js、html

（1）webpack在打包过程中通过各种Loader机制实现编译转换，再进行打包；
（2）将零散的js代码打包到一个js文件中，减少http请求
（3）webpack支持在js中以模块化的方式载入任意类型的资源文件

## 增量加载

--webpack还具备代码拆分的能力，能将应用中所有的模块按需分块打包。

## 初始化 webpack 核心模块和Webpack CLI程序

npm init --yes
npm i webpack webpack-cli --save-dev
npx webpack --version
npx webpack // 默认会自动从src/index.js文件开始打包

## 打包默认路径

webpack4 之后，支持0配置方式直接启动打包，将src/index.js作为入口文件，最终打包到dist/main.js

或者 将配置webpack.config.js
module.exports = {
    entry:'./src/index.js'
}
