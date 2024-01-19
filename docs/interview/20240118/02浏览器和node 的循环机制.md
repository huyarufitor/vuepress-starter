# 浏览器和node的事件循环机制 对比

## 浏览器中的事件循环机制阶段

浏览器中的事件循环 会先执行宏任务，如果在执行宏任务的时候，遇到了微任务，将微任务放入到微任务队列中，等当前宏任务执行完后，从微任务队列中取，一个个执行微任务；当前宏任务+微任务队列 执行完后，继续下一个宏任务；

### 宏任务

script(主代码块)、setTimeout、setInterval、I/O、UI rendering、messageChannel

### 微任务

Promise.then 、MutationObserver、process.nextTick

## node中的事件循环机制

nodejs的事件循环基于libuv实现，它有多个阶段，包括：

- timers(定时器)--重要阶段
  timers阶段对应的是setTimeout、setInterval 两个方法，也就是宏任务
- I/O callbacks(回调)
- prepare(准备)
- poll（轮询阶段，处理I/O、检查新的定时器、执行微任务）--重要阶段
  异步回调事件，除了setTimeout、setInterval、process.nextTick、Promise、setImmediate之外的事件。
- check（检查阶段，用于setInmediate）--重要阶段
  serImmediate 事件，也是宏任务
- close callbacks(关闭回调阶段。处理例如socket关闭的回调)
  
### nodejs执行顺序

-执行全局script作为第一个宏任务；
  待更新....
