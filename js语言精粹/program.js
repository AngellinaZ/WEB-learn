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