# watch 的使用场景

## watch 的immediate 和 deep使用

```javascript
watch:{
    data:{
       handler(newName,oldName){
           //执行代码
       },
       deep:true,
       immediate:true //true就表示会立即执行
     }
 }
```

### immediate 

 因为watch默认不开启immediate，也就是默认绑定，页面首次加载不会执行handler，
 **如果开启了immediate**：true后，首次加载立刻执行handler，此时的newName是undefined；

### deep

如何监听的是对象类型，当手动修改对象的某个属性时，发现是无效的。这时候就需要deep属性

 也可以只监听对象的某个属性，比如

 ```javascript
 person = {
    name:'fitorhu',
    age:18,
 }
 watch:{
    'person.name':{
        handler(new,old){
            //执行函数
        }
    }
    deep:true,
 }
```

vue3中使用 watch:

 ```javascript
 
 <template>
     <h2>{{ person.name }}</h2>
    <button @click="updateName">datag</button>
 </template>
 <script setup>
import { ref, nextTick, watch, reactive } from "vue";

const person = reactive({ name: "小松菜奈" });
watch(
  () => person,
  (value, oldVal) => {
    console.log("新-旧", value, oldVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
const updateName = function () {
  person.name = "122";
  return person.name;
};
</script>
 ```

很简单是不是
