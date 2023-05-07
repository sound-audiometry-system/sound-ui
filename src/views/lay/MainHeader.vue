<!-- 头部个人信息 -->
<template>
    <el-row :gutter="20">
        <el-col :span="6">
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
.el-row {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .el-col {
        width: 180px;
        height: 48px;
        display: inline-block;
        background-color: #ffffff;
        font-size: large;
        line-height: 48px;

        .el-icon {
            vertical-align: sub;
        }

        .el-button {
            font-size: large;
            line-height: 65px;
        }
    }
}
</style>