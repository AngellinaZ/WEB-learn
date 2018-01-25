# node.js

#### 特点

 * 单进程单线程，通过事件和回调支持并发
 * 每个api都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
 * 基本上所有的事件机制都是用设计模式中 观察者模式 实现。
 * 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
  
  
#### http -- 超文本传输协议

 * 作用：定义了服务器和客户端在通信的时候应该如何发送和接收数据
 * http服务器：
   * 请求http模块并赋予一个变量，便于在以后的脚本使用
   * 调用服务器：用 http 模块提供的函数：createServer。函数返回一个对象，对象有一个listen方法，传入数值参数，指定这个 HTTP 服务器监听的端口号。
   * 加入头(`Header`): 对于每个HTTP请求和响应，都会发送http响应头，可以发送的信息(http://blog.csdn.net/u010412301/article/details/65067176)
```
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {
    	'Content-Type': 'text/plain'		
	})
    res.end('hello world');
}).listen(3000, '127.0.0.1')
```
   * 重定向：
   `
   res.writeHead(301, {
    	'Loacation': 'https://github.com/AngellinaZ'		
   })</br>
   1.301响应代码： 资源已移到另一个位置</br>
   2.发送一个位置头
   `

#### express

 * 模板引擎：Jade, 用于生成HTML, 可动态输出数据到HTML中
 * Jade: 
   * 管道描述符号 |
   * 注意缩进--空格键
   * 如何翻译代码： `-`用于告诉随后的代码应当被执行,  `=`告诉解释器要对代码进行演算, 转义, 然后输出
   * 变量： 
```
- var name = 'your name'
  p this is #{name}
```
   * 循环： 用来对数组和对象进行迭代, 循环通常成为迭代, 意思是对数组或对象进行迭代并不断做相同的事情
```
- users = ['a', 'b', 'c']
- each user in users
  p= user
```
   * 条件： 
```
- isSleep = true
- if (isSleep)
 p go to sleeop
- else 
 p keep awake
```
   * 内联(inline)JavaScript
   * 包含(include)：通过`include 关键字`加载想要的模块
   * Mixin


#### REPL
 
 * (Read Eval Print Loop)--交互式解释器
 * 可以在终端输入命令，并接收系统的响应 --- 交代各种终端使用快捷键


#### 回调函数

 * 异步编程依托回调来实现，但不能说使用了回调后程序就异步化了。执行代码时就没有阻塞或等待文件 I/O 操作


#### 事件循环 

 * 事件驱动模型(类似观察者模式)
 * 当web server接到请求，关闭请求然后进行处理，然后去服务下一个请求，当请求完成后，将它放到处理队列，当到达队列开头，把结果返回给用户
 * 在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。
   

#### Node 应用程序是如何工作的？

 * 执行异步操作的函数，将回调函数作为最后一个参数，回调函数接收错误对象作为第一个参数
 ```
  var fs = require("fs");
  fs.readFile('input.txt', function (err, data) {
     if (err){
        console.log(err.stack);
        return;
     }
     console.log(data.toString());
  });
 ```
 
 #### Node.js EventEmitter -- 1.11 (http://www.runoob.com/nodejs/nodejs-event.html)
  * events 模块只提供了一个对象： events.EventEmitter。
  * EventEmitter 的核心就是事件触发与事件监听器功能的封装。
  * EventEmitter的事件组成('事件名', callback/监听事件)
 ```
   var events = require('events');
   var eventEmitter = new events.EventEmitter();

   //监听器1
   var listener1 = function listener1() {
     console.log('监听器 listener1 执行。');
  }

   //绑定 connection 事件，处理函数为 listener1/回调函数
   eventEmitter.on('connection', listener1);
   eventEmitter.addListener('connection', function() {
      console.log('监听器2')
   })

   //删除监听器listener1
   eventEmitter.removeListener('connection', listener1)

   //触发事件
   eventEmitter.emit('connection');

   //返回指定事件的监听器数量。
   eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
 ```
 * error 事件: 为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃
```
  var events = require('events'); 
  var emitter = new events.EventEmitter(); 
  emitter.emit('error');
```

#### Node.js Buffer(缓冲区) -- 1.17
 
 * 定义一个Buffer类，创建一个用于存放二进制数据的缓存区
 
 * 创建Buffer类
    * Buffer.alloc()
    * Buffer.from()
  
 * 写入缓存区： buf.write(string[, offset[, length]][, encoding])
    * 返回值： 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
```
  buf = Buffer.alloc(256);
  len = buf.write("www.runoob.com");
  console.log("写入字节数 : "+  len);
```
   
 * 从缓冲区读取数据： buf.toString([encoding[, start[, end]]])， 默认为 'utf8' 。
    * 返回值： 解码缓冲区数据并使用指定的编码返回字符串。
```
  buf = Buffer.alloc(26);
  for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97;
  }
  console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
  console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
```
  
 * 将 Buffer 转换为 JSON 对象: buf.toJSON()
```
  var buf = Buffer.from('www.runoob.com');
  var json = buf.toJSON(buf);
  //返回 { type: 'Buffer',data: [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ] }
```
  
 * 缓冲区合并： buf.concat(list[, totalLength])
    * list - 用于合并的 Buffer 对象数组列表。
    * totalLength - 指定合并后Buffer对象的总长度。
  
 * 缓冲区比较： buf.compare(otherBuffer);
    * 返回值： 返回一个数字，表示 buf 在 otherBuffer 之前(<0)，之后(>0)或相同(=== 0)。
  
 * 拷贝缓冲区: buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
```
  var buf1 = Buffer.from('abcdefghijkl');
  var buf2 = Buffer.from('RUNOOB');

  //将 buf2 插入到 buf1 指定位置上
  buf2.copy(buf1, 2);

  console.log(buf1.toString()); //abRUNOOBijkl
```
  
 * 缓冲区裁剪: buf.slice([start[, end]])
    * 返回值： 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
  
 * 缓冲区长度： buf.length
 
 
 #### Stream (流) -- 1.18
 
 * Stream 是一个抽象接口
 * 所有的 Stream 对象都是 EventEmitter 的实例, 常用事件
    * data -- 当有数据可读时触发
    * end -- 没有更多数据可读时触发
    * error -- 在接收和写入过程中发生错误时触发
    * finish -- 所有数据已被写入到底层系统时触发
```
var fs = require('fs');
var data = 'I am zyp';

/*从流中读取数据*/
//1.创建可读流
var readStream = fs.createReadStream('input.txt');

//2.设置编码为UTF-8
readStream.setEncoding('UTF8')

//3.处理流事件（data, end, error）
readStream.on('data', function (chunk) {
	data += chunk;
})
readStream.on('end', function () {
	console.log(data)
}) 
readStream.on('error', function (error) {
	console.log(error.stack);
})


/*写入流： 清空原始数据*/
//1.创建一个可以写入的流，写入到文件 output.txt 中
var writeStream = fs.createWriteStream('output.txt');

//2.使用 utf8 编码写入数据
writeStream.write(data, 'UTF8');

//3.标记文件末尾
writeStream.end();

//4.处理流事件 --> data, end, error
writeStream.on('finish', function () {
	console.log('写入完成')
})
writeStream.on('error', function (error) {
	console.log(error.stack)
})


/*管道流：从一个流中获取数据并将数据传递到另一个流中*/
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readStream.pipe(writeStream)


/*链式流: 链式是通过连接输出流到另外一个流并创建多个流操作链的机制, 一般用于管道操作*/
//用管道和链式来压缩和解压文件。
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('input.txt')
// 	.pipe(zlib.createGzip())
// 	.pipe(fs.createWriteStream('input.txt.gz'));	

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
```
  
#### 模块系统

 * 为了让Node.js的文件可以相互调用
 * 一个node.js文件就是一个模块
 * node.js提供两个对象
   * exports: 模块公开的接口
   * require: 用于从外部获取一个模块的接口，即所获取模块的 exports 对象
```
//把一个对象封装到模块中
module.exports = hello; 
function hello(){}

exports.hello = function () {}
```
 * Node.js 中存在 4 类模块（原生模块和3种文件模块）
 * 服务端的模块--加载优先级:
 
![node-http](https://github.com/AngellinaZ/WEB-learn/blob/master/images/nodejs-require.jpg)


#### 全局对象

 * 全局对象：global, 全局变量： global对象的属性
 * 注意： 永远使用 var 定义变量以避免引入全局变量，因为全局变量会污染 命名空间，提高代码的耦合风险。
 * __filename: 表示当前正在执行的脚本的文件名, 返回文件所在的路径
 * __dirname: 表示当前执行脚本所在的目录
 * setTimeout(cb, ms)： 返回一个代表定时器的句柄值。
 * clearTimeout(t)
 * setInterval(cb, ms)
 * clearInterval(t) 
 * console 
 * process: 全局变量
 
 
#### 常用工具 -- 1.21

 * util: node.js核心模块，提供常用函数的合集
   * util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数，只继承在 原型中定义 的函数，不继承构造函数内部创造的属性和函数
   * util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出
   * util.isArray(object): 如果给定的参数 "object" 是一个数组返回true，否则返回false。
   * util.isRegExp(object): 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
   * util.isDate(object)
   * util.isError(object)
```
var util = require('util'); 
```

#### 文件系统 -- 1.21

 * Node 导入文件系统模块(fs)语法
```
var fs = require("fs")
```
 * 异步:  方法函数最后一个参数为回调函数, 回调函数的第一个参数包含了错误信息(error). eg：fs.readFile()
 * 同步:  eg: fs.readFileSync()。
 * 打开文件：
