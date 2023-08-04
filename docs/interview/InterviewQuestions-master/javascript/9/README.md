# （头条、微医）Async/Await 如何通过同步的方式实现异步

`Async/Await` 是一个自执行的 `generate` 函数。利用 `generate` 函数的特性把异步的代码写成“同步”的形式。

```js
var fetch = require("node-fetch");

function *gen() { // 这里的 * 可以看成 async
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url); // 这里的 yield 可以看成 await
  console.log(result.bio);
}

var g = gen();
var result = g.next();
result.value.then(data => data.json()).then(data  => g.next(data));
```

## 2023-0804 async/await 动机:简化异步编程写法

### 使用Generator函数

```js
// generator函数
const fs = require('fs')
const readFile = function(fileName){
  return new Promise(function(resolve,reject){
    fs.readFile(fileName,function(error,data){
      if(error) return reject(error)
      resolve(data)
    })
  })
}
const gen = function* (){
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield reafFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

将gen写成async函数

```js
const asyncReadFile = async function(){
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  clg(f1.toString())
  clg(f2.toString())
}
```

比较后就会发现，其实就是把*换成了async，把yield换成了await，就可以了。async函数对generator函数的改进，体现在以下四点。
（1）内置执行器。Generator函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
（2）更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
（3）更广的适用性。co模块约定，yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
（4）返回值是Promise。async函数的返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了。你可以用then方法指定下一步的操作。
```js
