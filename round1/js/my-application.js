const {createServer} = require('http');

module.exports = class Application {
  constructor() {
    // 初始化中间件数组, 所有中间件函数都会添加到当前数组中
    this.middleware = [];
  }
  // 使用中间件方法
  use(fn) {
    // 将所有中间件函数添加到中间件数组中
    this.middleware.push(fn);
  }
  // 监听端口号方法
  listen(...args) {
    // 使用nodejs的http模块监听端口号
    const server = createServer((req, res) => {
      /*
        处理请求的回调函数，在这里执行了所有中间件函数
        req 是 node 原生的 request 对象
        res 是 node 原生的 response 对象
      */
      this.middleware.forEach((fn) => fn(req, res));
    })
    server.listen(...args);
  }
}