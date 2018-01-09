# JS语言精粹

#### NaN

 * NaN是一个数值，它表示一个不能产生正常结果的运算结果。NaN不等于任何值，包括它自己，isNaN(number)检测NaN，可用于检测是不是数字，返回false
 * Infinity 类似 正无穷大


#### 字符

 * Javascript在被创建的时候，Unicode是一个16位的字符集，所以JS中的所有字符都是16位
 * 两个包含着完全相同的字符且字符顺序也相同的字符串被认为是相同的字符串，'c'+'a'+'t'=='cat' 是true


#### 常见语句

 * 条件语句（if 和 switch）
 * 循环语句（while、for 和 do）
 * 强制跳转语句（break、return 和 throw）
> 下面的值被当作假：false、null、undefined、空字符串''、数字0、数字NAN


#### for..in..

 * for(variable in object) block 在每次循环中，object的下一个属性名字符串被赋值给variable,用object.hasOwnProperty(variable)来确定这个属性名是该对象的成员，还是来自原型链。 
 ```
  for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {
      ...
    } 
  }
 ```


#### return 和 break

 * return: 导致从函数中提前返回。可以指定要被返回的值 || undefined；js不允许在return关键字和表达式之间换行
 * break: 使程序退出一个循环语句或switch语句，它可以指定一个可选的标签，那退出的就是带该标签的语句；js不允许在break关键字和标签之间换行

#### typeof返回值

 * 值有'number','string','boolean','undefined','function'和’object'。
 * 如果运算数是一个`Array`或`null`，那么结果是`object`。
 
 
#### 数据类型

 * 简单数据类型：Number、String、Boolean、null、undefined
 * 复杂数据类型：Object -- JS内的对象是无类型(class-free)的，对新属性的名字和属性的值没有限制，对象可以包含其他对象。
  

#### 函数

 * 函数就是对象。
 * 对象字面量产生的对象连接到Object.prototype；函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)


#### 4种调用模式：

 * 方法调用模式：当一个函数被保存为对象的一个属性时，称之为一个方法。当一个方法被调用时，this被绑定到该对象。xxx.xx()
 * 函数调用模式: 当一个函数并非一个对象的属性时，被当做一个函数调用。var that = this
 * 构造器调用模式？
 * apply调用模式？
  
  
#### 作用域

 * 控制着变量与参数的可见性及生命周期--减少了名称的冲突，提供了自动内存管理
 * 定义在函数中的参数和变量，函数外部不可见，内部任何地方可见


####  继承

 * JS是一门基于原型的语言，意味着对象直接从其他对象继承
 
 * 伪类
 
   * 不直接让对象从其他对象继承，反而插入一个多余的间接层：通过 构造器函数 产生对象
   * 当一个函数对象被创建时, Function构造器产生的函数对象会运行`this.prototype = {constructor: this}`, 新函数对象被赋予一个prototype属性，它的值是一个包含constructor属性且属性值为该新函数的对象.这个prototype对象是存放继承特性的地方.
   * 因为js语言没有提供一个方法去确定哪个函数式打算来做构造器的，所以每个函数都会有一个prototype的对象
   * 缺点
    * 没有私有环境，所有属性都是公开的。无法访问super（父类）方法。
    * 如果在调用构造器函数时候忘记调用new操作符，那么this将不会绑定到新的对象上，而是全局window上。
    * “伪类”的形式可以给不收悉js的程序员便利，但它也隐藏了该语言的真实本质。借鉴类的表示法可能误导程序员去编写过于深入与复杂的层次结构。
    * construction的指向错误。
      
 * 原型
    * 在一个纯粹的原型继模式中，我们会摒弃类，转而专注于对象。
    * 基于原型的继承先对基于类的继承在概念上更加简单：一个对象可以继承以旧的对象。
      
      
 * 函数化
    * 大部分所看到的继承模式的一个弱点就是没办法去保护隐私。对象的属性都是可见的。没有办法得到私有的变量和函数。
    ```
    var consturctor = function(spec, my){
         var that,   // 其他的私有实例变量
         my = my || {};

        // 把共享的变量和函数添加到 my 中
        // 给 that = 一个新的对象
        // 添加给 that 的特权方法
        
        return that; // 最后把 that 对象返回
   };
   ```
   * 创建一个对象。
   * 定义私有实例的变量和方法。
   * 给这个新的对象扩充方法，这些方法拥有特权去访问参数。
   * 返回那个对象
      
      
 #### 正则
      
