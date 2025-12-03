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
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <!-- <navigator url="/pages/index/index" hover-class="none" class="navigator"> -->
        <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        <!-- </navigator> -->
      </swiper-item>
    </swiper>
  </view>
  <!-- 指示点 -->
  <view class="indicator">
    <text v-for="(item, index) in list" :key="item.id" class="dot" :class="{ active: index === activeIndex }"></text>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  height: 90%;
  //position: relative;
  overflow: hidden;
  transform: translateY(0);

  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}

.indicator {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  .dot {
    width: 30rpx;
    height: 6rpx;
    margin: 0 8rpx;
    border-radius: 6rpx;
    background-color: #8c96b3;
  }

  .active {
    background-color: #305aa6;
  }
}
</style>
