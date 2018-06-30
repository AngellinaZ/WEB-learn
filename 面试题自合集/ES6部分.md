## class
> 定义类, 语法糖
ES5
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
}
var p = new Point(1, 2)
```
ES6
1. constructor中的this指向新创建的实例对象，利用this往新创建的实例对象扩展属性。
2. constructor(){}, 默认被添加
3. 不存在变量提升
```js
//类声明
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
let p2 = new Point(2, 3)

//类表达式
const People = class P {
  constructor() {
    console.log('xxx')
  }
}
new People();
new P(); // error
```
extends继承: 实现类之间的继承
```js
class Parent {
  constructor(name, age) {
     this.name = name;
     this.age = age;
  }
  speak() {
    console.log('i can')
  }
}

class Child extends Parent {
  //如果子类中有constructor构造函数，则必须使用调用super。
  constructor(name, age) {
    super(name, age)
  }
  coding() {
    console.log("Child's coding")
  }
}

let eg = new Child();
eg.speak(); // i can
```

## 箭头函数需要注意的地方
1. 动态上下文时不使用箭头函数, this指向定义时所在的对象(父作用域), 而不是使用时的对象
2. 不能用作构造函数, 即不能使用new命令
3. 不能使用arguments对象

## ES6 let、const
let: 不是全局变量，具有块级函数作用域,大多数情况不会发生变量提升
```js
var a = []
for (var i = 0; i < i; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[5]() // 10

//let 
for (let i = 0; i < i)
```

## set数据结构
## promise对象的用法,手写一个promise
## class的理解
## 模版语法的理解
## rest参数
## module体系
