<template>
    <el-form-item label="测试名称">
        <el-input disabled v-model="testName" />
    </el-form-item>
    <el-container>
        <el-aside>
            <el-switch v-model="value1" :before-change="beforeChange1" /><label style="font-size: 16px;">左显示器</label>
            <el-switch v-model="value2" class="ml-2" /><label>右显示器</label> 
            <div style="margin-left: 10px; width: 400px;height: 320px; background-color: #8cdcfe;"></div>
        </el-aside>
        
        <el-main>Main</el-main>
    </el-container>
</template>
<script setup lang="ts">
import { ref } from "vue"
let testName = ref("儿童视觉测试")
let value1 = ref(true)
let value2 = ref(true)
let beforeChange1 = (value1) => {
    console.info(111)
    if (value1) {
        value1 = false
    } else {
        value1 = true
    }
    return value1
}


</script>

<style lang="scss" scoped>
.el-container {
    height: 580px;

    .el-aside {
        width: 500px;
        background-color: rgb(173, 226, 226);
    }

    .el-main {
        background-color: bisque;
    }
}

.el-aside {
    padding: 3px 5px;
    display: inline-block;

    .ml-2 {
        float: right;
        // flex-direction: column;
        // align-self: flex-end;
    }
}
</style>