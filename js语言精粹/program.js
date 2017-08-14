document.write('Hellon world!');

/*语法*/
Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}
//如果throw语句在一个try代码块中，那么控制流会跳转到catch从句中。如果throw语句在函数中，则该函数调用被放弃，控制流跳转到该函数的try语句的catch从句中
function myFunction() {
	try {
		var x = document.getElementById("demo").value;
		if (x == '') throw 'empty';
		if (isNaN(x)) throw '不是数字';
		if (x > 10) throw 'too high';
		if (x < 5) throw 'too low';
	} catch(err) {  //接收抛出的异常对象
		var y = document.getElementById("mess");
		y.innerHTML = "Error" + err
	}
}


/*对象*/
//1.对象字面量 
var empty_object = {};
var stooge = {
	"first-name" : "Jerome",
	"last-name" : "Howard"
};
var flight = {
	airline : "Oceanic",
	number : 815,
	departure : {
		IAIA : "SYD",
		time : "2004-09-22 14:55",
		city : "sydney"
	},
	arrival : {
		IAIA : "LAX",
		time : "2004-09-22 10:42",
		city : "los Angeles"
	}
}

//2.检索
var middle = stooge['middle-name'] || "(none)";   // ‘||’用来填充默认值，例如在前者undefined的条件下 输出的则为引号内的(none)
var status = flight.status || "unknown";
console.log(flight.equipment);   //undefined
//console.log(flight.equipment.model);  //throw "TypeError"  尝试从undefined的成员属性中取值将会导致异常
console.log(flight.equipment && flight.equipment.model);  //undefined   避免上述错误的方法 ‘&&’

//3.更新
stooge['first-name'] = 'Jerome';
stooge['middle-name'] = 'Lester';
stooge.nickname ="Curly";
flight.equipment = {
	model: 'Boeing 777'
};
flight.status = 'overdue';

//4.引用： 对象通过引用来传递。它们永远不会被复制。
var a = {}, b = {}, c = {}; //引用不同的空对象
a = b = c = {};//引用同一个空对象

//5.原型
/*每个对象都连接到一个原型对象, 并且可以从中继承属性. 所有通过 对象字面量 创建的对象都连接到Object.prototype，它是JS中的标配对象*/
//创建一个使用原对象作为其原型的新对象
if (typeof Object.beget !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';
another_stooge.profession; // 'actor'

//6.反射
/*检查对象并确定对象有什么属性，使用typeof检查对象的原型链; 
  hasOwnProperty(),如果对象拥有独有的属性，返回true，该方法不会检查原型链
*/

//7.枚举
//1).不推荐使用for in
var name;
for(name in another_stooge) {
	if(typeof another_stooge[name] !== 'function') {
		document.write("<br/>" + name + ': ' + another_stooge[name])
	}
}
//2).推荐使用：创建一个数组，然后使用for
var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for(i = 0; i < properties.length; i ++) {
	document.write("<br/>" + properties[i] + ': ' + another_stooge[properties[i]])
}

//8.删除 delete 可以用来删除对象的属性。如果对象包含该属性，那么移除，它不会触及原型链中的任何对象。
another_stooge.nickname //"Moe"
delete another_stooge.nickname;
another_stooge.nickname //"Curly"

//9.减少全局变量污染
/*只创建一个唯一的全局变量*/
var MYAPP = {};
MYAPP. stooge = {
	"first-name" : "Jerome",
	"last-name" : "Howard"
};
MYAPP. flight = {
	airline : "Oceanic",
	number : 815,
	departure : {
		IAIA : "SYD",
		time : "2004-09-22 14:55",
		city : "sydney"
	},
	arrival : {
		IAIA : "LAX",
		time : "2004-09-22 10:42",
		city : "los Angeles"
	}
}


/*函数*/
//1.函数对象
//JS中的函数就是对象.
//对象字面量 产生的对象连接到 Object.prototype; 函数对象 连接到 Function.prototype(该原型对象本身连接到Object.prototype);

//2.函数字面量 创建 函数对象
//创建一个名为add的变量，并用来把两个数字相加的函数赋值给它
var add = function (a, b){
	return a + b;
}
	//函数字面量包括四个部分：1).保留字function  2).函数名，可省略，如上例子为匿名函数  3).圆括号内的参数  4).花括号内的主体部分

//3.方法调用模式
	//当一个函数被保存为对象的一个属性时，我们称他为一个方法  xxx.xx()
	//this绑定：当一个方法被调用时，this被绑定到该对象。this到对象的绑定发生在调用时----公共方法
var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;  
	}
};
myObject.increment();
console.log(myObject.value); //1
myObject.increment(2);
console.log(myObject.value); //3

