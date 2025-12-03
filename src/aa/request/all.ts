import type { ShareConfig } from '@/aa/type'
import { request } from './request'

/**
 * 获取共享功能凭证
 * @param data 请求参数
 */
export const getShareConfigApi = () => {
  return request<ShareConfig>({
    method: 'GET',
    url: 'api/sign/get?url=https://intro.ecastle.com.cn/',
  })
}

