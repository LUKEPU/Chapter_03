//1、导入fs模块
const fs = require('fs')

// 2、调用fs.readFile() 读取文件
fs.readFile('./成绩.txt', 'utf8', function(err, dataStr) {
    // 3、判断是否读取成功
    if(err) {
        return console.log('读取文件失败！' + err.message)
    }
    // console.log('读取文件成功！' + dataStr)
    // 4、文件读取成功后，处理成绩数据
    // 4、1 先把成绩的数据，按照空格进行分割
    const arrOld = dataStr.split(' ')
    console.log(arrOld)
    // 4、2、循环分割后的数组，对每一项数据，进行字符串的替换操作
    const arrNew = []
    arrOld.forEach(item => {
        arrNew.push(item.replace('=', ':'))
    })
    // 4、3、把新数组中的每一项，进行合并，得到一个新的字符串
    // \r\n 表示回车换行
     const newStr = arrNew.join('\r\n')
     console.log(newStr)
    // 5、将处理完成的成绩数据，调用 fs.writeFile() 方法，写入到新文件 成绩-ok.txt 中
    fs.writeFile('./-ok.txt', newStr, function(err) {
        if(err) {
            return console.log('写入文件失败！' + err.message)
        }
        console.log('成绩写入成功！' + dataStr)
    })

})