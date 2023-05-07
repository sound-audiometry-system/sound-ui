<!-- 设备连接 -->
<template>
    <el-container>
        <el-header>
            <label>测试前连接</label>
            <button type="button">连接</button>
        </el-header>
        <el-container>
            <el-aside width="590px">
                <el-row style="height: 360px;">
                    <sound></sound>
                </el-row>
                <el-row class="xxx-a">
                    <el-row>
                        <el-col :span="8">
                            2333
                        </el-col>
                        <el-col :span="8">
                            2222
                        </el-col>
                        <el-col :span="8">
                            231111
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row> 
                </el-row>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import sound from "../../components/sound/index.vue";
</script>
<style scoped lang="scss">
.el-header {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1040px;
}

.xxx-a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 590px;
    height: 300px;
    background-color: aqua;
    flex-direction: column;
    flex-wrap: nowrap;

    .el-row {
        height: 48px;
        width: 540px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        
        .el-col{
            margin-left: 3px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            background-color: beige;
            align-items: center;
            width: 48px;
            height: 36px;
        }
    }
}

.el-aside {
    display: flex;
    flex-direction: column;
}
</style>