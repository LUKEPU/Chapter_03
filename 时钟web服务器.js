// 1、导入需要的模块
// 1、1、导入http模块
const http = require('http')
// 1、2、导入fs文件系统模块
const fs = require('fs')
// 1、3、导入path路径处理模块
const path = require('path')

// 2、创建基本的 web 服务器
// 2、1、创建 web 服务器实例
const server = http.createServer()
// 2、2、监听web服务器实例绑定的 request 事件
server.on('request', (req, res) => {

    // 3、将资源的请求 url 地址映射为文件的存放路径
    // 3、1、获取到客户端请求的URL地址
    const url = req.url
    // 3、2、把请求的URL地址映射为具体文件的存放路径
    // const fpath = path.join(__dirname, url)
    // 5、优化资源的请求路径
    // 5、1、预定义空白的文件存放路径
    let fpath = ''
    if(url === '/') {
        // 5、2、如果请求的路径为/，则手动指定文件的存放路径
        fpath = path.join(__dirname, './clock/index.html')
    }else {
        // 5、3、如果请求的路径不为/，则动态拼接文件的存放路径
        fpath = path.join(__dirname, './clock', url)
    }

    // 4、读取文件的内容并响应给客户端
    // 4、1、根据映射过来的文件路径读取文件
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        // 4、2、读取文件失败后，向客户端相应固定的错误信息
        if (err) return res.end('404 Not fount.')
        // 4、3、读取文件成功后，将读取成功的内容响应给客户端
        res.end(dataStr)
    })

    
})
// 2、3、启动服务器
server.listen(80, () => {
    console.log('http server running at http://127.0.0.1')
})




