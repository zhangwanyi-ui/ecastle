<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
</script>
<style lang="scss">
// 字体图标
@import '@/static/styles/fonts.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
