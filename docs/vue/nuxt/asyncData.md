# asyncData 和nuxtServerInit 的使用

## 区别

asyncData 主要用于在客户端加载数据之前对数据进行处理 或者 发起异步请求获取数据；
nuxtServerInit 主要用于在服务端初始化时将一些服务端的数据传到客户端；

## asyncData使用

这个钩子函数用于客户端加载数据之前对数据进行处理，或者在这个钩子中发起异步请求，提前设置数据。当客户端加载页面时，会直接加载提前渲染好带有数据的DOM，完成服务端渲染，有助于搜索引擎的抓取。只能在pages/下的组件中使用，每次加载页面都会调用

```javascript
    export default {  
  async asyncData({ params }) {  
    const response = await axios.get(`https://my-api/posts/${params.id}`);  
    return { title: response.data.title };  
  }  
};
```

### 注意

（1）这个钩子函数中不能使用this: 因为是在客户端创建实例化之前加载的；
（2）有很多参数，可以获取上下文对象：isDev、route、store、env、params、query、req、res、redirect、error
（3）要有返回数据,返回的数据将与data合并，为了不发生页面渲染错误，返回的键事先在data里声明好（template中没用的话就不用），如果想要抛出异常，使用error参数；

## nuxtServerInit使用

这个方法在nuxt.js调用时将页面的上下文对象作为第二个参数传给它（服务端调用），类似于fetch。可以用这个方法将服务端端数据传给客户端。在页面渲染前进行store处理

```javascript
export default {  
  methods: {  
    nuxtServerInit({ commit }, { req }) {  
      if (req.session.user) commit('user', req.session.user);  
    }  
  }  
};
```
