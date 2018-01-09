#### 1. "如何在v-for循环中使用v-model" 

 * v-for循环对象要求是Array, 通过index给Array内的对象添加属性 `eg: arr[index].attrubute`
 * 注意：建议在使用v-for时添加 `:key <li v-for="item in items" :key="item.id"></li> `不同浏览器，加载能力不同
    
#### 2."vue的form提交"
 * 通过定义formDate对象提交
    
#### 3."如何在子组件中正确的传递Boolean值，Number值"

 * `<comp some-prop="1"></comp>`  因为这是一个字面量prop，传递的值就是字符串‘1’
 * `<comp :some-prop="1"></comp>` 被当做JavaScript表达式计算，传递的值是数值1

    
   
