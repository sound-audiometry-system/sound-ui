import http from '../httpClient'
import { PageData } from './types/request'
import { UserInfo } from './types/dataType'

class UserApi {
    /**
   * 根据用户id获取用户信息
   * @param params 查询参数
   * @returns
   */
  getUserInfo(params: object) {
    return http.request<UserInfo>({
      url: '/hearing_service/api/patient/info',
      method: 'POST',
      data: params,
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-Type": "application/json",
      //   "X-Requested-With": "XMLHttpRequest",
      // },
    })
  }

}

const userApi = new UserApi()
 
export default userApi


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }