### 补充

 * eval(): 把字符串转换为可以执行的js语句
 * var arr = Object.keys(obj): 将对象转换为数组


### 1.对象 

 * JS中所有变量都可以当作对象使用，除了null,undefined
 * 用[]访问属性的特殊： 1.动态设置属性 2.属性名不是一个有效的变量名(比如包含空格，JS的关键词)； 推荐点操作符
 * 删除属性delete obj.xxx
 * 哈希表？
 
 ```
 2.toString() //报错
 2 .toString() //"2"
 ```
        

### 2.原型 

 * prototype原型模型
	

### 3.Math对象方法

 * Math.round() 四舍五入
 * Math.random() 0~1之间的随机数
 * Math.ceil() 向上舍入
 * Math.floor() 向下舍入
	
	
### 4.Number对象方法

 * xxx.toString 把数字转换为字符串，使用指定的基数 注意：2.toString() // 报错
 * xxx.toFixed(2)把数字转换为字符串，四舍五入，指定小数点后的位数


### 5.String对象方法

 * concat(stringX,stringX,...,stringX) 链接字符串
 * replace(regexp/substr,replacement) 替换匹配的值
 * slice(start,end) 提取字符串的片段
 * split() 把字符串分隔为字符串数组
 * join() 把数组转为字符串
 * substring(start,stop) 提取字符 不接受负数


### 6. call 和 apply 

 * 能动态改变this指向, thisObj: this指向, obj: 要调用的对象或者方法
 * call： obj.call(thisObj, arg1, arg2...);
 * aply:  obj.apply(thisObj, [arr1, arr2...]);
 
 
### 7.变量 (https://juejin.im/post/59c91b106fb9a00a4b0c5f0e)
 
 * ECMAScript中, 变量分为`基本类型`和`引用类型`
   * 基本类型： 存储简单的数据段，一般为Number, String, Boolean, undefined, null
   * 引用类型： 由多个键值对构成的对象， Object
 * 变量赋值和传参(引用类型)
   * 引用类型传参时，是通过引用(内存地址)
   * 1--内部局部变量obj存的是person的内存地址，通过这个地址可以找到`person对象本身`并对其进行修改
   * 2--用一个新的对象的内存地址赋值给obj, obj失去对person的引用, 但person对象本身已存有键值对
```
function setName(obj) {
  obj.name = "Neal";  //1
  obj = new Object(); //2
  obj.name = "yang";
}
var person = new Object();
setName(person);
console.log(person.name); //Neal
```

### 8.执行环境及其作用域

 * `执行环境`定义了变量或函数有权访问其他数据, 每个执行环境都有一个与之相关的`变量对象`，环境中定义的所有变量和函数都保存在这个对象中。
 * 当代码在一个环境中执行的时候，会创建变量对象的一个`作用域链`
   * 作用域链的用途，是保证对执行环境有权访问的变量和函数的有序访问。
   * 作用域链的前端，始终是当前执行的代码所在的环境的变量对象。
   * 全局执行环境始终是作用域链的最后一个对象。
```
var color = 'red';
function changeColor() {
  var anotherColor = 'blue';
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    //这个执行环境中可以访问到 tempColor color antherColor
  }
  //这里只能访问anotherColor color
  swapColors();
}
changeColor();//这里只能访问colo
```
 

### 99.其他

 1. 各浏览器之间的兼容性问题<br>
 2. 移动端和网页端的兼容 -- 响应式<br>
 3. IE form提交，后台报错fileUplod... <br>
  `
  只要你所使用的form最后一个元素是checkBox、Radio之类的没有勾选上的话，使用FormData进行转换就会发生这个错误。
  只需要在form的最后添加一个隐藏的属性用来做最后的元素就可以了。所以我就再记住我的下面添加了一个hidden的input了。
	`
