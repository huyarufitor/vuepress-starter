# 参考链接

https://vue3js.cn/interview/es6/set_map.html#%E4%B8%80%E3%80%81set

## es6 之Set

集合：一堆无序的、相关联的，且不重复的内存结构组成
方法：增删改查
（1）add()：添加元素
（2）delete()： 删除元素
（3）has()：判断元素是否存在
（4）clear(): 清空所有元素
遍历方法：
（1）keys() ：返回键名的遍历器
（2）values()：返回键值的遍历器
（3）entries()：返回键值对的遍历器
（4）forEach()：使用回调函数遍历每个成员

## es6 之Map

字典：一些元素的集合。每个元素有一个称作key的域，不同元素的key各不相同

Map类型是健值对的有序列表，而键和值都可以是任意类型。
方法：增删改查
(1) set()：添加元素
设置键名key对应的键值为value，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就被新生成该键,可以用链式写法，比如：const m = new Map(); m.set('name',123).set(2,'21')
(2) get(): 读取key对应的value

```javascript value = m.get('name')```

(3) has(): 某个键是否在当前Map对象中，返回true或false
(4) delete(): 删除某个键
(5) clear(): 清空所有元素
遍历方法：
（1）keys() ：返回键名的遍历器
（2）values()：返回键值的遍历器
（3）entries()：返回键值对的遍历器
（4）forEach()：使用回调函数遍历每个成员

### 相同点

集合、字典都存放的是不重复的值，因此可以用来做【数组去重】

### 不同点

集合是【值，值】存储元素，字典是【键，值】的形式存储

## Set 和Map 实践

（1）数组或字符串去重

```javascript

let arr = [3,5,35,3,2,2]
let unique = [...new Set(arr)]

let str = '352255'
let unique = [...new Set(str)].join('')

```

(2)实现并集、交集、差集
  
```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```