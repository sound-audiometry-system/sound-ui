<!-- 头部个人信息 -->
<template>
    <el-row :gutter="20">
        <el-col :span="6" style="width: 120px;">
            <el-icon size="24">
                <Avatar />
            </el-icon>
            <label style="margin-left: 10px; line-height: 48px;">张三</label>
        </el-col>
        <el-col :span="6">
            <el-button link>测试</el-button>
        </el-col>
        <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.el-col {
        width: 120px;
        height: 48px;
        display: flex;
        background-color: #ffffff;
        font-size: large;
        line-height: 48px;
        justify-content: flex-start;
        align-items: center;

        .el-button {
            font-size: large;
            line-height: 65px;
        }
    }
</style>