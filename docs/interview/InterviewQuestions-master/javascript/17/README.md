# （京东）下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

解答：

```js
var a = {
  value: 0,

  valueOf() {
    return ++this.value;
  }
};
```

这道没什么意思，因为这段代码中，对象a定义了一个valueOf方法，该方法每次被调用都会将value属性的值加1并返回。因此，当我们对a进行相等性比较时，会自动调用valueOf方法获取其原始值

a == 1 && a == 2 && a == 3 && a==4 ... 一直都是true



```js