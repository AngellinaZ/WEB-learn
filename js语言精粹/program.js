document.write('Hellon world!');

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}

function myFunction() {
	try {
		var x = document.getElementById("demo").value;
		if (x == '') throw 'empty';
		if (isNaN(x)) throw '不是数字';
		if (x > 10) throw 'too high';
		if (x < 5) throw 'too low';
	} catch(err) {
		var y = document.getElementById("mess");
		y.innerHTML = "Error" + err
	}
}


/*对象*/
//对象字面量 
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

//检索
var middle = stooge['middle-name'] || "(none)";   // ‘||’用来填充默认值，例如在前者undefined的条件下 输出的则为引号内的(none)
var status = flight.status || "unknown";
console.log(flight.equipment);   //undefined
//console.log(flight.equipment.model);  //throw "TypeError"  尝试从undefined的成员属性中取值将会导致异常
console.log(flight.equipment && flight.equipment.model);  //undefined   避免上述错误的方法 ‘&&’

//更新
stooge['first-name'] = 'Jerome';
stooge['middle-name'] = 'Lester';
stooge.nickname ="Curly";
flight.equipment = {
	model: 'Boeing 777'
};
flight.status = 'overdue';

//引用
var a = {}, b = {}, c = {}; //引用不同的空对象
a = b = c = {};//引用同一个空对象

//原型
/*所有通过对象字面量创建的对象都连接到Object.prototype，它是JS中的标配对象*/
if(typeof Object.beget !== 'function') {
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

//反射
/*检查对象并确定对象有什么属性，使用typeof检查对象的原型链; 
  hasOwnProperty(),如果对象拥有独有的属性，返回true，该方法不会检查原型链
*/

//枚举
//1.不推荐使用for in
var name;
for(name in another_stooge) {
	if(typeof another_stooge[name] !== 'function') {
		document.write("<br/>" + name + ': ' + another_stooge[name])
	}
}
//2.推荐使用：创建一个数组，然后使用for
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

//删除 delete 可以用来删除对象的属性。如果对象包含该属性，那么移除，它不会触及原型链中的任何对象。
another_stooge.nickname //"Moe"
delete another_stooge.nickname;
another_stooge.nickname //"Curly"

//减少全局变量污染
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
//1.函数对象：函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)

//2.函数字面量
var add = function (a, b){
	return a + b;
}
	//闭包：一个内部函数除了可以访问自己的参数和变量，同时也能自由的访问把它嵌套在其中的父函数的参数和变量

//3.方法调用模式
	//当一个函数被保存为对象的一个属性时，我们称他为一个方法
	//方法可以使用this来访问自己所属的对象；this到对象的绑定发生在调用时----公共方法
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
var sum = add(3, 4); //以此模式调用函数时，this被绑定到全局对象
	//定义一个变量that并给它赋值为this，那么内部函数就可以通过that访问到外部的this
	//给myObject增加一个double方法
myObject.double = function () {
	var that = this;
	var helper = function () {
		that.value = add(that.value, that.value);
	}
	helper();  //以函数的形式调用helper
}
    //以方法的形式调用double
myObject.double();
document.write(myObject.value)  //6  

//5.构造器调用模式
	//JS是一门基于原型继承的语言，意味着对象可以直接从其他对象继承属性。该语言是无类型的
    //如果在一个函数前面带上new来调用，那么背地里将会创建一个连接到该函数的prototype成员的新对象，同时this会被绑定到那个新对象上

	//创建一个名为Quo的构造器函数，它构造一个带有status属性的对象
var Quo = function (string) {
	this.status = string
}
	//给Quo的所有实例提供一个名为get_status的公共方法
Quo.prototype.get_status = function () {
	return this.status;
}
	//构造一个Quo实例
var myQuo = new Quo("confused");
console.log(myQuo.get_status()); //confused

	//？？？问：为什么访问不到Quo.status

//6.Apply调用模式
	//apply方法接收两个参数，第1个是要绑定给this的值，第2个就是一个参数数组
var array = [3, 4];
var sum = add.apply(null, array);
console.log('sum = ' + sum);

var statusObject = {
	status: 'A-OK'
}
	//statusObject并没有继承自Quo.prototype,但我们可以在statusObject上调用get_status方法，
	//尽管statusObject并没有一个名为get_status的方法。
var status = Quo.prototype.get_status.apply(statusObject); //status值为'A-OK'

//7.参数
	//当函数被调用时，会得到一个参数---arguments数组, arguments是一个‘类似数组’对象。拥有一个length属性，没有其他数组的方法
var sum = funciton () {
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}

//8.返回
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