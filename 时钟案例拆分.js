// 1、导入需要的模块并创建正则表达式
// 1、1、导入fs文件系统模块
const fs = require('fs')
// 1、2、导入path路径处理模块
const path = require('path')
// 1、3、 匹配<style></style>标签的正则
// \s表示空白字符；\S表示非空白字符；*表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/
// 1、4、 匹配<script></script>标签的正则
const regScript = /<script>[\s\S]*<\/script>/



// 2、使用 fs 模块读取需要被处理的 html 文件
// 2、1、调用fs.readFile()方法读取文件
fs.readFile(path.join(__dirname, './index.html'), 'utf8', function (err, dataStr) {
    // 2、2、读取HTML文件失败
    if (err) return console.log('读取HTML文件失败！' + err.message)
    // 2、3、 读取文件成功后，调用对应的三个方法，分别拆解出CSS,JS,HTML文件
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
})

// 3、自定义 resolveCSS 方法
// 3、1、定义处理CSS样式的方法
function resolveCSS(htmlStr) {
    // 3、2、使用正则提取需要的内容
    const r1 = regStyle.exec(htmlStr)
    // 3、3、将提取出来的样式字符串，进行字符串的replace替换操作
    const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
    // 3、4、调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.css
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function (err) {
        if (err) return console.log('写入CSS样式失败!' + err.message)
        console.log('写入CSS样式文件成功！')
    })
}

// 4、自定义 resolveJS 方法
// 4、1、定义处理JS脚本的方法
function resolveJS(htmlStr) {
    // 4、2、使用正则提取需要的内容
    const r2 = regScript.exec(htmlStr)
    // 4、3、将提取出来的样式字符串，进行字符串的replace替换操作
    const newJS = r2[0].replace('<script>', '').replace('</script>', '')
    // 4、4、调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.js
    fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function (err) {
        if (err) return console.log('写入JS样式失败!' + err.message)
        console.log('写入JS样式文件成功！')
    })
}

// 5、自定义 resolveHTML 方法 
function resolveHTML(htmlStr) {
    // 5、2、将字符串调用replace方法，把内嵌的style和script标签，替换为外联的link和script标签
    const newHTML = htmlStr.replace(regStyle, '<link rel ="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
    // 5、3、写入index.html这个文件
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function (err) {
        if (err) return console.log('写入HTML样式失败!' + err.message)
        console.log('写入HTML样式文件成功！')
    })
}