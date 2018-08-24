## Q

 输入一个整数(大于0),返回一个拼接的字符串，例如 fun(12045) 得到 '10000 + 2000 + 40 + 5'

[运行展示](https://jsfiddle.net/big_fish/spsudyz8/?utm_source=website&utm_medium=embed&utm_campaign=spsudyz8)


**Math.pow(x, y)**

返回： 返回 x 的 y 次幂的值

注意： 如果结果是虚数或负数，则该方法将返回 NaN。如果由于指数过大而引起浮点溢出，则该方法将返回 Infinity。


**String repeat()**

返回： 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
/** 
 * str: String
 * count: Number, 整数[0, +∞)
 */

let resultString = str.repeat(count);

"abc".repeat(3.6)  //"abcabcabc" 自动向下取整
```


**Array reduce()**

补充： reduceRight() 从右到左

返回： 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值

注意： 对于空数组是不会执行回调函数的。

```js
// total: 初始值, 或者计算结束后的返回值, 一般是arr[0]
// currentValue: 当前元素的值, 一般是arr[1]
// index: 当前元素的索引值
// arr: 当前元素属于的数组对象

array.reduce(function(total, currentValue[, index, arr]), initialValue)
```

例子：
```js
let result = [65, 44, 12, 4].reduce((total, curr) => total + curr); //125
```

**Array map()**

返回： 处理后的新数组

注意： 不会对空数组进行检测, 不会改变原始数组。

```js
// currentValue: 当前元素的值, index: 当前元素的索引值, arr: 当前元素属于的数组对象
array.map(function(currentValue [, index, arr] ), thisValue)
```

例子：
```js
let result = [65, 44, 12, 4].map(num => num * 6); //[390, 264, 72, 24]
```

**Array filter()**

返回： 返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。

注意： 不会对空数组进行检测, 不会改变原始数组。

```js
// currentValue: 当前元素的值, index: 当前元素的索引值, arr: 当前元素属于的数组对象
array.filter(function(currentValue [, index, arr] ), thisValue)
```

例子：
```js
let result = [65, -44, 12, 4, 0, -2].filter(num => num > 0); //[65, 12, 4]
```
