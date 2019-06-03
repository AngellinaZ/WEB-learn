### Collection 接口
> 是List、Set、Queue接口的父接口
> 定义了可用于操作List、Set、Queue的方法 -- 增删改查


### List接口及其实现类 -- ArrayList
> List是元素有序并且可以重复的集合，即序列。
> List可以控制每个元素的插入位置，或删除某个位置元素
> ArrayList -- 数组序列，实现类
> ArrayList底层由数组实现


| 方法名称 | 功能简介 |
| --- | --- |
| add(int index, Object obj) | 向集合的指定索引位置添加对象 |
| addAll(int index, Collection coll ) |  向集合的指定索引位置添加指定集合中的所有对象 |
| remove(int index) | 清除集合中指定索引位置的对象  |
| set(int index, Object obj) | 将集合中指定索引位置的对象修改为指定的对象 |
| get(int index) | 获得指定索引位置的对象  |
| indexOf(Object obj) | 获得指定对象的索引位置；存在多个时返回第一个的索引位置；当不存在是，返回-1  |
| listIterator() | 获得一个包含所有对象的ListIterator型实例  |
| listIterator(int index) | 获得一个包含从指定索引位置到最后的ListIterator型实例 |
| subList(int fromIndex, int toIndex) | 截取[fromIndex, toIndex)的对象，重新生成一个List集合并返回 |
