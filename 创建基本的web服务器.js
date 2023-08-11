// 1、导入 http 模块
const http = require('http')
// 2、创建 web 服务器实例
const server = http.createServer()
// 3、为服务器实例绑定 request 事件，监听客户端的请求
// 使用服务器实例的.on()方法，为服务器绑定一个reques事件
server.on('request', (req, res) => {
    // 只要有客户端来请求自己的服务器，就会触发request事件，从而调用这个事件处理函数
    console.log('Someone visit our web server.')
})
// 4、启动服务器
// 调用server.listen(端口号, cb回调)方法，即可启动web服务器
server.listen(80, () => {
    console.log('http server running at http://127.0.0.1')
})
