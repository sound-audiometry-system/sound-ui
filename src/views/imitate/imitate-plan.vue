<template>
    <el-container>
        <el-header>言语实景模拟</el-header>
        <el-main style="background-color: #f2f3f5">
            <el-row :gutter="30">
                <el-col :span="12">
                    <sound></sound>
                    <div style="margin-top: 30px">
                        <el-button @click="handleStart">开始</el-button>
                        <el-button @click="handlePause">暂停</el-button>
                        <el-button @click="handleRelease">重复</el-button>
                        <el-button type="info">重置</el-button>
                    </div>
                    <div style="margin-top: 14px;width: 100%;height: 322px;background: #FFFFFF;">
                        <div style="height:32px;line-height: 32px;background-color:#E0E0E0;padding: 0 20px;">0号音响</div>
                        <div style="height: 290px;padding: 0 20px;">
                            <el-radio-group v-model="value1" class="ml-4">
                                <el-radio label="1" size="large">信号声</el-radio>
                            </el-radio-group>
                            <el-row class="el-row-box" style="display: flex; align-items: center;margin-top: 4px;">
                                <el-col style="font-size: 14px;color: #3A3A3A;" :span="4">信号声</el-col>
                                <el-col :span="5"><el-input-number style="width: 100%" controls-position="right"
                                        size="small" v-model="queryForm.signal" placeholder="52" /></el-col>
                                <el-col :span="6">（分贝dB）</el-col>
                                <el-col :span="5"><el-input-number :min="1" :max="10" style="width: 100%"
                                        controls-position="right" size="small" v-model="queryForm.step"
                                        placeholder="52" /></el-col>
                                <el-col style="font-size: 14px;color: #B0B0B0;" :span="4">（步幅）</el-col>
                            </el-row>
                            <div style="margin-bottom: 30px">
                                <el-slider style="width: 100%" v-model="queryForm.signal" :min="0" :max="80"
                                    :marks="marks" />
                            </div>
                            <el-radio-group v-model="value1" class="ml-4">
                                <el-radio label="1" size="large">环境声</el-radio>
                            </el-radio-group>
                            <el-row style="margin-bottom: 10px;" :gutter="10">
                                <el-col :span="16">
                                    <el-select style="width: 100%;" v-model="value" class="m-2" placeholder="选择文件" size="small">
                                        <el-option v-for="item in fileOptions" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-button style="height: 26px;" plain type="warning">选择文件</el-button>
                                </el-col>
                            </el-row>
                            <el-row class="el-row-box" style="display: flex; align-items: center;margin-top: 4px;">
                                <el-col style="font-size: 14px;color: #3A3A3A;" :span="4">环境声</el-col>
                                <el-col :span="5"><el-input-number style="width: 100%" controls-position="right"
                                        size="small" v-model="queryForm.signal" placeholder="52" /></el-col>
                                <el-col :span="6">（分贝dB）</el-col>
                                <el-col :span="5"><el-input-number :min="1" :max="10" style="width: 100%"
                                        controls-position="right" size="small" v-model="queryForm.step"
                                        placeholder="52" /></el-col>
                                <el-col style="font-size: 14px;color: #B0B0B0;" :span="4">（步幅）</el-col>
                            </el-row>
                            <div>
                                <el-slider style="width: 100%" v-model="queryForm.signal" :min="0" :max="80"
                                    :marks="marks" />
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <p>播放方式</p>
                    <div>
                        <el-radio-group v-model="queryForm.type" class="ml-4">
                            <el-radio label="1" size="large">顺序播放</el-radio>
                            <el-radio label="2" size="large">随机</el-radio>
                            <el-radio label="3" size="large">
                                <span>自定义播放</span>
                                <span style="color:#676767;">（拖动音响编码进行排序或修改序号进行排序）</span>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-top: 10px;width: 100%;height: 272px;background: #FFFFFF;">
                        <div style="height:32px;line-height: 32px;background-color:#DDE9E6;padding: 0 20px;">
                            <span>信号声</span>
                            <span style="margin-left: 10px;color: #919C99;font-size: 12px;">点击音响进行设置</span>
                            <el-select style="width: 40%;margin-left: 10px;" v-model="value" class="m-2" placeholder="会议场景" size="small">
                                        <el-option v-for="item in fileOptions" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                    <el-button class="ml-10" style="height: 26px;" plain type="warning">选择文件</el-button>
                        </div>
                        <el-row style="padding: 10px 20px; align-items: center;">
                            <el-col style="display: flex; align-items: center;" :span="16">
                                1. <span class="ml-10" style="display: inline-block; border-radius: 50%; width: 32px; height: 32px; background: #B0B912; color: #fff; text-align: center; line-height: 32px;">0</span><img class="ml-10" width="32" height="32" src="../../assets/add-sound.png" alt="">
                            </el-col>
                            <el-col :span="8">
                                <span>间隔时间</span>
                                <span>
                                    <el-select class="ml-10" style="width: 80px;" v-model="time" size="small">
                                        <el-option v-for="item in timeOptions" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </span>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="margin-top: 10px;width: 100%;height: 272px;background: #FFFFFF;">
                        <div style="height:32px;line-height: 32px;background-color:#DDE9E6;padding: 0 20px;">
                            <span>环境声</span>
                            <span style="margin-left: 10px;color: #919C99;font-size: 12px;">点击音响进行设置</span>
                        </div>
                        <el-row style="padding: 10px 20px;">
                            <el-col>
                                1. <span style="display: inline-block; width: 32px; height: 32px; background: #FFBE26; color: #fff; text-align: center; line-height: 32px; border-radius: 50%;">0</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <footer-tab></footer-tab>
    </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { CSSProperties } from 'vue'
