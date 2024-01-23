
# 参考文献

https://juejin.cn/post/6979840705921286180

## 拓展运算符 定义

拓展运算符... 是es6中引入的，将可迭代对象展开到单独的元素中，所有的可迭代对象就是任何能用for of 循环进行遍历的对象，例如数组、字符串、Map、Set、DOM节点等。

## 拓展运算符 方法

### 拷贝数组对象（第一层深拷贝，其他浅拷贝） 

### 合并操作

合并对象的一个键已经存在，那么最后一个键值对的值会覆盖前面的键值对的值。

### 参数传递

```javascript
const sum = (num1, num2) => num1 + num2;

console.log(sum(...[6, 7])); // 13
console.log(sum(...[6, 7, 8])); // 13
```

### 数组去重

搭配 Set 使用

### 字符串转字符串数组

```javascript
const ch = 'china'
const result = [...ch]
```

### NodeList 转数组

### 解构变量

（1）解构数组
const [currentMonth, ...others] = [7, 8, 9, 10, 11, 12];
console.log(currentMonth); // 7
console.log(others); // [ 8, 9, 10, 11, 12 ]

（2）解构对象
const userInfo = { name: "Crayon", province: "Guangdong", city: "Shenzhen" };
const { name, ...location } = userInfo;
console.log(name); // Crayon
console.log(location); // { province: 'Guangdong', city: 'Shenzhen' }

### 打印日志
