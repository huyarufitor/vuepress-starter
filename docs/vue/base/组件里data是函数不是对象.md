# Vue实例和组件定义data

## Vue实例中定义data可以是对象，也可以是函数；

而组件中定义data只能是函数；

```javascript
//Vue实例
const app  = new Vue({
    el:'app',
    data:{
        name:'fitor'
    },
    data(){
        return {
            name:'foo',
        }
    }
})
//Vue组件
Vue.component('register',{
    tamplate:`<div>注册组件</div>`,
    data(){
        return {
            tel:'+8615622727222',
        }
    }
})
```

## why?

在我们定义好一个组件的时候，Vue最终都会通过Vue.extend()构成组件实例。
 ----原因：如果都用对象的话，两个或多个组件用的都是data属性，公用了同一块内存地址，如果A组件改变了data，那B组件也会改变;如果是函数形式，函数返回的对象内存地址并不相同，这样就不会影响到其他组件；

## 源码

源码的定义里， data是可以object或者function的，但是组件在创建的时候，会进行选项的合并，自定义组件会进入到mergeOptions函数中，进行选项合并（源码：/vue-dev/src/core/util/option.js）

## 结论

·根实例对象data 可以是对象或者函数（根实例是函数），不会产生数据污染情况；
·组件实例对象data必须是函数，目的是防止多个组件实例对象之前共用一个data，产生数据污染；而使用函数的形式，initData时，回将其作为工厂函数都会返回全新data对象，内存地址也不一样；