# webpack

## webpack 的chunk和bundle 是什么

chunk : 是webpack 内部处理的模块划分，是实现按需加载的基础；
bundle: 用户浏览器可以直接请求和响应的文件；
module: 我们最开始写的代码（a.js/b.css/c.js）

最开始写的是module,webpack处理的时候是chunk,最后生成的是bundle
