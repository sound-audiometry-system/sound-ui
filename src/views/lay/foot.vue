<script setup lang="ts" >
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
</script>
<template>
    <el-row class="mb-4">
        <el-button type="primary">创建测试</el-button>
        <el-button type="success">配置检测</el-button>
        <el-button type="success" :icon="Edit" >语音实景模拟</el-button>
    </el-row>
</template>

<style lang="scss" scoped>
.mb-4 {
        padding-top: 0px;
        display: inline-block;

        .el-button {
            width: 120px;
            height: 60px;

        }
    }
</style>