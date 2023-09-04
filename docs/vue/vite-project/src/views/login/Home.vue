<template>
    <div>
        <div>集群详情</div>
        <el-button>大</el-button>
         <el-table :data="originalArray" border style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="host_name" label="主机名" width="180" />
            <el-table-column prop="inner_ip" label="内网IP" />
            <el-table-column prop="outer_ip" label="外网IP" />
            <el-table-column prop="old_version" label="发布前版本" />
            <el-table-column prop="new_version" label="发布版本" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="stage" label="阶段" />
            <el-table-column prop="status" label="发布状态" />
            <el-table-column prop="timestamp" label="发布时间" />
            <el-table-column prop="rollback_timestamp" label="回滚时间" />
        </el-table>
         <el-table :data="copy" border style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="host_name" label="主机名" width="180" />
            <el-table-column prop="inner_ip" label="内网IP" />
            <el-table-column prop="outer_ip" label="外网IP" />
            <el-table-column prop="old_version" label="发布前版本" />
            <el-table-column prop="new_version" label="发布版本" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="stage" label="阶段" />
            <el-table-column prop="status" label="发布状态" />
            <el-table-column prop="timestamp" label="发布时间" />
            <el-table-column prop="rollback_timestamp" label="回滚时间" />
        </el-table>

    </div>
    
</template>
<script setup lang="ts">
import { reactive } from "vue";
const originalArray = [
{
    id:'167991',
    host_name:'online-aliyun-cn-shenzhen-c-vm-38062',
    inner_ip:'10.1.69.206',
    outer_ip:'119.23.181.184',
    old_version:'v5.3.4-72775_465',
    new_version:'v5.3.5-72775_466',
    remark:"中国 深圳",
    stage:'第一阶段',
    status:'success',
    timestamp:'2023-08-30 14:31:09',
    rollback_timestamp:""
},
{
    id:'167992',
    host_name:'online-aliyun-cn-shenzhen-f-vm-40973',
    inner_ip:'10.1.74.116',
    outer_ip:'120.25.228.75',
    old_version:'v5.3.4-72775_465',
    new_version:'v5.3.5-72775_466',
    remark:"中国 深圳",
    stage:'第二阶段',
    status:'fail',
    timestamp:'2023-08-30 14:31:34',
    rollback_timestamp:""
},
]
const copy = JSON.parse(JSON.stringify(originalArray)).map(item=>{
    item.id+='copy'
    return item
})
</script>