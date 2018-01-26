#### 补充

 * eval(): 把字符串转换为可以执行的js语句
 * var arr = Object.keys(obj): 将对象转换为数组

****
#### 1.面向对象 参考(https://juejin.im/post/59eff2ad6fb9a045211de7af)

 * 创建对象
   * 工厂模式: 用函数来封装以特定接口创建对象的细节。
```javascript
//能无数次创建相似的对象，不能解决对象识别问题(我不知道你是谁家的)
function createObj (name, type) {
  var o = new Object();
  o.name = name;
  o.type = type;
  o.sayName = function () {
    console.log(this.name)
  }
  return o;
}
var cat = createObj('cat', '猫')
var dog = createObj('dog', '狗')
//cat.constructor == createObj -- false
//cat instanceof createObj -- false
```
   * 构造函数模式：
	  - 首字母大写 
	  - new调用 
	  - 实例对象中，都有一个constructor属性(解决工厂模式谁家孩子问题) 
	  - 创建功能一样的函数(bug)
		
```
调用new会：
· 创建一个新对象
· 将构造函数的作用域赋值给新对象（this执行新的对象）
· 执行构造函数内的代码 
· 返回新对象并赋值给变量
```
```javascript
function CreateObj (name, type) {
   this.name = name;
   this.type = type;
   this.sayName = function () {
	   console.log(this.name)
   }
}
var cat = new CreateObj('cat', '猫')
var dog = new CreateObj('dog', '狗')
//cat.constructor == CreateObj -- true
//cat instanceof CreateObj -- true
//cat.sayName == dog.sayName -- false 创建了两个功能一样的函数!!(bug)
```
   * 原型模式：在创建每一个函数的时候都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，用于包含由特定类型的所有实例共享的属性和方法。
```
 0.先在对象实例上找，找不到，在去原型上找
 1.让所有对象实例共享他的属性和方法 -- 引用类型的属性容易修改共享的值(bug)
 2.原型中的对象属性可以被实例所覆盖重写
 3.通过delete可以删除实例中的属性，但是删除不了对象上的
```
```javascript
function CreateObj (name, type) {
  CreateObj.prototype.name = name;
  CreateObj.prototype.type = type;
  CreateObj.prototype.sayName = function () {
    console.log(this.name)
  }
}
var cat = new CreateObj('cat', '猫')
var dog = new CreateObj('dog', '狗')
//cat.sayName == dog.sayName -- true

//简写：
function Person(){}
Person.prototype = {
   constructor:Person, //因为每创建一个函数，就会自动创建他的prototype对象，这个对象会自动获取contractor属性。???? 
   name:"Neal",
   age:24,
   job:'Software Engineer',
   sayName:function(){
     alert(this.name);	
   }
}
```
   * 组合使用构造函数和原型模式：构造函数模式用于定义实力属性，原型模式用于定义方法和共享的属性。
