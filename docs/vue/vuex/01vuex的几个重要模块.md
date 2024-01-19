# vuex 几个重要模块

## store

  根组件中注册store选项，该store实例会注入到根组件中的所有子组件中，子组件就能通过this.$store 访问到

```javascript
 
   import store from './store' //main.js
```

```javascript
 // store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})
export default store
```

## vuex-state

  state里保存的都是存在vuex里的基本数据;
  mapState: 如果一个组件里需要获取多个状态时，一个个取出来会比较麻烦，所以这时可以借助mapState辅助函数帮助我们生成计算属性，让我们可以直接获取多个数据
  例如
  
  ```javascript

   computed: {
    ...mapState({
      perm_ret_map: (state) => state.permission.perm_ret_map,
      backend_perm_ret_map: (state) => state.permission.backend_perm_ret_map
    }),
   }
  ```

## vuex-mutations

  相当于method里的方法，想要更改state的数据，要通过mutations里的方法来更改
  更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,
  使用方法

  ```javascript
  mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
  }
  // 使用
store.commit('increment', {
  amount: 10
})
// 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
// 或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## vuex-actions

  相当于异步方法，不过本质都要去更改mutation

commit: 同步操作
存储 this.$store.commit('changeValue',name)
取值 this.$store.state.changeValue

dispatch: 异步操作
存储 this.$store.dispatch('getlists',name)
取值 this.$store.getters.getlists

### actions 和mutation 的异同

异：

- actions提交的是mutation，而不是直接更改状态
- actions可以包含任意异步操作
- mutations 里的方法必须是同步的，因为要求state的变化是可预测的，那就是mutations后立即能查到到结果。
- actions 不直接操作state,而是通过commit方法提交mutation 来操作state，间接改变状态
- 调用action的方法是store.dispatch('actionName')，而不是store.commit('mutationName')
比如：

```javascript
actions = {
loginNew({ commit }, token) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  },
}
// 或者使用 mapActions
methods: {
    ...mapActions(['permission/getAuthority'])
}
// 使用mutation
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}
action = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}
store.dispatch('app/toggleDevice', 'mobile')
```


同：

### 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作

[为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)
因为更改state的函数必须是纯函数，纯函数既是统一输入就会统一输出，没有任何副作用；如果是异步则会引入额外的副作用，导致更改后的state不可预测；

【evan you 回答】：区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。

作者：尤雨溪
链接：https://www.zhihu.com/question/48759748/answer/112823337
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处

## vuex-getters

vuex 的getters 有多想像vue的计算属性，允许你从state里派生出新的状态，当你需要从store里获取数据的时候，或者希望对store里的数据做一些计算之后再获取的时候，就可以使用getters

原理：
1、响应式原理
vuex getters 自动继承了vue响应式系统的特性，当getters所以来的state发生变化时，所有使用该getter 的组件都会自动更新

2、缓存机制
类似于vue 的计算属性，getters会缓存其结果，只有在其依赖的state发生变化时才会重新计算。

3、组合与复用
getters 可以跟其他getters组合使用，可以用作其他getters的参数，可以在store里定义getters，也可以在组件里定义；互相引用，形成一个可复用的状态获取，复杂的数据在store层统一管理和维护。

```javascript
//定义getters函数
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      // ...
    ]
  },
  getters: {
    completedTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return getters.completedTodos.length
    }
  }
})
// 组件里直接使用
computed: {
  completedTasks() {
    return this.$store.getters.completedTodos
  }
}
//mapGetters 辅助函数映射到组件
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'completedTodos',
      'activeTodosCount'
    ])
  }
}

```

## vuex-modules

模块化，如果 vuex 状态太多，可以分到不同modules里

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

## vuex-plugins

vuex plugins 就是一个函数，允许store作为唯一参数

```javascript
const myPlugin = store=>{
  // 当 store 初始化后调用
  store.subscribe((mutation,state)=>{
    // 每次 mutation 之后调用
    // mutation 的格式是 { type, payload }
  })
}
//使用
const store = new Vuex.Store({
  modules: {},
  getters,
  mutations,
  actions,
  plugins:[myPlugin],
  strict: process.env.NODE_ENV !== 'production' //不要在发布环境下启用严格模式！
})
```

## vuex-strict

严格模式下，无论何时发生了状态变更且不是由mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

## vuex-devtools

## 双向数据绑定

```vue
<input v-model="message">
// 使用
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}

```
