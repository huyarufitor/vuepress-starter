server {
    listen 80;
    listen 443 ssl;
    server_name talkline.zego.im;
    ssl_certificate /zego/ssl_certs/_.zego.im.cert;
    ssl_certificate_key /zego/ssl_certs/_.zego.im.key;
    return 301 https://www.talkline.cn;
}



#server {
#    listen 80;
#    listen 443 ssl;
#    server_name zego.im;
#    ssl_certificate /zego/ssl_certs/_.zego.im.cert;
#    ssl_certificate_key /zego/ssl_certs/_.zego.im.key;
#    return 301 https://www.zego.im;
#}

server {
    listen 80;
    server_name zego.im;
    return 301 https://www.zego.im$request_uri;
}

server {
    listen 443 ssl;
    server_name zego.im;
    ssl_certificate /zego/ssl_certs/_.zego.im.cert;
    ssl_certificate_key /zego/ssl_certs/_.zego.im.key;
    return 301 https://www.zego.im$request_uri;
}

server{
    listen 80;
    server_name www.zego.im;
    add_header Strict-Transport-Security max-age=15768000;
   return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name www.zego.im;
    root /data/webroot/zego-office-webiste/zego-office-webiste/dist/zh;
    index index.html;

    ssl_certificate /zego/ssl_certs/_.zego.im.cert;
    ssl_certificate_key /zego/ssl_certs/_.zego.im.key;

    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2 ;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    gzip on;
    gzip_static on;

    access_log /data/logs/nginx/www.zego.im.access.log main;
    error_log  /data/logs/nginx/www.zego.im.error.log;

    add_header X-Content-Type-Options nosniff;
    client_max_body_size 250m;

    #location /app {
     #   try_files $uri /app/index.html;
    #}

    location ^~ /zegoland/.well-known/apple-app-site-association {
   # return 301;
        #root /data/webroot/zego-office-webiste/zego-office-webiste/;

       add_header Content-Type text/plain;
        try_files $uri $uri/ /apple-app-site-association;
    }
     location = / {
       # try_files $uri $uri/index.html $uri.html;
        try_files index /index.html;
    }
     # location ^~ /zegoland/.well-known/apple-app-site-association {
       # root /data/webroot/zego-office-webiste;
      #  add_header Content-Type text/plain;
     #   try_files $uri $uri/  /apple-app-site-association;
    #}

    location / {
       # try_files $uri $uri/index.html $uri.html;
        # root /data/webroot/zego-official/dist;
        try_files $uri $uri.html index.html;
    }

    # 增加blog代理
    location ^~ /blog  {
      proxy_pass  http://106.14.169.119:3000;
         }

    location ^~ /en{
        rewrite ^/ https://www.zegocloud.com;
    }
    #location ^~ /zegoland/.well-known/apple-app-site-association {
     #   root /data/webroot/zego-office-webiste;
      #  add_header Content-Type text/plain;
       # try_files $uri $uri/  /apple-app-site-association;
    #}

    location /app-download {
        try_files $uri /app-download/index.html;
    }

    #location ^~ /article {
    #    proxy_pass https://wordpress.zego.im;
    #}

    location ^~ /share/index {
        try_files $uri $uri.html?$args;
    }

    # rewrite ^/share/index2$ https://www2.zego.im/share/index2;
    # rewrite ^/share/index$ https://www2.zego.im/share/index;
    #rewrite ^/word\?(.*)$ https://www2.zego.im/word?$1;
    rewrite ^/word$ https://www2.zego.im/word;

    location ~ \.(js|css|gif|jpg|jpeg|png|bmp|ico)$ {
        expires 1d;
    }

    location ~ /\.(ht|svn|git) {
        deny all;
    }


    location ^~ /pro-ghost {
     proxy_pass https://doc-office-ghost.zego.im/ghost/api/v3/admin/posts/?key=60764e822a3ead63e882c497:17b15dc7f7515c6658a5f29b0d1a89f38a3bf70bae42891265614b1d10e56e95?formats=html,mobiledoc&limit=all&include=tags;
    }
    # 新正式markdown环境
    location ^~ /pro-online {
      proxy_pass https://doc-markdown-zh.zego.im/ghost/api/v3/admin/posts/?key=60764e822a3ead63e882c497:17b15dc7f7515c6658a5f29b0d1a89f38a3bf70bae42891265614b1d10e56e95?formats=html,mobiledoc&limit=all&include=tags;
    }
    proxy_intercept_errors on;
    error_page 500 502 503 504 404 /404.html;
    location = /404.html {
        root /data/webroot/zego-office-webiste/zego-office-webiste/dist/zh;
    }
}