<script setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <el-select v-model="value" filterable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-main>
            <el-footer>
                <el-row class="mb-4">
                    <el-button type="primary" round>Primary</el-button>
                    <el-button type="success" round>Success</el-button>
                </el-row>

            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
html,
body,#app {
    margin-top: 0px;
    margin-left: 0px;

}

.common-layout {
    width: 1080px;
    height: 540px;
    margin-top: 0px;
}

.el-header {
    height: 110px;
    background-color: aqua;
}

.el-main {
    height: 480px;
    background-color: beige;
}

.el-footer {
    height: 110px;
    background-color: rgb(96, 96, 56);
}
</style>