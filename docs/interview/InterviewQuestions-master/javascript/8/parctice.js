// console.log('script start')
// let promise1 = new Promise(function (resolve) {
//   console.log('promise1')
//   resolve()
//   console.log('promise1 end')
// }).then(function () {
//   console.log('promise2')
// })
// setTimeout(function () {
//   console.log('settimeout')
// })
// console.log('script end')
/** 第2段 */
// function add(){
//   console.log('同步任务1');
//   setTimeout(() => {
//   console.log('异步任务1');
//   }, 1000);
// }
// add();
// setTimeout(() => {
//   console.log('先执行宏任务setTimeout')
//   const promise = new Promise((resolve, reject) => {
//       resolve('先把这一轮执行完再去执行其他微任务')
//       new Promise((resolve) => console.log('122222')).then(() => {console.log('444444')})
//   })
//   promise.then((result) => {
//     console.log('微任务0000',result);
//   })
// }, 1000)

// // Promise
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('这里成功执行Promise结果')
//   }, 1000)
// })

// promise.then((result) => {
//   console.log('微任务Promise',result)
// })

// // Async/Await
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// async function asyncFunction() {
//   await delay(1000)
//   console.log('Hello, Async/Await')
// }

// asyncFunction()
/** 第三段 */
function task1() {
  console.log("1");
}
function task2() {
  console.log('2-1');
  setTimeout(() => {
    console.log("2-2");
  }, 1000);
}

function task3() {
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("3-1");
      resolve("3-2");
    }, 0);
  });
  p2.then((res) => {
    console.log("3-3:", res);
  });
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("4-1");
    resolve("4-2");
  }, 1000);
});
p1.then((res) => {
  console.log("4-3", res);
  return res;
}).then((res) => {
  console.log("4-4", res);
});

let p3 = new Promise((resolve, reject) => {
  console.log("5-1");
  resolve("5-2");
}).then((res) => {
  console.log("5-3", res);
});

task1();
task2();
task3();
