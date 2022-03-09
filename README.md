# xj-ui

xj前端项目

## 部署教程
### 拉取项目
```
https://github.com/gmr1997/xj-ui.git
```
### 安装依赖
进入项目目录运行以下命令
```js
npm install
```
### 修改相关配置
1. 前端运行ip及端口，修改文件config/index.js
```js
host: 'localhost', // can be overwritten by process.env.HOST  
port: 9090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
```
2. 后端跨域配置，修改文件config/index.js
```js
proxyTable: {
  '/': {
    target: 'http://localhost:9091', // 9091为后端部署端口
    changeOrigin: true,
    pathRewrite: {
      '^/': ''
    }
  }
}
```
3. axios请求默认转发地址，修改src/main.js
```js
axios.defaults.baseURL = 'http://localhost:9090/' // 9090为前端部署端口
```
## 运行项目
```js
npm run dev
```

## 浏览页面效果
```http
http://localhost:9090/#/index
```