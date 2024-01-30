server {
  listen 80; # 监听端口
  server_name robot-beta.zego.cloud; # 域名可以有多个，用空格隔开

  #charset koi8-r;
  gzip on;
  gzip_buffers 32 4K;
  gzip_comp_level 5;
  gzip_min_length 100;
  gzip_types text/plain application/javascript application/json text/css text/xml;
  gzip_disable "MSIE [1-6]\.";
  gzip_vary on;

  access_log  /var/log/nginx/robot-beta.zego.cloud.access.log  main;
  error_log /var/log/nginx/robot-beta.zego.cloud.log notice;
  location / {
    if ($uri = /index.html) {
     add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }
    root /data/webroot/boss-web-robot/boss-web-robot/dist/;
    index index.html index.htm; #目录内的默认打开文件,如果没有匹配到index.html,则搜索index.htm,依次类推
    try_files $uri $uri/ /index.html;
  }

  #error_page  404              /404.html;    #对错误页面404.html 做了定向配置

  # redirect server error pages to the static page /50x.html
  #将服务器错误页面重定向到静态页面/50x.html
  #
  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root html;
  }
}