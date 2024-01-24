# pre 预检 OPTIONS

https://juejin.cn/post/7269952188927017015

## 简单请求

不会触发CORS预检请求。

需要满足以下要求：
（1）HTTP 方法限制：只能使用GET、HEAD、POST 这三种HTTP方法之一。如果请求使用了其他HTTP方法，就不再被视为简单请求。
（2）自定义标头限制：请求的HTTP标头只能是常见的标头：
Accept、Accept-Language、content-Language、Last-Event-ID、Content-Type(仅限于application/x-www-form-urlencoded、multipart/form-data、text/plain)。HTML头部 header field字段：DPR、Download、等。如果请求使用了其他标头，就不再被视为简单请求。
（3）请求中没有使用 ReadableStream 对象。
（4）不实用指定自定义标头
（5）请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用XMLHttpRequest.upload 属性访问。

## 预检请求

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为 预检请求。

首先使用OPTIONS 方法发起一预检请求到服务器，获取服务器是否允许该请求。

作用： 避免跨域请求对服务器的用户数据产生未预期的影响。

## 为什么本地用proxy 代理，访问接口，不会跨域

当你在本地通过Ajax 或其他方式请求线上接口时，由于浏览器的同源策略，会出现跨域的问题。但是在服务器端不会出现跨域。本地是Webpack dev server 实现，在浏览器发送请求时，请求会先被webpack dev server 捕获，然后根据你的代理规则将请求转发到目标服务器，返回数据后再经由webpack dev server 转发回浏览器。这样绕过了浏览器的同源策略限制。
