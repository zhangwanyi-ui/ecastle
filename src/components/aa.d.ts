import aaswiper from './aaswiper.vue'
import aaswiper2 from './aaswiper2.vue'
import aaswiper3 from './aaswiper3.vue'
import aacard from './aacard.vue'

declare module 'vue' {
  export interface GlobalComponents {
    aaswiper: typeof aaswiper
    aaswiper2: typeof aaswiper2
    aaswiper3: typeof aaswiper3
    aacard: typeof aacard
  }
}
// 组件实例类型
export type aaCardInstance = InstanceType<typeof aacard>
export type aaSwiperInstance = InstanceType<typeof aaswiper>
export * from './aaswiper.vue'
export * from './aacard.vue'
