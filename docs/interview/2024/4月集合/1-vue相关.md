# vue 相关

## vue和react 中为什么要在列表组件中写key?

因为vue和react 都是根据diff算法来比对新旧虚拟节点，从而更新节点。key的作用是给每一个vnode一个id,依靠key，可以更准确，更快拿到oldVnode的vnode节点；也就是更新组件时，判断两个节点是否相同，相同就复用，不相同就删除旧的创建新的，从而达到数据视图更新。对diff算法速度其实没有提升，带key在增删节点上有耗时。

### 引申---"什么是diff算法"

## ['1','2','3'].map(parseInt) 的结果是什么，为什么会这样？

```javascript [1,NaN,NaN]```

因为完整的代码是

```javascript
['1', '2', '3'].map((item, index) => {
return parseInt(item, index)
})
```

parseInt('1',0) 0进制的1得到1；parseInt('2',1) 1进制最大不能超过0；2进制最大不能超过1；

## 什么是防抖和节流，有什么作用，如何实现？

防抖（debounce）和节流（Throttle）
防抖：触发的时候，重新计时；
节流：某段时间内多次操作只执行一次；

回城防抖，攻击节流[不失礼貌的微笑]。 被防抖函数管理的函数特点：可中断，单位时间内只能执行一个函数，被节流函数管理的函数特点：无法中断，单位时间内可能执行频率过高

## es5/es6的继承除了写法以外还有什么区别？

es5的继承是用原型链，es6的继承是class

## setTimeout、Promise、Async/await 的区别？ 其实就是考察事件循环机制。

同步任务、异步任务（宏任务、微任务（promise.then））
promise构造函数是同步执行的，then方法是异步执行的

### 由此引申出async/await 如何通过同步的方式去实现异步--其实就是考察Generator函数、协程的一些知识；

## 数组算法---携程

已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

作者：程序员依扬
链接：https://juejin.cn/post/6844903885488783374
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处
其实就是考察 数组扁平化+数组去重+数组升序排列的问题，一个个解决；

数组扁平化：
（1）Array.prototype.flat(Infinity) 可以扁平化任何层级的数组；
（2）reduce方法结合递归实现扁平化；

```javascript
function flattenArray(arr) {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc.concat(flattenArray(curr));
    } else {
      return acc.concat(curr);
    }
  }, []);
}

const nestedArray = [1, 2, [3, 4, [5, 6]], 7, [8]];
const flattenedArray = flattenArray(nestedArray);
console.log(flattenedArray); // [1, 2, 3, 4, 5, 6, 7, 8]
```

数组去重：
(1) 利用Set去重

```javascript
result = [...new Set(array)]
```

(2)filter方法、reduce方法、对象属性、indexOf方法 都是可以进行数组去重的；

数组升序：
(1) sort方法
Array.prototype.sort(),但是会根据的是Unicode，会出现11在9的前面，所以单独处理下；
（2）简单冒泡排序---简单、效率较低，适用于较小规模的数据集

```javascript
const array = [3, 1, 5, 2, 4];
const length = array.length;

for (let i = 0; i < length - 1; i++) {
  for (let j = 0; j < length - 1 - i; j++) {
    if (array[j] > array[j + 1]) {
      // 交换位置
      const temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
    }
  }
}

console.log(array); // [1, 2, 3, 4, 5]

```

所以最终算法是：

const handleFlatArr = function(){
  const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
  const deFlatArr = arr.flat(Infinity);
  const noRepeatArr = [...new Set(deFlatArr)]
  const result = noRepeatArr.sort((a,b) => {
    return a-b;
  })
  return result;
}

也可以去看 阮一峰的ES6入门---数组的拓展

### https://es6.ruanyifeng.com/#docs/array

## 谈谈对TCP 三次握手和四次挥手的理解

三次握手：建立tcp安全可靠连接的最小次数，2次不够安全，4次多余；
四次挥手：关闭tcp连接；

## new的作用，手写一个new函数