//4.函数调用模式
	//当一个函数并非一个对象的属相时，被当做一个函数来调用
	//this绑定：全局对象--> 这是一个语言设计的错误
	//定义一个变量that并给它赋值为this，那么内部函数就可以通过that访问到外部的this

myObject.double = function () {  //给myObject增加一个double方法
	var that = this;
	var helper = function () {
		that.value = add(that.value, that.value);
	}
	helper();  //以函数的形式调用helper
}
myObject.double(); //以方法的形式调用double
document.write(myObject.value)  //6  

//5.构造器调用模式
	//构造器函数：一个函数，创建的目的就是希望结合new前缀来调用    
	//new 函数(): 背地里将会创建一个 连接到该函数的prototype成员的 新对象，同时this会被绑定到那个新对象上
	//this绑定：指向新对象
	
var Quo = function (string) {  //创建一个名为Quo的构造器函数，构造一个带有status属性的对象
	this.status = string
}
Quo.prototype.get_status = function () { 
	return this.status;
}
	//构造一个Quo实例 调用形式：在函数名前加 new 来调用,new方法返回的是构造器函数原型的引用
var myQuo = new Quo("confused"); 
console.log(myQuo.get_status()); //confused  this.status即Quo.prototype.status在调用new构造Quo时即被赋予了confused。
console.log(myQuo.status); //confused 
typeof Quo; //function 构造器函数
typeof MyQuo; //Object 对象

	//？？？问：为什么访问不到Quo.status ---- 因为Quo是函数

//6.Apply调用模式
	//apply方法接收两个参数，第1个是要绑定给this的值，第2个就是一个参数数组
var array = [3, 4];
var sum = add.apply(null, array);//sum = 7

var statusObject = {
	status: 'A-OK'
}
	//statusObject并没有继承Quo.prototype,但可以在statusObject上调用get_status方法，尽管statusObject并没有一个名为get_status的方法。
var status = Quo.prototype.get_status.apply(statusObject); //status值为'A-OK'

//7.参数
	//当函数被调用时，会得到一个参数---arguments数组, arguments是一个‘类似数组’对象。拥有一个length属性，没有其他数组的方法
	//函数可以通过此arguments访问所有它被调用时 递给它的参数列表，包括没有被分配给函数声明时定义的形式参数的多余参数
var sum = funciton () { 
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}

//8.返回
	//return语句可用来使函数提前返回。当return被执行时，函数立即返回而不再执行余下的语句
	//一个函数总是会返回一个值，如果没有指定的返回值，则返回undefined
	//如果函数调用时在前面加上了new前缀，且返回值不是一个对象，则返回this（该新对象）

//9.异常
var add = function (a, b) {
	if (typeof a !=== 'number' || typeof b !=== 'number') {
		throw {   
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}
//throw语句会抛出一个exception对象，对象包含一个用来识别异常类型的name属性和一个描述性的message书香
	//构造一个try_it函数，以不正确的方式调用之前的add函数
var try_it = function () {
	try {
		add("seven");
	} catch (e) {
		console.log(e.name + ":" + e.message);
	}
}
try_it();
    //一个try语句只会有一个捕获所有异常的catch代码块

//10.扩充类型的功能
//通过给Function.prototype增加方法使得该方法对所有函数可用; 因为基本类型的原型是公用结构，在类库混用时务必小心, 加判断
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}
}

