# 跨域是什么？Vue项目中你是如何解决跨域的呢？

## 浏览器的同源策略

## 解决同源策略 --CORS

### proxy

网络代理，是一种特殊的网络服务，允许一个（客户端）通过这个服务与另一个网络终端（服务器）进行非直接的连接。一些网关、路由器等网络设备具有网络代理功能。

#### 1、webpack

通过脚手架工具搭建项目，通过webpack为我们起一个本地服务器作为请求的代理对象。

```javascript
// vue.config.js
module.exports = {
    devServer:{
        host:'127.0.0.1',
        post:8989,
        https:false,
        proxy:{
            '/api':{
                target:'https://console-api-beta.zego.im/',
                changeOrigin:true,//如果接口跨域,需要进行这个参数配置为true
                secure: true, // 如果是https接口，需要配置这个参数
                pathWrite:{
                    // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api':'',
                },
            }
        }
    }
}
```
通过 axios发送请求中，配置请求的根路径  

```javascript
axios.defaults.baseURL = '/api'
```

#### 2、服务端实现代理请求转发

比如：express

```javascript
var express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
app.use(express.static(_dirname + '/' ));
app.use('/api',proxy({ target: 'http:127.0.0.1:4000',changeOrigin:true}));
module.exports = app
```

三、通过配置nginx 实现代理

```javasript
server{
    listen 80;
    # server_name www.xxx.im
    location / {
        root /var/www/html;
        index index.html index.htm;
        tray_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http:127.0.0.1:3000;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $romote_addr;
        proxy_set_header X-Dorwarded-For $proxy_add_x_forwarded_for;
    }
}
```
