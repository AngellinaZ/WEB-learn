# Often forget code 

	
****
## 其他
 1. eval(): 把字符串转换为可以执行的js语句
 2. var arr = Object.keys(obj): 将对象转换为数组

****
## Math对象方法

 1. Math.round() 四舍五入
 2. Math.random() 0~1之间的随机数
 3. Math.ceil() 向上舍入
 4. Math.floor() 向下舍入
	
****	
## Number对象方法

 1. xxx.toString 把数字转换为字符串，使用指定的基数 注意：2.toString() // 报错
 2. xxx.toFixed(2)把数字转换为字符串，四舍五入，指定小数点后的位数

****
## String对象方法

 1. concat(stringX,stringX,...,stringX) 链接字符串
 2. replace(regexp/substr,replacement) 替换匹配的值
 3. slice(start,end) 提取字符串的片段
 4. split() 把字符串分隔为字符串数组
 5. join() 把数组转为字符串
 6. substring(start,stop) 提取字符 不接受负数

****
## 事件处理程序

### html事件处理程序
```javascript
<input type="button" value="click me" onclick="alert("hello")" />
```
> 缺点
  1. 存在一个时间差, 当用户在html元素一出现在页面上就去触发相应的事件时，事件的处理程序可能还不具备执行条件
  2. html和js代码耦合度太高, 改一动二 (html和js)

### DMO0级事件处理程序
```javascript
var btn = document.getElementById("myBtn");
btn.onclick = function () { alert(this.id) }
```
> 注意
  1. 先html, 后js
  2. 元素的方法，事件处理程序可以通过this访问元素的任何属性和方法。
  3. 删除 `btn.onclick =null`

### DOM2级事件处理程序
  * addEventListener('click', function () {}, Boolean)
  * removeEventListner('click', function () {}, Boolean)
  > 最后的布尔值参数如果为ture,表示在捕获阶段处理程序，如果为false，表示在冒泡阶段调用事件处理程序。
```javascript
var btn=document.getElementById("myBtn");
btn.addEventListner("onclick",function(){alert("hello world");false}); 
//这里添加的事件处理程序也是依附于元素的的作用域
```
> 优点
  1. 可以为同一个元素添加多个事件处理程序。
  2. 移除时使用的参数与添加事件处理程序的参数相同。
  3. 通过addEventListner添加的匿名函数无法删除。

### IE事件处理程序
  * attachEvent('onclick', fun)
  * detachEvent('onclick', fun)
```javascript
var btn=document.getElementById("myBtn");
btn.attachEvent("onclick",function(){alert("hello world");});
```
> 特点
  1. 由于IE只支持事件冒泡，所以通过attachEvent添加的事件处理程序都会添加到冒泡阶段。
  2. IE在使用attachEvent方法的情况下，事件处理程序的作用域为全局作用域，因此this等于window。
  3. 用来为一个元素添加多个事件处理程序， 事件的处理程序是按逆序触发

### 跨浏览器的事件处理程序 -- 用于处理跨浏览器的兼容性问题
  * 创建的方法是addHandler,它的职责是视情况判定使用DOM0级方法，DOM2级方法，IE方法来添加事件。
  * addHandler接收3个参数：要操作的元素、事件名称、事件处理程序函数。
  * 这个方法属于一个名叫EventUtil的对象, 使用这个对象来处理浏览器之间的差异。
```javascript
var EventUtil = {
  addHandler: function(oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent("on" + sEvent, fnHandler)
  },
  removeHandler: function(oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, fnHandler)
  },
  addLoadHandler: function(fnHandler) {
    this.addHandler(window, "load", fnHandler)
  }
};
```

****
## 其他

 1. 各浏览器之间的兼容性问题
 2. 移动端和网页端的兼容 -- 响应式
 3. IE form提交，后台报错fileUplod... 
  `
  只要你所使用的form最后一个元素是checkBox、Radio之类的没有勾选上的话，使用FormData进行转换就会发生这个错误。
  只需要在form的最后添加一个隐藏的属性用来做最后的元素就可以了。所以我就再记住我的下面添加了一个hidden的input了。
	`
