# nginx 中的$document_uri 与$request_uri 以及$http_referer

## nginx 基于$document_uri的访问控制，变量$document_uri 该变量等价于 $uri，其实也等价于location 匹配

### 其实也就是$document_uri 就是路径名 window.location.pathname

### $document_uri 就是window.location.pathname + window.location.search

### $http_referer 前面跳转的地址