```javascript
function Person(name,age){
  this.name = name,
  this.age = age,
  if(typeof this.sayName != 'function'){
    Person.prototype.sayName = function(){
      console.log(this.name)
    }
  }
}
```
  * 继承[Neal_yang](https://juejin.im/post/59eff2ad6fb9a045211de7af)
> [摘录](https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo/) 
  为了说明javascript是一门面向对象的语言，首先有必要从面相对象的概念入手
	1. 一切事物皆对象。
	2. 对象具有`封装`和`继承`特性。
	3. 对象与对象之间使用消息通信，各自存在信息隐秘 。
	javascript语言是通过一种叫做原型(prototype) 的方式来实现面向对象编程的。当然，还有比如java就是基于类来实现面向对象编程的。

   * 原型链：利用原型让一个引用类型继承另一个引用类型的属性和方法
```javascript
function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue = function(){
  return this.property;
}

function SubType (){
  this.subproperty = false;
}
//替换SubType的原型为SuperType的实例(新原型具有所谓一个SuperType的实例所拥有的全部属性和方法，而且其内部还有一个指针，指向SuperType的原型)
SubType.prototype = new SuperType(); 

SubType.prototype.getSubValue = function(){
  return this.subproperty;
}

var instance = new SubType();
//instance指向subtype的原型，subtype的原型又指向SuperType的原型。
```
   * 借用构造函数(call apply): 如果都是使用构造函数，那么，也就避免不了方法都在构造函数中定义，然后就会产生大量重复的代码了。
```javascript
function SuperType(name){
  this.colors = ['red','yellow'];
  this.name = name;
}

function SubType(name){
//继承了Super
  SuperType.call(this,name)
}

var instance1 = new SubType('Neal');
alert(instance1.name)
instance1.colors.push('black');
alert(instance1.colors);//'red','yellow','black'

var instance2 = new SubType('yang');
alert(instance2.colors);//'red','yellow'
```
   * 组合继承: 原型链 + 构造函数
```javascript
function SuperType(name){
  this.name = name;
  this.colors = ['red','yellow'];
}

SuperType.prototype.sayName = function(){
  alert(this.name);
}

function SubType(name,age){
  //继承属性
  SuperType.call(this,name);
  this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType('Nealyang',24);
instance1.colors.push('white');
instance1.sayName();//Nealyang
instance1.sayAge();// 24

var instance2 = new SubType('Neal',21);
alert(instance2.colors);//'red','yellow'
instance2.sayName();//Neal
instance2.sayAge();//21
```
	
****
#### 3.Math对象方法

 * Math.round() 四舍五入
 * Math.random() 0~1之间的随机数
 * Math.ceil() 向上舍入
 * Math.floor() 向下舍入
	
****	
#### 4.Number对象方法

 * xxx.toString 把数字转换为字符串，使用指定的基数 注意：2.toString() // 报错
 * xxx.toFixed(2)把数字转换为字符串，四舍五入，指定小数点后的位数

****
#### 5.String对象方法

 * concat(stringX,stringX,...,stringX) 链接字符串
 * replace(regexp/substr,replacement) 替换匹配的值
 * slice(start,end) 提取字符串的片段
 * split() 把字符串分隔为字符串数组
 * join() 把数组转为字符串
 * substring(start,stop) 提取字符 不接受负数

****
#### 6. call 和 apply 

 * 能动态改变this指向, thisObj: this指向, obj: 要调用的对象或者方法
 * call： obj.call(thisObj, arg1, arg2...);
 * aply:  obj.apply(thisObj, [arr1, arr2...]);
 
****
#### 7.变量 (https://juejin.im/post/59c91b106fb9a00a4b0c5f0e)
 
 * ECMAScript中, 变量分为`基本类型`和`引用类型`
   * 基本类型： 存储简单的数据段，一般为Number, String, Boolean, undefined, null
   * 引用类型： 由多个键值对构成的对象， Object
 * 变量赋值和传参(引用类型)
   * 引用类型传参时，是通过引用(内存地址)
   * 1--内部局部变量obj存的是person的内存地址，通过这个地址可以找到`person对象本身`并对其进行修改
   * 2--用一个新的对象的内存地址赋值给obj, obj失去对person的引用, 但person对象本身已存有键值对
```javascript
function setName(obj) {
  obj.name = "Neal";  //1
  obj = new Object(); //2
  obj.name = "yang";
}
var person = new Object();
setName(person);
console.log(person.name); //Neal
```

****
#### 8.执行环境及其作用域

 * `执行环境`定义了变量或函数有权访问其他数据, 每个执行环境都有一个与之相关的`变量对象`，环境中定义的所有变量和函数都保存在这个对象中。
 * 当代码在一个环境中执行的时候，会创建变量对象的一个`作用域链`
   * 作用域链的用途，是保证对执行环境有权访问的变量和函数的有序访问。
   * 作用域链的前端，始终是当前执行的代码所在的环境的变量对象。全局执行环境始终是作用域链的最后一个对象。
   * 内部环境可以通过作用域链访问外部环境的变量
```javascript
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
![action-scope](https://github.com/AngellinaZ/WEB-learn/blob/master/images/actionScope.png)

****
#### 9.延长作用域链

 * try-catch 语句中的catch
 * width语句
 
****
#### 10.垃圾收集

 * 标记清除
 * 主动清除垃圾： xxx = null

****
#### 99.其他

 1. 各浏览器之间的兼容性问题<br>
 2. 移动端和网页端的兼容 -- 响应式<br>
 3. IE form提交，后台报错fileUplod... <br>
  `
  只要你所使用的form最后一个元素是checkBox、Radio之类的没有勾选上的话，使用FormData进行转换就会发生这个错误。
  只需要在form的最后添加一个隐藏的属性用来做最后的元素就可以了。所以我就再记住我的下面添加了一个hidden的input了。
	`
