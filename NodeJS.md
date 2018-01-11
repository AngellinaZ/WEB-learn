# node.js

#### 特点

 * 单进程单线程，通过事件和回调支持并发
 * 每个api都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
 * 基本上所有的事件机制都是用设计模式中 观察者模式 实现。
 * 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
  
  
#### 基本过程：

 * 引用require载入http模块<br>
 * 调用服务器：用 http 模块提供的函数：createServer。函数返回一个对象，对象有一个listen方法，传入数值参数，指定这个 HTTP 服务器监听的端口号。


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
