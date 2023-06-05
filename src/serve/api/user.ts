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
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/info',
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
  startTest(data: any) {
    return http.request({
      url: '/native/play',
      method: 'POST',
      data,
    })
  }

  /** 
   * 听力测试结束
   * @param 无参数
   * @returns
  */
  stopTest() {
    return http.request({
      url: '/native/stop',
      method: 'POST',
    })
  }

  /** 
   * 上一个
   * @param 无参数
   * @returns
  */
  prevTest() {
    return http.request({
      url: '/native/prevImageShow',
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
      url: '/native/nextImageShow',
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
      url: '/native/reImageShow',
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
}

export const userApi = new UserApi()
export const auditionApi = new AuditionApi()
 
// export default {
//   userApi,
//   auditionApi
// }


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }