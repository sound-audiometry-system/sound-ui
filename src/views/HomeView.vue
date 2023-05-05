<script lang="ts" setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"

import foot from "./lay/foot.vue"
import testFrom from "./home/form.vue"
import userHeader from "./lay/MainHeader.vue"

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
                <el-tab-pane label="言语识别采集" name="first">言语识别采集</el-tab-pane>
                <el-tab-pane label="言语测试视觉辅助" name="second">言语测试视觉辅助</el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
html,
body,
#app {
    margin-top: 0px;
    margin-left: 0px;
    border-top: 1px solid var(--el-border-color);
    border-radius: 4px
}

.el-tabs__item .is-top .is-active {
    background-color: aqua;
}

.el-main {
    text-align: center;
    display: inline-block;

}

.el-container {
    width: 800px;
}

.common-layout {
    width: 1080px;
    height: 540px;
    margin-top: 0px;
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

.el-main {
    height: 480px;
    background-color: beige;
}

.el-footer {
    height: 60px;
    background-color: rgb(38, 36, 32);
    text-align: center;

}
</style>