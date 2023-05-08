import http from './httpClient'
import { PageData } from './types/request'
import { Test } from './types/test'

class TestApi {
    /**
   * 接口封装测试
   * @param params 查询参数
   * @returns
   */
  getPageData(params: object) {
    return http.request<PageData<Test>>({
      url: '/test/page',
      method: 'GET',
      params,
    })
  }

}

const testApi = new TestApi()
 
export default testApi


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }