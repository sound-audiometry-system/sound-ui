<template>
    <el-dialog v-model="startTestDialogVisible" title="开始测试" width="30%" destroy-on-close center>
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户ID">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select v-model="form.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <!-- -->
                <el-button @click="this.startTestDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script setup lang="ts" >
import { reactive, ref } from 'vue'

let startTestDialogVisible = ref(false)
// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
})

const onSubmit = () => {
}
defineExpose({
    startTestDialogVisible
});
</script>
  