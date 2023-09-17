<script lang="ts" setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"

import foot from "../lay/foot.vue";
import { ref, reactive } from "vue";

let options = [
  { value: "0001", label: "张三" },
  { value: "0002", label: "李思思" },
];
let planData = [
  { value: "T0001", label: "测试方案1" },
  { value: "T0002", label: "测试方案2" },
  { value: "T0003", label: "测试方案3" },
];
let startTestDialogVisible = ref(false);

let onSubmit = () => {
};
let selectUser = (val) => {
  userInfo.id = val;
};
let userInfo = reactive({ id: "", name: "" });
let value = ref("");
let planId = ref("");
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
        <div>用户&界面</div>
        <el-select
          v-model="value"
          filterable
          placeholder="选择测试人员ID"
          @change="selectUser"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="testBtn" style="margin-top: 5px">
          <el-button @click="startTestDialogVisible = true">开始测试</el-button>
        </div>
        <!-- 开始测试弹窗 -->
        <el-dialog
          v-model="startTestDialogVisible"
          title="开始测试"
          width="30%"
          destroy-on-close
          center
        >
          <el-form :inline="true" :model="userInfo" class="demo-form-inline">
            <el-form-item label="用户id">
              <el-input v-model="userInfo.id" disabled   placeholder="Approved by"  />
            </el-form-item>
            <el-form-item label="测试方案">
              <el-select v-model="planId" placeholder="选择测试方案">
                <el-option
                  v-for="item in planData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-dialog>
      </el-main>
      <el-footer>
        <foot></foot>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  .el-select {
    width: 200px;
  }
  .testBtn {
    flex-wrap: wrap;
  }
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
