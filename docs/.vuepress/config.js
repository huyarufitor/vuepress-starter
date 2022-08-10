module.exports = {
    title: 'somebody study文档',
    description: 'vue,typescript,nuxt',
    base: '/learn-typescript/',
    // theme:'reco',// 这个主题有问题
    themeConfig:{
        // 官方文档：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F
        // 导航栏
        nav:[
            {text:'首页',link:'/'},
            {
                text:'八妹 的前端乱七八糟博客',
                items: [
                    { text: '前端', link: 'https://github.com/huyarufitor' },
                    { text: '后端', link: 'https://juejin.cn/user/712139234359182/posts' },
                    { text: '服务器', link: 'https://github.com/huyarufitor' },
                    { text: '数据库', link: 'https://github.com/huyarufitor' },
                    { text: 'WEB安全+HTTP', link: 'https://github.com/huyarufitor' },
                    { text: '408', link: 'https://github.com/huyarufitor' },
                    { text: 'web 八股文', link: 'https://github.com/huyarufitor' },
                    
                ]
            }
        ],
        // 侧边栏
        sidebar:[
            {
                title:'欢迎学习',
                path:'/',
                collapsable:false, //不折叠
                children:[
                    {title:'学前必读',path:'/'}
                ]
            },
            {
                title:'基础学习',
                path:'/handbok/ConditionalTypes',
                collapsable:false,
                children: [
                    { title: "跳版机", path: "/handbook/ConditionalTypes" },
                    { title: "泛型", path: "/handbook/Generics" }
                  ],
            }
        ],
            subSidebar: 'auto'

    }
  }