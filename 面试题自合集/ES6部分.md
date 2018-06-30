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
```

## 箭头函数需要注意的地方
## ES6 let、const
## set数据结构
## promise对象的用法,手写一个promise
## class的理解
## 模版语法的理解
## rest参数
## module体系
