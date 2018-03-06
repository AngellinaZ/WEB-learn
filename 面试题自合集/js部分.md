### 数据类型
1. 基本数据类型： Number, String, Boolean, undefined, null 
2. 复杂数据类型： Object，Array，Function，RegExp，Date，Error
3. 全局数据类型： Math
4. ES6新增数据类型： Symbol


### 闭包 [参考](https://github.com/mqyqingfeng/Blog/issues/9)


### 前端跨域 [参考](https://juejin.im/post/5a2f92c65188253e2470f16d)
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


### 函数声明和变量声明 
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
var foo; //如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性（为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。）
foo();
foo = function () {
    console.log(2)
}
```

### js判断数据类型的方法 [参考](https://www.cnblogs.com/dushao/p/5999563.html)
1. typeof
> 注意：typeof 返回的类型都是字符串形式(小写), 可以判断 function 类型, 不推荐用于判断Object类型
typeof 返回的数据类型： string, number,boolean,function, undefined, object, 
```js
typeof "iamstring.";  //"string"
typeof 22;            //"number"

typeof [1,2,3];       //"object"
typeof new Date();    //"object"
typeof null;          //"object"

typeof function(){alert(111);}; //"function" 

typeof a == "string"; //true
typeof a == String;   // false
```

2. instanceof：判断已知对象类型的方法
> 注意：instanceof 后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。
```js
var c = [1, 3, 4];
var d = new Date();
var f = function(){alert(111);};

c instanceof Array; // true
d instanceof Date;  // true
f instanceof Function; // true
f instanceof function; // false
```

3. constructor
> 注意： constructor 在类继承时会出错

4. prototyp
> 注意： 大小写不能写错，比较麻烦，但胜在通用。
```js
var a = "iamstring.";
var b = 222;
var c= [1,2,3];
var d = new Date();
var e = function(){alert(111);};
var f = function(){this.name="22";};

Object.prototype.toString.call(a) === ‘[object String]’;     //true;
Object.prototype.toString.call(b) === ‘[object Number]’);    // true;
Object.prototype.toString.call(c) === ‘[object Array]’);     // true;
Object.prototype.toString.call(d) === ‘[object Date]’);      // true;
Object.prototype.toString.call(e) === ‘[object Function]’);  // true;
Object.prototype.toString.call(f) === ‘[object Function]’);  // true;
 ```



### js 事件执行机制: [3.1](http://blog.csdn.net/qq_31628337/article/details/71056294)
event loop，microtask，task queue。
事件委托、捕获、冒泡、目标阶段,target和currentTarget

### ajax 原理
>原理：通过 XmlHttpRequest 对象向服务器发异步请求，从服务器获得数据，然后用js来操作DOM而更新页面。
以及浏览器兼容性的处理方案。
1. ajax 技术核心 XMLHTTPRequest对象
```js
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
}
xhr.open(method, url, async); // method: 'GET'/'POST', async: true异步/false同步
xhr.send(null); //当POST时可设置string
xhr.onreadystatechange = function(){ //每当 readyState 属性改变时，就会调用该函数。
	if(xhr.readyState == 4){
	    if(xhr.status == 200){
		success(xhr.responseText); //或者 responseXml
	    } else { // fail
		fail && fail(xhr.status);
	    }
	}
}
```

readyState：自身状态
  * 0：请求未初始化，即未调用open()
  * 1： 服务器连接已建立
  * 2： 请求已接收
  * 3： 请求处理中
  * 4： 请求已完成，且响应已就绪, 此时可以通过通过responseXml和responseText获取完整的回应数据

status:
  * 200: "OK"  
  * 404: 未找到页面


### 异步 同步
异步： 彼此独立，不需要等待上一个程序返回结果后在执行下一个，例如线程

同步： 顺序执行;下一个程序的执行要等上一个程序执行完成后才能执行，也就是得出结果后下一个才执行


### this指向的问题
```js
var a = 10;
foo = {
	a: 20,
	bar: function () {
		var a = 30;
		return this.a;
	}
}
console.log(this.a); //10
console.log(foo.a);  //20
console.log(foo.bar());  //20
console.log((foo.bar = foo.bar)()); //10
console.log((foo.bar, foo.bar)());  //10
```

### 面向对象的理解 
从封装、继承和多态上说了下es5和es6的实现方式

### JavaScript继承 
从原型继承、构造函数继承、组合继承、寄生组合继承优缺点和实现方式都说

### JavaScript的节流和防抖


### bootstrap 原理
栅格布局系统， 通过css3的 @media 查询实现响应式布局 [@media](http://www.runoob.com/cssref/css3-pr-mediaquery.html)
```css
@media screen and (min-width: 480px) {  
    body {  
        background-color: lightgreen;  
    }  
}  
```

### vue原理


