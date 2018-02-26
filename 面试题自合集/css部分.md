## css
 
#### 文本溢出
1. 单行文本溢出显示 
```css
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
```

2. 多行文本溢出显示
适用范围： 因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；
```css
  display:  -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //文本行数
  overflow: hidden;
```

#### 让图文不可复制
```css
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
```
复制的文本 都会被加上一段来源说明:
> 思路
1. 监听copy事件，并阻止这个事件的默认行为
2. 获取选中的内容window.getSelection(), 加上版权信息, 然后设置到剪切clipboarddata.setData()
 
#### css常用布局
1. 标准盒模型 和 IE怪异盒模型: width是否包含padding和border值 
  ```
  解决方法：设置属性 box-sizing: content-box || border-box(怪异模式) || inherit;
  ```
2. 定位布局： 
```css
position：absolute / relative / fixed / static
```
3. 流布局: 正常布局
4. 浮动布局： 如何清除浮动？ 
  ```css
   .clearfloat {clear: both }
   
   .clearfloat:after{
      display:block;
      clear:both;
      content:"";
      visibility:hidden;
      height:0; 
    }  
    .clearfloat{zoom:1} // IE浏览器 zoom: 1 属性能清除浮动
  ```
5. flex布部: 一维布局, align-items(交叉轴) justify-content(主轴)
6. grid布局：二维布局
7. 圣杯布局 和 双飞翼布局： 两边定宽，中间自适应的三栏布局，中间栏要放在文档流前面以优先渲染。[代码](https://github.com/AngellinaZ/blog/blob/master/examples/%E5%9C%A3%E6%9D%AF%2C%E5%8F%8C%E9%A3%9E%E7%BF%BC.html)
```html
<div id="container">
	<div id="main" class="col">
	    <div id="main-wrap">
		#main
	    </div>
	</div>
	<div id="left" class="col">
	#left
	</div>
	<div id="right" class="col">
	#right
	</div>
</div>
```

#### 盒子垂直水平居中
1. 盒子宽高已知：
```css
	height: 50px;
	line-height: 50px;
	text-align: center;
```
或者： 
```css
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: 自身一半宽度;
	margin-top: 自身一半高度;
```
2. 子盒子 宽高不定时： 
```css
	position: relative / absolute;
    /*top和left偏移各为50%*/
	top: 50%;
	left: 50%;
    
    /*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
	/*注意这里启动了3D硬件加速: 会增加耗电量的*/
    transform: translate(-50%, -50%);
```
3. flex 布局
```css
   /*父*/
   display: flex;
   
   /*子*/
   align-items: center;
   justify-content: center;
```


#### 改变placeholder的字体颜色大小
仅用于PC端
```css
input::-webkit-input-placeholder {  
   /* WebKit browsers /  
   font-size:14px; 
   color: #333; 
}  
input::-moz-placeholder {  
  / Mozilla Firefox 19+ /  
  font-size:14px; 
  color: #333; 
}  
input:-ms-input-placeholder {  
  / Internet Explorer 10+ */  
  font-size:14px; 
  color: #333; 
}
```

#### BFC (块级格式化上下文) 
触发条件： 
1. float 的值不为 none
2. overflow: auto / scroll / hidden
3. display: table-cell / table-caption / inline-block
4. position 的值不为 relative 和 static


#### cookies, session, sessionStorage, localStorage
1. Cookies是保存在客户端的小段文本(4kb)，随客户端请求发送该url下的所有cookies到服务器端，在浏览器和服务器间来回传递。同源共享。有效期为expire之前。
```
cookie属性: 
  domain: 访问cookie的域名。
  expires/Max-Age: cookie超时时间。若设置其值为一个时间，当到达此时间cookie失效。不设置默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。
  Size: cookie大小。
  http: cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。
  secure: 设置是否只能通过https来传递此条cookie
```

2. Session则保存服务器段，通过唯一的值sessionID来区别每一个用户。SessionID随每个请求发送到服务器，服务器根据sessionID来识别客户端，再通过session 的key获取session值。SessionID传回服务器的实现方式可以通过cookies和url回写来实现。

3. sessionStorage（会话存储）是在同源的同窗口（或tab）中，始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁。同时“独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的。

4. localStorage（本地存储）始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据，并可用于所有同源（相同的域名、协议和端口）窗口（或标签页）。
  

#### 前端安全问题: [建议参考](https://www.jianshu.com/p/e6b7b097896e)
1. XSS: 跨站脚本攻击（Cross-Site Scripting）
2. 警惕iFrame带来的风险
3. 别被点击劫持了
4. 错误的内容推断
5. 防火防盗防猪队友：不安全的第三方依赖包
6. 用了HTTPS也可能掉坑里
7. 本地存储数据泄露
8. 缺失静态资源完整性校验


####  animation 与 transition
```css
animation：mymove 5s infinite; 
@keyframes mymove
{
from {left:0px;}
to {left:200px;}
}

transition:width 2s;
```
区别：

为什么动画推荐用c3而不是js :原生的CSS过渡在客户端需要处理的资源要比用JavaScript和Flash少的多
浏览器怎么优化的动画


#### 浏览器查抄的过程。


