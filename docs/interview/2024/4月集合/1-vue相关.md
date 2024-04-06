# vue 相关

## vue和react 中为什么要在列表组件中写key?

因为vue和react 都是根据diff算法来比对新旧虚拟节点，从而更新节点。key的作用是给每一个vnode一个id,依靠key，可以更准确，更快拿到oldVnode的vnode节点；也就是更新组件时，判断两个节点是否相同，相同就复用，不相同就删除旧的创建新的，从而达到数据视图更新。对diff算法速度其实没有提升，带key在增删节点上有耗时。

### 引申---"什么是diff算法"

## ['1','2','3'].map(parseInt) 的结果是什么，为什么会这样？

```javascript [1,NaN,NaN]```

因为完整的代码是

```javascript
['1', '2', '3'].map((item, index) => {
return parseInt(item, index)
})
```

parseInt('1',0) 0进制的1得到1；parseInt('2',1) 1进制最大不能超过0；2进制最大不能超过1；