Number.method('integer', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
})
(-10 / 3).integer();  //？？？为什么不能integer(-10 / 3)这样调用

//移除字符串首尾空白
String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
})

//10递归：一个递归函数调用自身去解决它的子问题---见例子

//11闭包
//通过调用一个函数的形式去初始化myObejct，该函数会返回一个对象字面量，
var myObject = (function () {
	var value = 0;
	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function () {
			return value;
		}
	};
}());//()：函数的调用；区别于(function xxx() {})()

//创建一个quo的构造函数，它构造出带有get_status方法和status私有属性的一个对象
var quo = function (status) {
	return {
		get_status: function () {
			return status;
		}
	};
};
//构造一个quo实例
var myQuo = quo("amazed");
console.log(myQuo.get_status())

// 渐变body的背景色（黄色到白色）
var fade = function(node){
    var level = 1;  //1.
    var step = function(){ //3.
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if(level < 15){
            level += 1;
            setTimeout(step, 500); // 如果level小于15，则内部函数自我调用
        }
    };
    setTimeout(step, 1); // 2.调用内部函数 
};
fade(document.body);

//糟糕的例子
var add_the_handlers = function(nodes){
	var i; //变量i
    for(i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function(e){ 
            alert(i);
        };
    }
};
var objs = document.getElementsByName("test");
add_the_handlers(objs);
// 造成上面的原因是：a标签的事件处理器函数绑定了变量i，则不是函数在构造时的i值。
// 解决方案如下：
var add_the_handlers = function(nodes){
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function(i){
            return function(e){
                alert(i); // 输出的i是构造函数传递进来的i，不是事件处理绑定的i。
            };
        }(i);
    }
};
//或者
var add_the_handlers = function(nodes){
    var helper = function (i) {
		return function (e) {
			alert(i);
		};
	};
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i);
    }
};
//----> 注意：避免在循环中创建函数, 我们可以在循环之外创建一个辅助函数, 让辅助函数在返回一个绑定了当前i值的函数, 防止混淆

//12.记忆
//例子：Fibonacci数列,前面相邻两项之和等于后一项的值
var i = 0; //累计函数被调用的次数
// var fibonacci = function (n) {
//     i++; //被调用453次
//     console.log(i);
//     return n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1);
// }

//创建一个memo数组来存储结果， 存储结果隐藏在闭包中
var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
	//i++; //被调用29次  
	var result = memo[n];
	if (typeof result !== 'number') { //当n = 2 时 result = undefined, 进入判断
	    result = fib(n - 1) + fib(n - 2);
	    memo[n] = result;
	}
	return result;
    };
    return fib;
};
var xxx = fibonacci(); //返回fib()
for (var n = 0; n <= 10; n++) {
    document.write(n + ":  " + xxx(n) + "</br>");
}

//---> 封装：带有记忆功能的函数 设计产生另一个函数的函数
var memoizer = function (memo, formula) {
	var recur = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	};
	return recur;
} 
//-->例子: 阶乘函数
var factorial = memoizer([1, 1], function (recur, n) {
	return n * recur(n - 1)
})


/*继承*/
//1.基于 伪类 的继承

//2.基于 原型 的继承：一个新对象可以继承一个旧对象的属性
//用对象字面量构造一个对象
var Person = {
    name: 'john',
    sayName: function(){
        alert(this.name);
    },
    sayHello: function(){
        alert('Hello');
    }
};
//有了想要的对象后，就可以利用Object.create方法来构造出更多的实例：
var nPerson = Object.create(Person);
nPerson.sayName(); // john
//这是一种差异化继承。通过定制一个新的对象，我们指明它与所基于的基本对象的区别。

/*继承*/
Array.method('reduce', function(f, value) {
	for (var i = 0; i < this.length; i++) {
		value = f(this[i], value);    //？？？？？？thi指向的是什么
	}
	return value;
});

var data = [1,2,3,4,7];
var add = function (a, b) {
	return a + b;
}
data.reduce(add, 0);
