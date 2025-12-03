<script setup lang="ts">
import type { BannerItem } from '../aa/type'
import { ref } from 'vue'

// 定义 props 接收
const aa = defineProps<{
  list: BannerItem[]
}>()

const emit = defineEmits(['toend'])
const activeIndex = ref(0)
// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
  if (ev.detail.current === aa.list.length - 1) {
    emit('toend', true)
  } else {
    emit('toend', false)
  }
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="false" :autoplay="false" :interval="3000" vertical @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  display: flex;
  height: 100%;
  overflow: hidden;
  transform: translateY(0);

  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
