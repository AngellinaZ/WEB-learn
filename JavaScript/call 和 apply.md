敲重点[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

### call , apply

> 使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
   
```javascript
xxx.call(isThis, arg1, arg2, arg3....)
```
```javascript
xxx.apply(isThis, [arg1, arg2, arg3....])
```

***
#### call--模拟实现 (来自[冴羽大大](https://github.com/mqyqingfeng/Blog/issues/11))

```javascript
Function.prototype.call2 = function (context) {
    var context = context || window;  //当call第一个参数是null时， this指向window
    context.fn = this;  //用this获取调用call2的函数

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
```
重点解释代码：
  1. 通过给context.fn函数传递参数
  2. 传入的参数并不确定， 通过从Arguments对象中取值，从第二个到最后一个，取出放到新的数组内
```javascript 
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}
// 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
```
  3. 将数组里的元素作为多个参数放进函数的形参里
```javascript
eval('context.fn('+ args +')')
//这里 args 会自动调用 Array.toString() 这个方法

//es6
context.fn(...args)
```
 
#### apply--模拟实现 (来自[冴羽大大](https://github.com/mqyqingfeng/Blog/issues/11))

```javascript
Function.prototype.apply2 = function (context, arr) {
    var context = Object(context) || window; // 严格模式下
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```
疑问： 为什么不直接使用 eval('context.fn(' + arr + ')') 
> 若arr = ['kavar', 18], eval语句会报错： 找不到kavar变量


**** 
#### 测试
```javascript
// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
console.log(bar.apply2(obj, ['kevin', 18]));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```
