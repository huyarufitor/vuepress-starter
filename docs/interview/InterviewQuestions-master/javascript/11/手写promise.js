// 这一版本有问题。。。
// class myPromise {
//     constructor(executor){
//         this.state = 'pending'
//         this.value = undefined
//         this.reason = undefined
//         let resolve = value=>{
//             if(this.state === 'pending'){
//                 this.state = 'fulfilled'
//                 this.value = value
//             }
//         }
//         let reject = reason =>{
//             if(this.state === 'pending'){
//                 this.state = 'rejected'
//                 this.reason = reason
//             }
//         }
//         try{
//             // 立即执行函数
//             executor(resolve,reject)
//         }catch(err){
//             reject(err)
//         }
//         then(onFulfilled,onRejected){
//             if(this.state === 'fulfilled'){
//                 let x = onFulfilled(this.value)
//             }
//             if(this.state ==='rejected'){
//                 let x = onRejected(this.reason)
//             }
//         }
//     }
// }

// let a = new myPromise((resolve,reject)=>{
//     resolve(1)
// })
// a.then(x=>{
//     console.log(x);
// })
// // 测试
// // var p=new myPromise(function(resolve,reject){resolve(1)});
// // p.then(function(x){console.log(x)})

// 这一版没有错
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  function resolve(value) {
    //两个==="pending"，保证了了状态的改变是不不可逆的
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(reason) {
    //两个==="pending"，保证了了状态的改变是不不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function(onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};

// 测试
var p = new myPromise(function(resolve, reject) {
  resolve(1);
});
p.then(function(x) {
  console.log(x);
});
