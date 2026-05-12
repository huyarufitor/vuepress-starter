# vue3-element-admin-master的简历说明
## 项目介绍
这是一个 Vue3 + Vite + TypeScript + Element Plus 的企业级后台管理前端模板，不
是某个垂直业务系统，但它已经具备一套比较完整的后台壳能力，可以直接承载中后台项目开发。
核心依据在 package.json、src/store/modules/permission.store.ts、src/utils/request.ts。

【简而言之，这是一个可直接落地的中后台管理系统前端骨架，重点不在业务闭环，而在“权限管理 +
  系统管理 + 工程化 + 可复用组件体系”。】


- 登录认证：账号密码登录、验证码、记住我、Token 刷新、退出登录，见 src/api/
    auth.api.ts、src/views/login/components/Login.vue
- 权限体系：后端菜单驱动的动态路由、按钮权限、角色权限、菜单权限分配，见 src/
    store/modules/permission.store.ts、src/directive/permission/index.ts
- 系统管理：用户、角色、菜单、部门、字典、系统配置、通知公告、系统日志，分别落在 src/views/system
- 个人中心：头像上传、资料修改、密码修改、手机/邮箱绑定，见 src/views/profile/
    index.vue
- 控制台能力：在线用户数、UV/PV 统计、访问趋势，且接了 WebSocket 实时能力，见
    src/views/dashboard/index.vue、src/plugins/websocket.ts
- 代码生成器：基于数据表做字段配置、代码预览、ZIP 下载，见 src/views/codegen/
    index.vue
- 前端基础设施：多布局、标签页缓存、国际化、暗黑模式、主题色、水印、全屏、文件
    上传下载
- 组件化能力：封装了通用 CRUD、分页、上传、字典渲染、图标选择、表格选择等组件
- 另外有一批 demo 页面，主要是能力展示，不算核心业务模块，比如富文本、拖拽、
    WebSocket、签名、表格增强等

## 简历封装

 项目名称：企业级后台管理系统前端
  技术栈：Vue3、Vite、TypeScript、Pinia、Vue Router、Element Plus、Axios、UnoCSS、WebSocket
  项目描述：基于 Vue3 + Vite + TypeScript 搭建企业级后台管理前端，完成登录鉴权、动态路由、RBAC 权限控制及用
  户、角色、菜单、部门、字典、系统配置、通知公告、日志等模块开发，支持国际化、暗黑模式、标签页缓存、文件上
  传和代码生成。
  职责亮点：
  - 封装统一请求层，支持 Token 自动注入、刷新重试、登录失效重定向
  - 实现基于后端菜单的动态路由和按钮级权限控制
  - 封装通用 CRUD、分页、上传、字典渲染等基础组件，提升复用率
  - 接入 WebSocket 实现在线用户统计、字典同步等实时能力
  - 集成代码生成器，支持数据表配置、预览和 ZIP 下载

  项目介绍
  这是一个基于 Vue3 的企业级后台管理系统前端，我主要做的是登录鉴权、动态路由和权限控制，以及用户、角色、菜
  单、部门、字典、配置、通知、日志这些后台核心模块。项目里还封装了统一请求、通用表单和上传组件，支持国际
  化、暗黑模式、标签页缓存和 WebSocket 实时数据，整体偏向可直接落地的中后台前端基础架构。

  依据：README.md 、src/router/index.ts 、src/store/modules/permission.store.ts 、src/store/modules/
  user.store.ts 、src/views/codegen/index.vue