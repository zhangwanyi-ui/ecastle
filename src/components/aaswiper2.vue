<script setup lang="ts">
import type { BannerItem } from '../aa/type'
import { ref } from 'vue'

const activeIndex = ref(0)

// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}
// 定义 props 接收
const aa = defineProps<{
  list: BannerItem[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" vertical @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text v-for="(item, index) in list" :key="item.id" class="dot" :class="{ active: index === activeIndex }"></text>
    </view>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: translateY(0);

  .image {
    width: 100%;
    height: 100%;
  }
}

.indicator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 8px;
  width: 10%;
  height: 100%;

  .dot {
    width: 6rpx;
    height: 40rpx;
    margin: 8rpx 0;
    border-radius: 6rpx;
    border: 1px solid #305aa6;
  }

  .active {
    background-color: #305aa6;
    height: 50%;
  }
}
</style>
