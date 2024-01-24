# 请写出下面代码的运行结果

20240124 更新 不能再忘记了！！

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

运行结果：

- `script start`
- `async1 start`
- `async2`
- `promise1`
- `script end`
- `async1 end`
- `promise2`
- `setTimeout`

解析结果：

遇到 await 表达式时，会让 async 函数 暂停执行，等到 await 后面的语句（Promise）状态发生改变（resolved或者rejected）之后，再恢复 async 函数的执行（再之后 await 下面的语句），并返回解析值（Promise的值）

解析过程：
（1）console.log('script start'); 同步代码，先执行-- `script start`
（2）async1（），输出  console.log('async1 start');--`async1 start`
（3）wait async2(),里面没有异步代码，所以直接输出 console.log('async2');添加微任务task1:  console.log('async1 end');--`async2`
（4）继续执行同步代码：console.log('promise1');--`promise1`
（5）遇到 Promise 的 then，添加一个微任务，现在微任务队列有task2： console.log('promise2'); 、
（6）执行同步代码：`script end`,
（7）执行异步代码：onsole.log('async1 end');--`async1 end`
（8）执行异步代码：console.log('promise2');--`promise2`
（9）执行settimeout :console.log('setTimeout');--`setTimeout`
