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

### 99.其他

 1. 各浏览器之间的兼容性问题<br>
 2. 移动端和网页端的兼容 -- 响应式<br>
 3. IE form提交，后台报错fileUplod... <br>
  `
  只要你所使用的form最后一个元素是checkBox、Radio之类的没有勾选上的话，使用FormData进行转换就会发生这个错误。
  只需要在form的最后添加一个隐藏的属性用来做最后的元素就可以了。所以我就再记住我的下面添加了一个hidden的input了。
	`
