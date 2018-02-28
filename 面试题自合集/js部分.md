#### JavaScript数据类型
1. 基本数据类型： Number, String, Boolean, undefined, null 
2. 复杂数据类型： Object, Array

#### JavaScript闭包(https://github.com/mqyqingfeng/Blog/issues/9)

#### 前端跨域(https://juejin.im/post/5a2f92c65188253e2470f16d)
> 什么是跨域？

跨域，指浏览器不能执行其他网站的脚本，是对js的安全限制，由浏览器的同源策略造成，所谓同源是指：域名，协议，端口均相同

**请注意：** localhost和127.0.0.1虽然都指向本机，但也属于跨域。

> 解决方法

1. jsonp跨域: 在html页面中通过相应的标签从不同域名下加载 静态资源文件 是被浏览器允许的 -- 只能都实现 **get** 请求 
```js
    //原生： 通过动态创建script标签，再去请求一个带参网址来实现跨域通信
    let script = document.createElement('script');
    script.src = 'http://www.nealyang.cn/login?username=Nealyang&callback=callback';
    document.body.appendChild('script');
    function callback (res) {
        console.log(res)
    }

    //jquery
    $.ajax({
        url: 'http://www.nealyang.cn/login',
        type: 'GET',
        dataType:'jsonp',//请求方式为jsonp
        jsonpCallback:'callback',
        data:{
            "username":"Nealyang"
        }
    })
```
2. document.domain + iframe 跨域: 要求主域名一致

3. window.name + iframe 跨域 ： 只能都实现 **get** 请求 

4. location.hash + iframe 跨域 ： 只能都实现 **get** 请求 

5. postMessage跨域 ： 由HTML5提供的超炫的API, 支持ie8, chrome, ff
```js
otherWindow.postMessage(message,targetOrigin);
```
6. 跨域资源共享 CORS

7. nodejs中间件代理跨域

#### JavaScript继承 
从原型继承、构造函数继承、组合继承、寄生组合继承优缺点和实现方式都说

#### JavaScript的节流和防抖

#### js事件执行机制: 
	event loop，microtask，task queue。然后事件委托、捕获、冒泡、目标阶段,target和currentTarget

#### ajax请求方式
因该算是考察基础功吧，谈了下XMLHTTPRequest的过程，readyState的几种类型和代表的意思。以及浏览器兼容性的处理方案。

#### js判断数据类型的方法:
1. typeof、
2. instanceof、
3. constructor、
4. prototyp
注意事项以及优缺点

#### 函数声明和变量声明 
函数声明的提升优先级大于变量声明的提升
```js
foo();    //1
var foo;
function foo(){
    console.log(1);
}
foo=function(){
    console.log(2);
}

// 等价于
function foo() {
    console.log(1);
}
var foo;
foo();
foo = function () {
    console.log(2)
}
```

#### this指向的问题

#### 面向对象的理解 从封装、继承和多态上说了下es5和es6的实现方式

#### bootstrap 原理： class类名

#### vue原理


#### 常见题目
```js
var a = 10;
foo = {
	a: 20,
	bar: function () {
		var a = 30;
		return this.a;
	}
}
console.log(this.a) //10
console.log(foo.a) //20
console.log(foo.bar()) //20
console.log((foo.bar = foo.bar)()) //10
console.log((foo.bar, foo.bar)())  //10
```
