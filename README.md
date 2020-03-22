# superherosearch

[The demo here!](http://demo.codeheaven.pl)

## My goals:
 * Configure everything from scratch
 * Massive test coverage
 * Compatibility with ES5

## What I used:
 * superheroapi.com - for data
 * vue.js - Just for getting things done
 * bootstrap - for layout
 * babel + browserlist - for ES5 compatibility
 * jest - for unit testing
 * lodash - for making unit testing easier (_.clone, _.isEqual)
 * webpack - bundling sources, serving project and proxying api while developing
 
## Browserlist:
```
Chrome >= 23
Firefox >=21
IE >= 10
EDGE >= 12
Safari >= 6
Opera >= 15
```
   
## How to install locally:
```
git clone https://github.com/NaotoNomura/superherosearch
cd superherosearch
npm install && npm run serve
```

## Run tests:
```
npm run test
```

## Build for production:
```
npm run build:prod
```

## Run linting (also launched when building):
```
npm run lint
```

## Example nginx conf for this project:
```
events {
    multi_accept on;
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    gzip  on;
    listen 80;

    server {
        server_name sh4.pl demo.codeheaven.pl;
        location /api {
            proxy_set_header Host superheroapi.com;
            proxy_pass http://superheroapi.com/api;
        }
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```
