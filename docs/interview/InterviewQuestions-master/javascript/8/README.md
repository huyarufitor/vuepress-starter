# setTimeout、Promise、Async/Await 的区别

## 相同点

 1. 都是异步处理函数

## 不同点
 
1. `setTimeout` 是 `ES5` 提供的异步处理函数，`Promise` 是 `ES6` 提供的异步处理方案，`async/await` 是 `ES7` 提供的异步处理方案；
2. `setTimeout` 是一个函数，`Promise` 是一个类，`async/await` 是一个语法糖；
3. `setTimeout` 的执行不会受到外界影响，`Promise` 的执行受到外界的影响，`async/await` 的执行也受到外界的影响；
4. `setTimeout` 的回调函数是放在宏任务队列里,等到执行栈清空以后执行;`Promise` 的回调函数是放在微任务队列里，`async/await` 的回调函数是放在微任务队列里；
5. `setTimeout` 的回调函数是在主线程中执行，`Promise` 的回调函数是在主线程中执行，`async/await` 的回调函数是在主线程中执行；
6. `setTimeout` 的回调函数是在主线程的 `call stack` 中执行，`Promise` 的回调函数是在主线程的 `call stack` 中执行，`async/await` 的回调函数是在主线程的 `call stack` 中执行；

Promise: `Promise` 本身是同步的立即执行函数，当在 executor 中执行 resolve 或者 reject 的时候，此时是异步操作，会先执行 then/catch 等，当主栈完成时，才会去调用 resolve/reject 方法中存放的方法。

async: `async` 函数返回一个 `Promise` 对象，当函数执行的时候，一旦遇到 `await` 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 `async` 函数体。
7. `setTimeout` 是一个浏览器提供的函数，用于延迟执行一个函数。是一种基于回调函数的异步编程方式，可以通过设置一个定时器实现，但是，只能处理一次性的异步操作，不能处理复杂的异步操作，因为不方便管理回调函数；`Promise`可以处理复杂的异步操作，支持链式调用，有三种状态：pending、fulfilled、rejected,可以通过then()方法来处理成功状态，catch()处理失败状态；`async/await` 基于Promise的语法糖，更加简洁处理异步草足，使用`async` 关键字声明一个异步函数，通过 `await` 关键字等待异步操作完成，并返回一个 `Promise`对象。

```javascript
   // setTimeout
setTimeout(() => {
  console.log('Hello, setTimeout')
}, 1000)

// Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello, Promise')
  }, 1000)
})

promise.then((result) => {
  console.log(result)
})

// Async/Await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function asyncFunction() {
  await delay(1000)
  console.log('Hello, Async/Await')
}

asyncFunction()
```

### 解释

当你运行这段代码时，输出结果将按照以下顺序出现：

Hello, setTimeout
Hello, Promise
Hello, Async/Await
让我们分析为什么会这样执行输出：

setTimeout
这段代码首先设置了一个setTimeout，它被设置为在1000毫秒（1秒）后执行。setTimeout是非阻塞的，这意味着代码的执行不会在这里停止等待，而是继续执行下去。

Promise
接下来，代码创建了一个Promise，它同样使用了setTimeout来在1000毫秒后解决（resolve）。由于Promise的执行也是非阻塞的，代码的执行继续向下移动，而不会在这里等待Promise解决。

在Promise之后，有一个.then()调用，它注册了一个回调函数，这个回调函数会在Promise解决时执行。但是，这个回调函数不会立即执行，它会等到Promise实际解决后才执行。

Async/Await
最后，代码定义了一个异步函数asyncFunction，该函数内部使用await关键字等待一个延迟（通过delay函数实现，它返回一个在1000毫秒后解决的Promise）。asyncFunction被立即调用。

由于await关键字的使用，asyncFunction内部的执行会在await表达式处暂停，直到Promise解决。这意味着console.log('Hello, Async/Await')的执行会等待大约1000毫秒。

执行顺序分析
所有的setTimeout和Promise操作都被设置为在大约1000毫秒后执行。
JavaScript事件循环和异步行为意味着即使这些操作都设置为在大约相同的时间执行，它们的完成顺序仍然是确定的。
setTimeout回调、Promise解决（及其.then()回调），以及async/await操作都是异步操作，它们的执行顺序由事件循环管理。
在这个例子中，setTimeout的回调首先执行，因为它是第一个被放入事件队列的。
然后，Promise解决，并且其.then()回调被执行。
最后，asyncFunction中的await delay(1000)完成，然后执行console.log('Hello, Async/Await')。
因此，输出顺序为Hello, setTimeout -> Hello, Promise -> Hello, Async/Await。
