# 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

1. 当修改了一个或多个文件；
2. 文件系统接收更改并通知 webpack；
3. webpack 重新编译构建一个或多个模块，并通知 `HMR（Hot Module Replacement）` 服务器进行更新；
4. `HMR Server` 使用 `Websocket` 通知 `HMR runtime` 需要更新，`HMR runtime` 通过 HTTP 请求更新 jsonp；
5. `HMR runtime` 替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新；
6. Webpack 的热更新仅适用于开发环境。在生产环境中，为了性能和安全性考虑，通常会关闭热更新。
7. 原理：当开发者修改了一个或多个模块时，Webpack 会监听文件变化，并通过 Webpack-dev-server 将变化的模块打包到内存中的虚拟打包文件。
Webpack-dev-server 会通过 WebSocket 与浏览器建立一个长连接，当有模块发生变化时，会通过该连接通知浏览器。浏览器接收到更新通知后，会向 Webpack-dev-server 发送 Ajax 请求，请求更新的模块。Webpack-dev-server 会将更新的模块通过 WebSocket 推送给浏览器，浏览器接收到更新的模块后，会使用新的模块替换旧的模块，从而实现热更新。
