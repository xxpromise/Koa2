// 引入自定义模块
const MyKoa = require('./js/my-application');
// 创建实例对象
const app = new MyKoa();
// 使用中间件
app.use((req, res, next) => {
  console.log('中间件函数执行了~~~111');
  next();
})
app.use((req, res, next) => {
  console.log('中间件函数执行了~~~222');
  // 设置响应内容，由框架负责返回响应~
  res.body = 'hello myKoa';
})
// 监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})