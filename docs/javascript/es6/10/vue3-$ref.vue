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
</script>