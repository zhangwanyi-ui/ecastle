import { useMemberStore } from "@/aa/store";

const baseURL = 'https://intro.ecastle.com.cn/'
console.log('request/index.ts全局执行一次');
const interceptor = {
  invoke(options: UniApp.RequestOptions) {
    options.url = baseURL + options.url
    options.timeout = 10000
    options.header = { 'source-client': 'miniapp' }
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}
uni.addInterceptor('request', interceptor)
uni.addInterceptor('uploadFile', interceptor)
type Data<T> = {
  code: number;
  desc: string;
  data: T;
}
export const request = <T>(options: UniNamespace.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)//把res置为then的参数,类型断言为Data<T>
        }
        else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({ title: (res.data as Data<T>).desc || '请求错误', icon: 'none' })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({ title: '网络错误', icon: 'none' })
        reject(err)//把err置为catch的参数
      }
    })
  })
}