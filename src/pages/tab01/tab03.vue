<script setup lang="ts">
import type { BannerItem, ShareConfig } from '../../aa/type'
import { getShareConfigApi } from '../../aa/request';
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import jweixin from 'weixin-js-sdk'

onMounted(() => {
  // 只有在微信环境下才尝试获取分享配置
  if (typeof window !== 'undefined' && /MicroMessenger/i.test(window.navigator.userAgent)) {
    getShareConfig().catch(err => {
      console.log('微信分享配置获取失败:', err);
      // 不显示错误提示，避免影响用户体验
    })
  }
})
let config: ShareConfig
async function getShareConfig() {
  try {
    const res = await getShareConfigApi()
    console.log('resobject:', res);
    if (res.code !== 0) return
    config = res.data
    jweixin.config({
      debug: false, //根据服务端来控制是否开启调试模式
      appId: config.appId,//"wx06444b3201c47503",
      timestamp: config.timestamp,//1730098522,
      nonceStr: config.nonceStr,//"8f22d11c-6114-48c1-90e3-74333b5762c4",
      signature: config.signature,//"8492ec7ec5fe26c25d1b2feb1d155b936b682b95",
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
    })
    jweixin.ready(() => {
      let shareData: any = {
        title: "陆融通达业务介绍",  //分享的标题
        desc: "你身边的专业服务伙伴，帮助你释放IT领域的常态化工作负荷",  //分享的描述
        link: "https://intro.ecastle.com.cn/",   //分享的链接
        imgUrl: "https://intro.ecastle.com.cn/static/image/favicon.png", //分享的图片链接
        success(response: any) {
          console.log("分享成功", response);
          //配置成功之后的回调（并不是分享成功之后的回调，这个地方是个坑，要注意下）
        },
      };
      //分享给朋友接口
      jweixin.updateAppMessageShareData(shareData);
      //分享到朋友圈接口
      jweixin.updateTimelineShareData(shareData);
    })
  } catch (error) {
    console.error('获取微信分享配置失败:', error);
    // 不抛出错误，避免影响页面正常显示
  }
}
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
/*
const view: any = ref(null)
onMounted(() => {
  const h = view.value.clientHeight;
  console.log("h:", h);
});*/

let appwidth = screenWidth;
if (screenWidth * 3 > screenHeight * 2) {
  appwidth = screenHeight * 0.9 / 1.78
}

// 是否加载中标记
const isLoading = ref(false)
const isshow = ref(true)
// 页面加载
onLoad(async () => {
  isLoading.value = true
  getHomeBannerData()
  isLoading.value = false
})
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  bannerList.value = [
    { id: '1', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m01.png', },
    { id: '2', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m02.png', },
    { id: '3', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m03.png', },
    { id: '4', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m04.png', },
    { id: '5', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m05.png', },
    { id: '6', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m06.png', },
    { id: '7', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m07.png', },
    { id: '8', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m08.png', },
    { id: '9', type: 0, hrefUrl: '', imgUrl: '../../static/image/v3/m09.png', },
  ]
}
function toend(istrue: boolean) {
  console.log('toend', istrue)
  isshow.value = !istrue
}
</script>

<template>
  <div class="view" ref="view" :style="{ width: appwidth + 'px' }">
    <div class="top">
      <image v-if="isshow" src="@/static/image/v3/b01.png"
        :style="{ width: appwidth + 'px', height: appwidth / 12.058 + 'px' }" />
    </div>
    <div class="main" :style="{ width: appwidth + 'px', height: appwidth * 1.159 + 'px' }">
      <aaswiper3 :list="bannerList" @toend="toend" />
    </div>
    <div class="bottom">
      <image v-if="isshow" src="@/static/image/v3/b02.png"
        :style="{ width: appwidth * 0.082 + 'px', height: appwidth * 0.082 + 'px' }"></image>
    </div>
  </div>

</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.view {
  margin: auto;
  height: 100%;
  background: url(@/static/image/v3/b00.png) no-repeat center/cover;
}

.top {
  display: flex;
  justify-content: center;
  align-items: end;
  box-sizing: border-box;
  width: 100%;
  height: 15vh;
  padding-bottom: 20px;
}

.main {
  box-sizing: border-box;
  // background: rgba(255, 255, 255, 0.9) no-repeat center/cover;
}

.bottom {
  padding: 20px 0 0 40px;
}
</style>
