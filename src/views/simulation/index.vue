
<!-- 言语实景模拟  -->
<script lang="ts" setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"

import userHeader from "../lay/MainHeader.vue"
import hear from "../hear/Sound.vue"

import { ref } from "vue"
import type { TabsPaneContext } from 'element-plus'
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const activeName = ref('first')

</script>

<template>
    <el-container>
        <el-header>
            <userHeader></userHeader>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="言语识别采集" name="first">
                    <hear></hear>
                </el-tab-pane>
                <el-tab-pane label="言语测试视觉辅助" name="second">言语测试视觉辅助</el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.el-container {
    width: 1080px;
    height: 800px;
    margin: 0 auto;
  margin-top: 50px;
    // .el-tabs{
    //     height: 740px;
    // }
    .el-main {
        text-align: center;
        display: inline-block;
    }
    .el-tabs{
        height: 800px;
    }
}
.el-header {
    height: 48px;
    // background-color: aqua;
    padding: 0;

    .el-row {
        width: 100%;

        .ep-bg-purple-dark {
            height: 50px;
            background-color: #e2dada;

            label {
                font-size: 16px;
                font-weight: bold;
                color: black;
                display: inline-block;
                margin: 12px 25px;
            }

        }

        .ep-bg-purple-dark1 {
            margin-left: 0px;
            height: 40px;
            background-color: #c2c86b;
        }
    }
}

.el-footer {
    height: 60px;
    background-color: rgb(38, 36, 32);
    text-align: center;
}
</style>