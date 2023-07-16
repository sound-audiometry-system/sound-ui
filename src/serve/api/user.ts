import http from '../httpClient'
import { PageData } from './types/request'
import { UserInfo, FileUploadInfo } from './types/dataType'

class UserApi {
    /**
   * 根据用户id获取用户信息
   * @param params 查询参数
   * @returns
   */
  getUserInfo(data: UserInfo) {
    return http.request({
      // url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/info',
      url: '/hy_saas_client_gateway/whym/hearing_service/api/patient/info',
      method: 'POST',
      data,
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-Type": "application/json",
      //   "X-Requested-With": "XMLHttpRequest",
      // },
    })
  }
  /**
   * 根据用户id获取用户配置信息
   * @param data 查询参数
   * @returns
   */
  getUserPatient(data: UserInfo) {
    return http.request({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/testList',
      method: 'POST',
      data,
    })
  }
}

class AuditionApi {
  /** 
   * 听力测试开始
   * @param data 传递参数
   * @returns
  */
  startTest(data: any, params) {
    return http.request({
      url: '/v2/native/play',
      method: 'POST',
      data,
      params
    })
  }

  /** 
   * 听力测试结束
   * @param 无参数
   * @returns
  */
  stopTest() {
    return http.request({
      url: '/v2/native/stop',
      method: 'POST',
    })
  }

  /** 
   * 暂停
   * @param 无参数
   * @returns
  */
  pauseTest() {
    return http.request({
      url: '/native/pause',
      method: 'POST',
    })
  }

  /** 
   * 上传测试结果
   * @param data 传递参数
   * @returns
  */
  report(data: any) {
    return http.request({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/test/report',
      method: 'POST',
      data,
    })
  }

  /** 
   * 上一个
   * @param 无参数
   * @returns
  */
  prevTest() {
    return http.request({
      url: '/v2/native/prev',
      method: 'POST',
    })
  }

  /** 
   * 下一个
   * @param 无参数
   * @returns
  */
  nextTest(data) {
    return http.request({
      url: '/v2/native/next',
      method: 'POST',
    })
  }

  /** 
   * 重播
   * @param 无参数
   * @returns
  */
  reImageTest() {
    return http.request({
      url: '/v2/native/replay',
      method: 'POST',
    }) 
  }

  /** 
   * 录音文件上传
   * @param resourceId
   * @returns
  */
  fileUpload(data: any) {
    return http.request({
      url: '/native/fileupload',
      method: 'POST',
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) 
  }

  /** 
   * 获取音箱列表
   * @param 无参数
   * @returns
  */
  getDevice(params) {
    return http.request({
      url: '/device/info',
      method: 'GET',
      params
    }) 
  }
}

class ImitateApi {
  /** 
   * 获取音箱列表
   * @param type, name
   * @returns
  */
  getListTestMode(data) {
    return http.request({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/testModel/listTestCalibrationMode',
      method: 'POST',
      data
    }) 
  }
   /** 
   * 上传校准值
   * @param id
   * @returns
  */
   dbCalibration(data) {
    return http.request({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/testModel/dbCalibration',
      method: 'POST',
      data
    }) 
  }
  /** 
   * 保存点
   * @param id
   * @returns
  */
  saveAdjustValue(data) {
    return http.request({
      url: '/native/saveAdjustValue',
      method: 'POST',
      data
    }) 
  }
}

export const userApi = new UserApi()
export const auditionApi = new AuditionApi()
export const imitateApi = new ImitateApi()
 
// export default {
//   userApi,
//   auditionApi
// }


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }