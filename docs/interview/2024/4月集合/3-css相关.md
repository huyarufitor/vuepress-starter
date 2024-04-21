# css

## 盒模型

1、IE-怪异模型（border-box）
width = content + padding + border
2、W3C 盒模型（content-box）
width = content

所以
    div{
        width:100px;
        height:100px;
        padding:20px;
        border:2px solid #000;
    }

在怪异盒子模型下：总宽度为100px;

在标准盒子模型下：总宽度为144px;

## CSS 选择器+ 优先级

### 有哪些选择器

1、id选择器（#myid）

2、类选择器（.my-classname）

3、标签选择器（div,h1,p）

4、后代选择器（h1 p）后代选择器的祖先和后代之间用空格分割

5、相邻后代选择器（子）选择器（ul>li）

6、兄弟选择器（li~a）

7、相邻兄弟选择器（li+a）

8、属性选择器（a[rel="external"]）

9、伪类选择器（a:hover,li:nth-child）

10、伪元素选择器（::before、 ::after）

11、通配符选择器（*）

### css 优先级计算规则

<内联,ID,Class|属性|伪类,元素选择器>
比如：
1、#foo div 2、#foo .bar div 3、#foo~.bar div
<0,1,0,1>    <0,1,1,1>       <0,1,1,1>

后出现的优先级更高，所以就是3>2>1

## margin塌陷+BFC

两个兄弟盒子A在上、B在下，A margin-bottom：20px，B margin-top：30px A和B的最终距离是多少？

A和B是父子关系A在外、B在内，A margin-top：30px ，B margin-top： 20px，A和B之间的距离是多少？

边距塌陷的解决方法是什么？-- BFC

BFC的初衷为了解决margin塌陷，但是BFC还有其他功能

● 解决垂直、包含塌陷
● 清除浮动
● 防止普通文档流被浮动元素遮挡（可以实现两栏布局）
