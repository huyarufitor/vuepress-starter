<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{initUrl()}}</h2>

    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/vuejs/language-tools" target="_blank"
        >Volar</a
      >
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>
<script setup lang="ts">
// 使用setup语法，不需要再import Vue
import { ref } from "vue";
import {initUrl} from '../helpers/URLInstance'
defineProps<{ msg: string }>();

const count = ref(0);
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
