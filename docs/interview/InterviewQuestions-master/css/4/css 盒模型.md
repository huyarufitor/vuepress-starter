# 简述 CSS 盒模型

盒子由 `margin、border、padding、content` 组成；

## 标准盒模型：`box-sizing: content-box;`

width：200px = content（200px） + padding（50px） + border（50px）

默认是标准盒模型

## （怪异盒模型）IE 盒模型：`box-sizing: border-box;`

-- 包含了border、padding、content

width：200px = content（190px） + padding（9px） + border（1px）
