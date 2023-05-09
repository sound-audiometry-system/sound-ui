
<!--  -->
<template>
  <el-container>
    <el-header></el-header>
    <el-main
      style="display: flex; justify-content: center; background-color: #f2f3f5"
    >
      <div
        style="
          width: 50%;
          height: 100%;
          background-color: white;
          flex-direction: column;
        "
      >
        <div style="display: flex; margin: 3% 3% 0 3%; flex-direction: column">
          <el-form
            :model="form"
            ref="form"
            label-width="200px"
            class="form"
            @submit.native.prevent="()=> searchUser"
          >
            <el-form-item>
              <el-input
                v-model="inputUserId"
                placeholder="请输入"
                class="input-with-select"
                clearable
                @clear="userSearchData = []"
                @blur="searchUser"
              >
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div
            class="userItem"
            v-for="(item, idx) in userSearchData"
            :key="idx"
            v-if="userSearchData.length > 0"
          >
            <div style="display: flex; align-items: center; margin: 2% 2% 0 2%">
              <Female class="icon" v-if="item.sex == 1" />
              <Male class="icon" v-else />
              <text
                style="margin-left: 4%; font-size: revert; font-weight: bold"
                >{{ item.userId }}</text
              >
            </div>
            <el-button
              type="success"
              size="small"
              style="text-align: end; margin-right: 2%"
              @click="toTest(item)"
              >开始测试</el-button
            >
          </div>
          <el-empty description="暂无" v-else />
        </div>
      </div>
    </el-main>
    <el-footer>
      <div
        class="footer-div"
        :class="{ activeColor: active == 1 }"
        @click="chooseItem(1)"
      >
        <Tickets class="icon" color="white" />
        <text class="font">听力测试</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: active == 2 }"
        @click="chooseItem(2)"
      >
        <Setting class="icon" color="white" />
        <text class="font">配置检查</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: active == 3 }"
        @click="chooseItem(3)"
      >
        <Monitor class="icon" color="white" />
        <text class="font">言语实景模拟</text>
      </div>
    </el-footer>
    <el-dialog
      v-model="chooseTypeVisble"
      width="40%"
      center
      :close-on-click-modal="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <div style="display: flex; justify-content: left">
          <Setting class="icon" />
          <text style="margin-left: 2%; font-weight: bold">开始测试</text>
        </div>
      </template>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex">
          <text style="font-weight: bold">用户ID:</text>
          <div style="margin-left: 2%; display: flex; align-items: center">
            <Female width="1.2em" height="1.2em" v-if="userInfo.sex == 1" />
            <Male width="1.2em" height="1.2em" v-else />
            <text style="margin-left: 1%; font-weight: bold">{{
              userInfo.userId
            }}</text>
          </div>
        </div>
        <text style="font-weight: bold; margin-top: 2%">测试选择</text>
        <el-select
          v-model="testResult"
          placeholder="请选择"
          style="margin-top: 2%"
          no-data-text="暂无数据"
        >
          <el-option
            v-for="(item, idx) in testData"
            :key="idx"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <template #footer>
        <el-button color="#f2f3f5" @click="chooseTypeVisble = false"
          >取消</el-button
        >
        <el-button color="rgb(180,190,90)" @click="handleNav">确定</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>
<script setup lang="ts" >
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import router from "@/router/index.js";
import userApi from "@/serve/api/user";

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }
const active = ref(1);

const form = reactive({})

const chooseTypeVisble = ref(false);
//定义输入的用户id
const inputUserId = ref(1);
//存储选择的用户信息
const userInfo = ref({
  sex: null,
  userId: "",
});

//搜索的用户结果,sex为1为男性，sex为2为女性
const userSearchData = ref([
  { sex: 1, userId: "000032" },
  { sex: 2, userId: "000033" },
]);
//测试列表
const testData = ref([
  { name: "听力测试", id: 1 },
  { name: "配置检查", id: 2 },
  { name: "言语实景模拟", id: 3 },
]);
//测试结果
const testResult = ref();

//远程搜索用户信息
const searchUser = () => {
  //后续为远程搜索用户信息
  getUserInfo()
};

const loadTestData = () => {
  //后续为远程获取测试结果
};

const getUserInfo = () => {
  const res = userApi.getUserInfo({ uid: inputUserId.value });
};

const handleNav = () => {
  chooseTypeVisble.value = false;
  if (testResult.value == 1) {
    router.push("/speaker");
  }
};
//加载测试数据
// loadTestData()
getUserInfo();

//跳转到测试页面
const toTest = (info) => {
  inputUserId.value = info.userId;
  userInfo.value = info;
  chooseTypeVisble.value = true;
};

//footer下面图标切换颜色
const chooseItem = (val) => {
  active.value = val;
  //后续为头部切换页面
};
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
  background-color: rgb(180, 190, 90);

  .icon {
    color: rgb(30, 25, 25);
  }

  .font {
    color: rgb(30, 25, 25);
  }
}

.el-container {
  width: 1080px;
  height: 800px;

  .el-header {
    background-color: rgb(180, 190, 90);
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
</style>