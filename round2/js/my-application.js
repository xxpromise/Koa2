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
    const server = createServer(this.callback());
    server.listen(...args);
  }
  
  callback () {
    // 执行compose方法返回一个函数
    const fn = compose(this.middleware);
    
    const handleRequest = (req, res) => {
      // 调用该函数，返回值为promise对象
      // then方法触发了, 说明所有中间件函数都被调用完成
      fn(req, res).then(() => {
        // 在这里就是所有处理的函数的最后阶段，可以允许返回响应了~
      });
    }
    
    return handleRequest;
  }
}

// 负责执行中间件函数的函数
function compose(middleware) {
  // compose方法返回值是一个函数，这个函数返回值是一个promise对象
  // 当前函数就是调度
  return (req, res) => {
    // 默认调用一次，为了执行第一个中间件函数
    return dispatch(0);
    function dispatch(i) {
      // 提取中间件数组的函数fn
      let fn = middleware[i];
      // 如果最后一个中间件也调用了next方法，直接返回一个成功状态的promise对象
      if (!fn) return Promise.resolve();
      /*
        dispatch.bind(null, i + 1)) 作为中间件函数调用的第三个参数，其实就是对应的next
          举个栗子：如果 i = 0  那么 dispatch.bind(null, 1))
            --> 也就是如果调用了next方法 实际上就是执行 dispatch(1)
              --> 它利用递归重新进来取出下一个中间件函数接着执行
        fn(req, res, dispatch.bind(null, i + 1))
          --> 这也是为什么中间件函数能有三个参数，在调用时我们传进来了
      */
      return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
    }
  }
}