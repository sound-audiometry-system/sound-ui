<script lang="ts" setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"

import foot from "./lay/foot.vue"
import testFrom from "./home/form.vue"
import { ref } from "vue"


const testForm = ref < any > ();
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
let startTestDialogVisible = ref(false)

let startTest = () => {
    debugger
    startTestDialogVisible.value = true
}
let value = ''
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="24">
                        <div class="ep-bg-purple-dark"><label>首页</label></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="ep-bg-purple-dark1" />
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div>开始&测试</div>
                <el-select v-model="value" filterable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div style="margin-top: 5px;">
                    <el-button @click="testForm.value.startTestDialogVisible.value= true">开始测试</el-button>
                </div>
                <testForm ref="testForm"></testForm>
                <!-- 开始测试弹窗 -->
                <!-- <el-dialog v-model="startTestDialogVisible" title="开始测试" width="30%" destroy-on-close center>
                    <testFrom ref="testForm" :startTestDialogVisible.sync = "startTestDialogVisible"></testFrom>
                    <el-form-item>
                        <el-button>取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-dialog> -->
            </el-main>
            <el-footer>
                <foot></foot>
            </el-footer>
        </el-container>
    </div>
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

.el-main {
    text-align: center;
    display: inline-block;

}

.common-layout {
    width: 1080px;
    height: 540px;
    margin-top: 0px;
}

.el-header {
    height: 90px;
    background-color: aqua;
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