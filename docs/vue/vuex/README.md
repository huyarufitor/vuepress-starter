
# 全局单例模式管理

全局单例模式管理 是一个通用的设计模式，常用于C++、Python、JavaScript等编程语言中，它的作用是保证一个类仅有一个实例，并提供一个访问它的全局访问点，以便于其他代码可以访问该实例。这种模式通常用于管理全局状态或资源；
 比如在js中，vue框架中的vuex就是用的“全局单例模式管理”来管理全局状态的，vuex的核心就是一个store对象，它就是一个全局单例模式管理的实例，它的作用是管理全局状态，其他组件可以通过store对象来访问全局状态，从而实现组件之间的通信；

## vuex的使用

（1）vuex 的状态存储是响应式的。当vue组件从 store中去读状态时，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新；
（2）不能直接改变store中状态，唯一途径就是显式的commit mutation。
也就是说，你要改变store里state时，类似写一个方法，就是mutations,然后操作：store.commit('mutations里的方法名',参数)

### store

 获取状态对象：store.state.属性名
 触发状态更新：store.commit('mutations里的方法名',参数)
  为什么唯一途径是修改mutations？
 ---- 确保状态更改是可控、可追踪的；实现状态变更的响应式；

### 在vue组件中获取状态

因为vuex的状态存储是响应式的，从store实例中读取状态最简单的方法就是 计算属性中返回某个状态；

### mapState 辅助函数

适用：当一个组件需要获取 多个状态 时，将这些状态都声明为计算属性会有些重复和冗余，为了解决这个问题，我们可以使用mapState辅助函数帮助我们生成计算属性，让你少按几次键；
用法：

```javascript
computed:{
    ...mapState({
        work_user:state=>state.work_user,
        user_map:state=>state.user_map
    })
}
methods:{
    init(){
       console.log(this.user_map[this.username])
    }
}
```

### getters

允许在store中定义getter函数，相当于store的计算属性

```javascript
getters:{
    doneTodos(state){
        return state.todos.filter(todo=>todo.done)
    },
    doneTodosCount (state, getters) {
        return getters.doneTodos.length
    }
}
```

组件中使用：

```javascript

    <div>列表长度为：{{doneTodosCount()}}</div>
    computed:{
        doneTodosCount(){
            return this.$store.getters.doneTodosCount
        }
    }
```
