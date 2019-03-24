// 引入自定义模块
const MyKoa = require('./js/my-application');
// 创建实例对象
const app = new MyKoa();
// 使用中间件
app.use((req, res, next) => {
  console.log('中间件函数执行了~~~111');
  // 调用next方法，就是调用堆栈中下一个中间件函数
  next();
})
app.use((req, res, next) => {
  console.log('中间件函数执行了~~~222');
  res.end('hello myKoa');
  // 最后的next方法没发调用下一个中间件函数，直接返回Promise.resolve()
  next();
})
// 监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})