作用4个步骤，就是可以手写出new函数的关键；
（1）创建一个空对象obj
（2）obj的原型链指向构造函数的原型对象
（3）将构造函数的this绑定到obj上
（4）判断返回值，是否是对象，如果是对象，返回结果，不是就是返回obj;

## http2.0 优点

1、多路复用：允许一个tcp连接上进行多个请求和响应的传输，而http1.1 是每一个请求都要等前一个请求完成。
优点：提高了网络数据传输效率
2、http2数据传输传的是二进制数据，之前是文本数据，而且还使用了压缩算法对头部信息进行压缩，进一步缩小了数据包的大小，加快了数据传输速度。

所有数据都被分割成小块，并且封装到一个个的帧中，每个帧都有一个流ID，根据这个流ID标识属于那个请求或者访问。这样，服务器就可以通过流ID将不同的帧正确分配给不同的请求或相应。
优点：实现了在同一连接上的并行处理
3、优先级机制，客户端可以为不同流设置优先级，优先级高的就更快响应；
优点：进一步优化用户体验。

## 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

这个先不看

## spa 首页加载速度慢的解决访问（优化加载速度）

（1）按需加载组件，路由懒加载
（2）静态资源本地缓存（Service Worker 离线缓存）
（3）开启gzip
（4）UI框架按需加载（比如用Element UI，只加载用到的,不在入口文件全局注入）
（5）重复组件提取到公用chunk中，减少bundle的大小
  比如：webpack的CommonsChunkPlugin插件，设置minChunks是3；
（6）图片资源的压缩
使用雪碧图，静态资源尽量放在oss上

## vue的data属性是一个函数不是一个对象？

```javascript
export default {
  components: {  },
  data() {
    return {

    }
  }),
  methods:{

  },
  computed:{

  },
  watch:{

  },
  mounted(){}
}
```

实例 和组件中定义data是不一样的
实例：可以对象，也可以是函数；
组件：只能是函数，vue可以有多个实例，防止多个组件实例对象之间共用一个data，产生数据污染

## 组件间通信方式有哪些？

（1）props（子->父）
（2）$emit 触发自定义事件（父->子）
（3）ref：this.$refs.foo
（4）EventBus（兄弟组件）
（5）$parent或$root （兄弟组件）
（6）attrs 与 listeners（祖先给子孙）
（7）Provide 与Inject (祖先和后代组件)
（8）vuex

总结：
父子：props/$emit 或 ref
兄弟：$bus、$parent
祖先：attrs/listeners 或 Provide/Inject
复杂关系：vuex 可以用于任何关系的传值

## vue 的双向数据绑定原理

vue的数据双向绑定是靠 **数据劫持和发布-订阅者模式** 的方式实现的。首先是通过ES5提供的Object.defineProperty() 方法来劫持/监听各属性的getter、setter方法，并在监听的数据发生变化的时候，通知订阅者，是否需要更新，若更新就会通知watcher执行对应的更新函数。
 
 说明：Object.defineProperty() 是js中一个方法，用于在对象上定义一个新属性，或者修改已存在的属性。

 vue3的双向数据绑定：利用Proxy
 why:
 (1)检测不到对象属性的添加和删除
 (2)数组API方法无法监听到
 (3)需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题。

## nexttick的理解

在修改数据后立即使用这个方法，获取更新后的DOM
原因：因为vue在更新DOM时是异步的，当数据发生变化，vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。用了nexttick，就只需要更新一次，就能触发视图更新，拿到最新的数据。所以nexttick是一种优化策略

## mixin的理解

mixin在vue2中是一种模块化的复用机制，允许在多个组件之间共享状态和方法。mixin是一个对象，包含了vue组件中的任意功能选项，比如：data、components、methods、create\computed 等，可以将这些混入对象应用到一个或多个组件中，以便在不同的组件之间共享和复用代码。

好处：
（1）代码复用
通过mixin,可以避免在多个组件中重新编写相同功能代码，
（2）解耦
将共享的逻辑集中到一个mixin中，可以更容易地管理和测试这些逻辑，不必担心对各个组件的影响
（3）增强组件的可组合性
可以根据组合不同的功能，创建更复杂的组件。
