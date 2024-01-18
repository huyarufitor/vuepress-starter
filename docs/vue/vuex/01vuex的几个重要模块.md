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
store.commit('increment', {
  amount: 10
})
  ```

## vuex-actions

  相当于异步方法，不过本质都要去更改mutation

commit: 同步操作
存储 this.$store.commit('changeValue',name)
取值 this.$store.state.changeValue

dispatch: 异步操作
存储 this.$store.dispatch('getlists',name)
取值 this.$store.getters.getlists

## vuex-getters

## vuex-modules

模块化，如果 vuex 状态太多，可以分到不同modules里

## vuex-plugins

## vuex-strict

## vuex-devtools
