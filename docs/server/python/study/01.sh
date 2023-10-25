server {
    listen       80;
    server_name  doc-office.zegotech.cn;
    access_log  /data/logs/doc-office.zego.im-access.log;
    error_log   /data/logs/doc-office.zego.im-error.log;

    # nginx 开启gzip压缩js和静态文件
    gzip on;
    # gzip_static on;
    gzip_min_length 1000;
    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
   # gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    # add_header Strict-Transport-Security max-age=15768000;
    add_header Access-Control-Allow-Origin  *;

   location ~*/ {
    root /data/webroot/zego-office-webiste/zego-office-webiste/dist/zh;
    index index.html;
      try_files  $uri $uri.html index.html;
       # proxy_pass http://10.1.80.102:3000;
     }

    location ^~ /blog  {
      proxy_pass  http://10.1.80.102:3000;
    }

    location ^~ /en{
       rewrite ^/ https://www.zegocloud.com;
    }
     location = /zegoland/.well-known/apple-app-site-association{
     root    /data/apple-app-site-association;

    }
       location = /robots {
           root    /data/robots.txt;
    }

    location ^~ /pre-ghost {
      proxy_pass http://doc-ghost-zh.zego.im/ghost/api/v3/admin/posts/?key=60628f917ba6fc77667d12b4:879eac6ba34cdc6273feabb26e6e5a8db18c36fc50852d9bd1ff27cee81be03d?formats=html,mobiledoc&limit=all&include=tags;
    }
    location ^~ /pro-ghost {
      proxy_pass http://doc-office-ghost.zego.im/ghost/api/v3/admin/posts/?key=60764e822a3ead63e882c497:17b15dc7f7515c6658a5f29b0d1a89f38a3bf70bae42891265614b1d10e56e95?formats=html,mobiledoc&limit=all&include=tags;
    }
    location ^~ /pro-online {
      proxy_pass http://doc-markdown-zh.zego.im/ghost/api/v3/admin/posts/?key=60764e822a3ead63e882c497:17b15dc7f7515c6658a5f29b0d1a89f38a3bf70bae42891265614b1d10e56e95?formats=html,mobiledoc&limit=all&include=tags;
    }
    error_page 500 502 503 504 404 /404.html;
    location = /404.html {
       root /data/webroot/zego-office-webiste/zego-office-webiste/dist/zh;
    }
}