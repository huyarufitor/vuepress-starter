<template>
   <div class="import">
      <commonUpload
        class="common-upload"
        @updateDataList="initData"
      ></commonUpload>
    </div>
</template>
<script lang="ts">
import { EditPen, ArrowDown } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import commonUpload from "./commonUpload.vue";
export default defineComponent({
  setup(props, context) {
    // 更新数据
    const initData = function () {
      nextTick(() => {
        //这里处理更新最新接口的数据；
      });
    };
    return {
        initData,
    };
  },
});
/** 
 * 1、vue3中的 父子传值 后面的都是自己:childVal="selfVal"/ @changeChildmethods="selfMethods"
 * 1-1 父-> 子 Prop    1-2 子给父 emit
 * (1)父给子传值showChannel
 * Father.vue
<chilf-box
          ref="form"
          :showChannel="$route.params.tabs === 'channel_data_report'"
          @changeFilter="initData"
        />
 * (2)子组件接受
 * child-box.vue
 * <script lang="ts">
 * export default defineComponent({
 * props: {
    showChannel: {
      type: Boolean,
      default: false,
    },
  },
  setup(props,context){
    const data = ref('');
    const methods = (val:string)=>{
        context.emit("updateDataList");//vue3没有this，用context.emit给父组件传值；
        return val;
    }
    
    return {
        data,
        methods,
    };
  }
 * 
 * })
 * </script>
 *
 * 
*/
/**
 * 一vue3 的
 * 通过this.$refs.form 获取 添加了<div ref="form"></div>的标签对应的dom元素；
 * 或者：this.$refs['component'] 获取到的是添加了ref="component"属性的组件；
 * 
 * //给标签使用
 *  <input type="text" ref="ipt"/>
 * 给组件使用
 * <comp-detail ref="component"></comp-detail>
 * <button @click="confirm">确定</button>
 * vue2--用法
 * const confirm = ()=>{
 * console.log(this.$refs.ipt.value)  //打印出输入框中的value值
 * this.$refs['component'].init()     //调用组件comp-detail中的init()方法

 * }
 * 
 * vue3--用法 
 * <child ref="" />
 * setup() {
    const commonFilter = ref<typeof commonFilterBox | null>(null);
    const show=()=>{
        console.log(commonFilter.value)// proxy；
    }
}
 */

</script>