在Vite创建的Vue 3项目中添加路由，可以按照以下步骤进行操作：

1. 确保你已经安装了Vue Router。在项目根目录下运行以下命令来安装Vue Router：


```bash
npm install vue-router
```
2. 在项目根目录下创建一个名为 `router` 的文件夹，并在该文件夹中创建一个名为 `index.js` 的文件。
3. 在 `index.js` 文件中，引入所需的组件和Vue Router：


```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```
在上面的示例中，我们定义了两个路由，分别是根路径 `/` 和 `/about`，并将它们分别映射到 `Home` 和 `About` 组件。

4. 在 `main.js` 文件中引入并使用路由：


```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```
在这里，我们使用 `createApp` 创建Vue应用程序，然后使用 `use` 方法引入路由，最后使用 `mount` 方法将应用程序挂载到指定的元素（这里是指向 `#app`）。

5. 在你的组件中，你可以使用 `<router-link>` 组件来生成导航链接，并使用 `<router-view>` 组件来显示当前路由对应的组件内容。例如，在 `App.vue` 文件中：


```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```
在上面的示例中，我们使用了 `<router-view>` 组件来显示当前路由对应的组件内容。当用户点击 `<router-link>` 组件时，路由会根据配置的路径将相应的组件渲染在 `<router-view>` 中。

这样，你就成功地在Vite创建的Vue 3项目中添加了路由功能。你可以根据需要添加更多的路由和组件，并使用Vue Router提供的其他功能来实现更复杂的路由逻辑。