<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-icon  size="24"><Avatar /></el-icon>
            <label style="margin-left: 10px; line-height: 48px;">张三</label>
            <!-- <div class="userinfo">张三</div> -->
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
    width: 180px;
    height: 48px;
    display: inline-block;
    background-color: #ffffff;
    font-size: large;
    line-height: 48px;
    .el-icon{
        vertical-align: sub;
    }
    .userinfo {
        width: 180px;
        height: 48px;
        font-size: large;
        line-height: 48px;
    }

    .el-button {
        font-size: large;
        line-height: 65px;
    }
}
</style>