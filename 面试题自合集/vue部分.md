## 兼容

## 组件封装

## 路由拦截

## 生命周期

## 路由钩子

## scoped

## 父子组件传值，兄弟组件传值

## 双向数据绑定原理

## vuex
> 状态管理模式，适合大型单页面应用

1. vuex的状态存储是响应式的
2. 不能直接改变store中的状态，唯一途径commit mutation

```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const SOME_MUTATION = 'SOME_MUTATION'; //推荐使用常量替代 Mutation 事件类型

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => state.todos.filter(curr => curr.done),
    //getter传参调用
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    [SOME_MUTATION] (state, n) {
      state.count += n
    }
  },
  actions: {
    increment ({ commit }) {
      commit(SOME_MUTATION)
    }
  }
})
```

### State
> 单一状态树
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
```js
computed: {
  count () {
    return this.$store.state.count
  }
}

//mapState辅助函数，帮助生成计算属性
import { mapState } from 'vuex'
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
### Getter
> store的计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}

//mapGetters辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
import { mapGetters } from 'vuex'
computed: {
// 使用对象展开运算符将 getter 混入 computed 对象中
  ...mapGetters([
    'doneTodosCount',
    'anotherGetter',
    // ...
  ])
}

//对象形式
computed: mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```
### Mutation
> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation， mutation必须是同步函数
```js
//mapMutations辅助函数
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations([
    'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

    // `mapMutations` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
  ]),
  //对象形式
  ...mapMutations({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
  })
}
```
### Action
> Action 提交的是 mutation，而不是直接变更状态; 可以包含任意异步操作
```js
//Action 通过 store.dispatch 方法触发
store.dispatch('increment')

import { mapActions } from 'vuex'

methods: {
  ...mapActions([
    'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

    // `mapActions` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
  ]),
  ...mapActions({
    add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
  })
}
```
一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行
```js
// async / await 
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    let res = await getData();
    commit('gotData', res)
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    let res = await getOtherData();
    commit('gotOtherData')
  }
}
```

### 严格模式下的表单处理
给 `<input>` 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用 action
```js
<input :value="message" @input="updateMessage">

computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage(e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}

//mutation
mutations: {
  updateMessage(state, message) {
    state.obj.message = message
  }
}
```
**双向绑定的计算属性**
```js
<input v-model="message">

computed: {
  get() {
    return this.$store.state.obj.message;
  },
  set(value) {
    this.$store.commit('updateMessage', value)
  }
}
```
