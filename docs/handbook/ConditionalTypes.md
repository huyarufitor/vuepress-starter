# 001 跳板机

# cd ~/.ssh && ssh-add *
```javascript
正式环境的nginx 都配置在正式的服务器上，需要通过跳板机连接。
1.连接上之后，ssh jms@xxx
中文官网服务器：ssh jms@106.14.169.119
看错误 （zegocloud）日志


英文官网服务器： ssh jms@119.28.140.181
看错误 （zegocloud）日志
cat /data/logs/nginx/www.zegocloud.com.error.log
//c查看最近的几条log
tail -f /data/logs/nginx/www.zegocloud.com.error.log


sudo su -
10.10.193.81
nginx -t 检查
nginx -s reload 重新加载

2.正式环境的nginx 配置放在xxx/conf.d下面
/etc/nginx/conf.d/zego.im.conf
/etc/nginx/conf.d/zegocloud.com.conf

//找nginx的配置直接执行nginx -t，会返回配置目录，然后去找对应目录下的conf.d

但是测试环境放在了 /opt/dev/
/usr/local/nginx/conf/nginx.conf

正式英文的配置

$uri/index.html
```


