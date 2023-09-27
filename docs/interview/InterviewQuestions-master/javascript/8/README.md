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