import { auditionApi } from "@/serve/api/user";
import { useStore, mapState } from "vuex";
import sound from "../../components/sound/index.vue";
const value1 = ref("1")
const value = ref('')
const time = ref('1')
let store = useStore();
const imitateData = store.getters.getImitateData;
let isStart = false;
const fileOptions = [
  {
    value: '1',
    label: '文件1',
  },
  {
    value: '2',
    label: '文件2',
  },
  {
    value: '3',
    label: '文件3',
  },
  {
    value: '4',
    label: '文件4',
  },
  {
    value: '5',
    label: '文件5',
  },
]
const timeOptions = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
]
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
    0: '0',
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
const handleStart = async () => {
  if (isStart) return;
  //开始
  const res = await auditionApi.startTest(imitateData);
  if (res.code == 0) {
    isStart = true;
  }
};
const handlePause = async ()=> {
    if (!isStart) return;
    //暂停
  const res = await auditionApi.pauseTest();
  if (res.code == 0) {
    isStart = false;
  }
}

const handleRelease = async ()=> {
    //重播
  const res = await auditionApi.reImageTest();
}

</script>

<style lang="scss" scoped>
.font {
    font-size: small;
    font-weight: bold;
    color: white;
}

.userItem {
    display: flex;
    margin-top: 3%;
    background-color: #f2f3f5;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.icon {
    width: 1.5em;
    height: 1.5em;
}

.activeColor {
    background-color: #C7D8D4;

    .icon {
        color: rgb(30, 25, 25);
    }

    .font {
        color: rgb(30, 25, 25);
    }
}

.el-container {
    width: 1180px;
    height: 800px;

    .el-header {
        background-color: #208571;
        line-height: 60px;
        color: #fff;
        font-size: 16px;
    }

    .el-footer {
        background-color: rgb(30, 25, 25);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer-div {
        width: 10%;
        height: 100%;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

:deep(.el-form-item__content) {
    margin-left: 0 !important;
}

.el-button {
    min-width: 80px;
}

.el-row-box {
    .el-input {
        width: 60px;
    }
}

:deep(.el-slider__marks) {
    width: 98%;
}

.el-radio {
    margin-right: 10px;
}
.ml-10 {
    margin-left: 10px;
}
</style>