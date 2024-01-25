# 怎么让一个 div 水平垂直居中？

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
<!-- 1  使用flex -->
div.parent {
  display: flex;
  justify-content: center;// 子元素在主轴上的对齐
  align-items: center;//子元素在交叉轴上的对齐
}

<!-- 2 子绝父相-->
div.parent {
  position: relative;
}
div.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

<!-- 3 -->
div.parent {
  display: grid;
}
div.child {
  justify-self: center; // 网格项在水平方向的对齐
  align-self: center; // 网格项在垂直方向的对齐
}

<!-- 4 -->
div.parent {
  font-size: 0;
  text-align: center;
  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
}
div.child {
  display: inline-block;
  vertical-align: middle;
}
```