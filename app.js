const { log } = require('console');

//导入express框架
const express = require('express');
//导入body-parser
var bodyParser = require('body-parser')

//创建express实例
const app = express();

//导入cors
const cors = require('cors');
//全局挂载
app.use(cors())

// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或字符串，当为true时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const jwtconfig = require('./jwt_config/index');
const { expressjwt: jwt } = require('express-jwt')

const loginRouter = require('./router/login');
app.use('/api', loginRouter);

//绑定和侦听指定的主机和端口
app.listen(3007, () => {
  console.log('http://127.0.0.1:3007:');
})