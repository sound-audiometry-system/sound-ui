<template>
    <div class="main">
        <div>
            <span>测试名称</span>
            <span class="ml-10"
                style="display: inline-block; width: 90%;background: #ECECEC; border: 1px solid #B5B5B5;border-radius: 3px;">儿童视觉强化测试</span>
        </div>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col style="height: 580px; background-color: #fff; padding: 10px 0; overflow: auto;" :span="12">
                <div v-for="index in 12" :key="index" :gutter="10"
                    style="height: 90px;border-bottom: 1px solid #D6D6D6;padding: 10px 0px;">
                    <el-row style="align-items: center;">
                        <el-col :span="6">
                            <span>{{ index }}</span>. <span class="ml-10"
                                style="display: inline-block; border-radius: 50%; margin-right: 6px; width: 22px; height: 22px; background: #B0B912; color: #fff; text-align: center; line-height: 22px;">{{
                                    index }}</span>
                            <span>{{ index }}号音响</span>
                        </el-col>
                        <el-col :span="3">
                            <el-radio-group disabled v-model="value1" class="ml-4">
                                <el-radio label="1" size="large">言语声</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="2"><el-input style="width: 100%" controls-position="right" size="small"
                                v-model="queryForm.signal" placeholder="52" /></el-col>
                        <el-col :span="4">(分贝db)</el-col>
                        <el-col :span="3">
                            <el-radio-group disabled v-model="value1" class="ml-4">
                                <el-radio label="1" size="large">环境声</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="2"><el-input style="width: 100%" controls-position="right" size="small"
                                v-model="queryForm.signal" placeholder="52" /></el-col>
                        <el-col :span="4">(分贝db)</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div>
                                <el-button style="margin-left: 10px;" size="small" type="primary" plain>点击校准</el-button>
                            </div>
                        </el-col>
                        <el-col :span="9" style="color: #989898;">
                            未校准
                        </el-col>
                        <el-col :span="8" style="color: #989898;">
                            未校准
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12">
                <sound></sound>
                <div
                    style="width: 396px; margin-top: 20px; margin-left: 20px; height: 61px; display: flex; align-items: center; background: #D8D8D8; justify-content: center;">
                    <el-button>播放</el-button>
                    <el-button>保存</el-button>
                    <el-button>重复</el-button>
                    <el-button>退出</el-button>
                </div>
                <el-row class="el-row-box" style="display: flex; margin-top: 20px; align-items: center;">
                    <el-col style="font-size: 14px;color: #3A3A3A;" :span="3">信号声</el-col>
                    <el-col :span="4"><el-input-number style="width: 100%" controls-position="right" size="small"
                            v-model="queryForm.signal" placeholder="52" /></el-col>
                    <el-col :span="4">（分贝db）</el-col>
                    <el-col :span="4"><el-input-number :min="1" :max="10" style="width: 100%" controls-position="right"
                            size="small" v-model="queryForm.step" placeholder="52" /></el-col>
                    <el-col style="font-size: 14px;color: #B0B0B0;" :span="2">(步幅)</el-col>
                    <el-col style="font-size: 14px;color: #B0B0B0;" :span="4"><el-button>保存点 [Enter]</el-button></el-col>
                    <el-col>
                        <el-slider style="width: 96%" v-model="queryForm.signal" :min="25" :max="80"
                                    :marks="marks" />
                    </el-col>
                </el-row>
                <el-row class="el-row-box" style="display: flex; margin-top: 40px; align-items: center;">
                    <el-col style="font-size: 14px;color: #3A3A3A;" :span="3">环境声</el-col>
                    <el-col :span="4"><el-input-number style="width: 100%" controls-position="right" size="small"
                            v-model="queryForm.signal" placeholder="52" /></el-col>
                    <el-col :span="4">（分贝db）</el-col>
                    <el-col :span="4"><el-input-number :min="1" :max="10" style="width: 100%" controls-position="right"
                            size="small" v-model="queryForm.step" placeholder="52" /></el-col>
                    <el-col style="font-size: 14px;color: #B0B0B0;" :span="2">(步幅)</el-col>
                    <el-col style="font-size: 14px;color: #B0B0B0;" :span="4"><el-button>保存点 [Enter]</el-button></el-col>
                    <el-col>
                        <el-slider style="width: 96%" v-model="queryForm.signal" :min="25" :max="80"
                                    :marks="marks" />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
    
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { CSSProperties } from 'vue'
import sound from "../../components/sound/index.vue";
const value1 = ref("1")
const queryForm = reactive({
    fileName: null,
    delay: '1',
    signal: 52,
    step: 1,
    ambient: null,
    type: '1',
})
interface Mark {
    style: CSSProperties
    label: string
}
type Marks = Record<number, Mark | string>
const marks = reactive<Marks>({
    30: '30',
    35: '35',
    40: '40',
    45: '45',
    50: '50',
    55: '55',
    60: '60',
    65: '65',
    70: '70',
    75: '75',
    80: '80',
})
</script>

<style lang="scss" scoped>
.ml-10 {
    margin-left: 10px;
}

.main {
    width: 100%;
    background-color: #F2F2F2;
    margin: 20px 20px 0px 20px;
}
:deep(.el-slider__marks) {
    width: 98%;
}
</style>