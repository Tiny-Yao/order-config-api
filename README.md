# order-v
## 1.安装包
``` shell
pnpm install / npm install
```

## 1.启动项目
```shell
npm run dev
```

## 3.打开本地地址
http://localhost:8888

## 4.order-api-nest env文件配置格式
 ```
# 运行端口
PORT=8888
# 运行地址
HOSTNAME=http://127.0.0.1
# token加密密钥
JWT_SECRET_KEY=''
# AES 加秘/解密 密钥 与VITE_KEY相同
AES_SECRET_KEY=''
# 文件名称-密码保存
FILE_PASSWORD=password.txt
# 文件名称-
FILE_CONFIG_BOT=bot-config.json
# 文件名称-
FILE_CONFIG_ORDER=order-config.json
# okx服务器
OKX_SERVER=https://www.okx.com
 ```
## 5.前端.env文件配置格式
```
# 加密key
VITE_KEY=''
VITE_BASE_URL='
```
## 6.阿里云服务器配置
### 6.1 安全组应打开 HTTP（80）和 HTTPS（443）端口
### 6.2 ubuntu版本选择 22.04.4 LTS
### 6.3 选择密码登录
### 6.4 打开公网ip

## 7.服务器部署
### 7.前端部署
### 7.1 阿里云服务器Ubuntu部署nginx
#### 7.1.1 更新软件包列表并安装 Nginx
```shell
   sudo apt update
   sudo apt install nginx
```
#### 7.1.2 安装完成后，Nginx 服务将自动启动,你可以使用以下命令检查 Nginx 服务的状态：
```shell
   sudo systemctl status nginx
```
#### 7.1.3 配置防火墙以允许 HTTP 和 HTTPS 流量通过。运行以下命令：
``` shell
    sudo ufw allow 'Nginx HTTP'
    sudo ufw allow 'Nginx HTTPS'
```
#### 7.1.4 打包react项目文件
```shell
    npm run build
```
#### 7.1.5 在/var/www目录下创建app文件夹，将打包后的文件通过ftp上传到服务器 /var/www/app 目录下
#### 7.1.6 通过ftp进入文件 etc/nginx/nginx.conf，在文件http模块下添加server，如以下代码
```shell
    server {
         listen 80;
         server_name 120.27.128.229;

          location /api {
               proxy_pass http://localhost:3000;
               proxy_http_version 1.1;
               proxy_set_header Upgrade $http_upgrade;
               proxy_set_header Connection 'upgrade';
               proxy_set_header Host $host;
               proxy_cache_bypass $http_upgrade;
          }

         location / {
           root /var/www/app;
           index index.html;
           try_files $uri $uri/ /index.html;
         }
     }
```
#### 7.1.7 重启nginx
```shell
    sudo systemctl restart nginx
```
#### 7.1.8 访问服务器ip地址即可（在浏览器打开：101.37.83.38）

### 7.2 接口部署
#### 7.2.1 安装必要的软件包
```shell
    sudo apt install curl
    sudo apt install -y nodejs
```
#### 7.2.2 使用 curl 下载 Node.js 源代码,可能会因为网络问题下载失败，可以多试几次
```shell
   curl -o- https://gitee.com/mirrors/nvm/raw/v0.38.0/install.sh | bash
```
#### 7.2.3 闭并重新打开终端窗口，或者运行以下命令以使 nvm 生效
```shell
    source ~/.bashrc
```
#### 7.2.4 使用以下命令验证 nvm 是否成功安装：
```shell
    command -v nvm
```
#### 7.2.5使用 nvm 安装 Node.js 18.15.0
```shell
    nvm install v18.17.0
    npm install -g npm@10.0.0
```
#### 7.2.6 使用以下命令验证 Node.js 是否已成功安装：
```shell
    node -v
```
#### 7.2.7 打包js文件
```shell
    npm run build
```
#### 7.2.8 服务器上创建api文件夹，将打包后的文件app.js,还有.env.production,package.json文件，通过ftp上传到服务器 /var/www/app 目录下

### 7.2.9 更新npm
```shell
    npm install -g npm@10.1.0
```
#### 7.2.10 进入api文件夹，安装node_modules
```shell
    # 镜像源为默认： npm config set registry https://registry.npmjs.org/
    npm install
```
#### 7.2.11 安装pm2
```shell
    npm install pm2 -g
```
#### 7.2.12 运行项目
```shell
    pm2 start app.js
```
