[Reference resources](https://www.zhangxinxu.com/wordpress/2018/03/background-gradient-transtion/)

## why
background-image不支持CSS3 transition

## ways
[background-position](https://jsfiddle.net/zd6yk415/14/)

通过background-size放大, background-position定位
```html
<div class="box">box</div>
```
```css
.box {
  max-width: 400px;
  height: 100px;
  background: liear-gradient(to right, olive, green, purple);
  background-size: 200%;  
  transition: background-position .5s;
}
.box:hover {
  background-position: 100% 0; /*(x, y)*/
}
```

[background-color](https://jsfiddle.net/zd6yk415/14/)
通过改变background-color颜色
```html
<div class="box1">box1</div>
```
```css
.box1 {
  max-width: 400px;
  height: 100px;
  background: olive liear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,.5));
  background-size: 200%;  
  transition: background-color .5s;
}
.box1:hover {
  background-color: purple;
}
```

[opacity](https://jsfiddle.net/zd6yk415/14/)
通过伪元素和opcaity改变
```html
<div class="box2">box2</div>
```
```css
.box2 {
  max-width: 400px;
  height: 100px;
  position: relative;
  backgtound: liear-gradient(to right, olive, green);
  z-index: 0;
}
.box2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: liear-gradient(to right, green, purple);
  opacity: 0;
  transition: opacity .5s;
  z-index: -1;  /*保证文字在最上层*/
}
.box2:hover::before {
  opacity: 1;
}
```
