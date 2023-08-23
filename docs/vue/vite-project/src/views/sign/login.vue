<template>
<div>
    <el-form :model="signForm" ref="signFormRef" :rules="rules">
        <el-form-item prop="email">
            <el-input v-model="signForm.email" placeholder="邮箱" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
            <el-input v-model="signForm.mobile" placeholder="手机号" prefix-icon="el-icon-mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="signForm.code" placeholder="验证码" prefix-icon="el-icon-s-check"></el-input>
        </el-form-item>
    </el-form>
</div>
</template>
<script setup lang="ts">
// 使用setup语法，不需要再import Vue
import { ref,reactive } from "vue";
defineProps<{ msg: string }>();

const submitting = ref(false);
const signForm = reactive({
    email:'',
    mobile:'',
    code:'',
    rememberMe:false
})
const rules = reactive({
    email:{
        required:true,
        message:'请输入邮箱',
        trigger:'blur'
    },
    mobile:{
        required:true,
        message:'请输入手机号',
        trigger:'blur'
    },
    code:{
        required:true,
        message:'请输入验证码',
        trigger:'blur'

    },
    rememberMe:{
        required:false,
        message:'记住我',
        trigger:'change'
    },
})
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
