/** 通用分页结果类型 */
export type PageResult<T> = {
  items: T[]        /** 列表数据 */
  counts: number    /** 总条数 */
  page: number      /** 当前页数 */
  pages: number     /** 总页数 */
  pageSize: number  /** 每页条数 */
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 当前行号*/
  count?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}

/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}
/** 首页-广告区域数据类型 */
export type ShareConfig = {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}
