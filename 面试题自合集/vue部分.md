## 兼容
不支持IE 9以下的浏览器

## 组件封装

## 生命周期

## 路由钩子

## scoped

## 父子组件传值，兄弟组件传值

## 双向数据绑定原理

## vue-router
> 路由管理器
```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
### 动态路由匹配
```js
//获取路由参数
this.$route.params.xxx
```
### 响应路由参数变化
```js
//例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用, 组件的生命周期钩子不会再被调用。
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```
### 编程式的导航
```js
//声明式
<router-link :to="...">

//编程式
this.$route.push(location, onComplete?, onAbort?)

// path 和 params 不能同时使用
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
router.push({ path: 'register', query: { plan: 'private' }}) //带查询参数，变成 /register?plan=private
```
```js
// 不向history添加新纪录，而是替换掉原来的history记录
// 编程式
this.$route.replace(location, onComplete?, onAbort?) 
//声明式
<router-link :to="..." replace>
```
```js
// n 为整数, 类似window.history.go(n)
router.go(n)

router.go(1) // 在浏览器记录中前进一步，等同于 history.forward()
router.go(-1) // 后退一步记录，等同于 history.back()
router.go(3) // 前进 3 步记录
```

### 命名路由
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
router.push({ name: 'user', params: { userId: 123 }})
```

### 重定向和别名
```js
  const router = new VueRouter({
     routes: [
        {path: '/a', redirect: '/b'},
        {path: '/a', redirect: to => {
          // 方法接收 目标路由 作为参数
          // return 重定向的 字符串路径/路径对象}},
          
        { path: '/a', component: A, alias: '/b' } //别名
     ]
  })
```

### HTML5 History 模式
```js
// http://yoursite.com/user/id
const router = new VueRouter({
  mode: 'history',  //默认hash模式
  //history模式, 服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。
  //为了避免，应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

### 导航守卫
> 主要用来通过跳转或取消的方式守卫导航, 参数或查询的改变并不会触发进入/离开的导航守卫
全局守卫
```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next:  Function: 一定要调用该方法来 resolve 这个钩子
    //next(): 进行管道中的下一个钩子
    //next(false): 中断当前的导航
    //next(任意位置)
    //next(error)： 导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
})
```
全局后置钩子
```js
router.afterEach((to, from) => {
  // ...
})
```
路由独享的守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
组件内守卫
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 路由元信息
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {  //自定义方法, 判断是否登陆
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 过渡效果
```js
//name 实现不同过渡效果 'slide-right', 'slide-left', 'fade'
<transition name="slide">
  <div class="foo">...</div>
</transition>
```
### 滚动行为
> 注意: 这个功能只在支持 history.pushState 的浏览器中可用
```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // to 和 from 路由对象, savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) { // 模拟'滚动到锚点'
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
  
  //异步滚动
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
})
```

### 数据获取 [参考](https://router.vuejs.org/zh/guide/advanced/data-fetching.html#%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E5%90%8E%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE)
1. 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。
2. 导航完成之前获取：导航完成前，在路由的 enter 钩子中获取数据，在数据获取成功后执行导航。

### 路由懒加载
```js
const tvProgram = resolve => require(['@/page/tvProgram'], resolve);
```

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
