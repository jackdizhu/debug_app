<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="swiper-box">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <!-- slides -->
      <swiper-slide class="text-deep-orange-6" v-for="(item, key) in list" :key="key">
        <div @click="handleLinkClick(item.link)">
          <span>{{item.name}}</span>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'v-awesome-swiper',
    components: {
      swiper,
      swiperSlide
    },
    props: ['list'],
    data () {
      return {
        swiperOption: {
          // 禁止 触摸滑动
          allowTouchMove: false,
          // 阻止冒泡事件
          preventClicks: false,
          // 轮播 方向
          direction: 'vertical',
          // 一次切换 显示个数
          slidesPerView: 1,
          // 异常切换 个数 2 有问题
          slidesPerGroup: 1,
          // 循环轮播
          loop: true,
          // autoplay: false
          autoplay: {
            // 5秒切换一次
            delay: 3000
          }
        }
      }
    },
    methods: {
      handleLinkClick (link) {
        // console.log(link)
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
      // this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
<style lang="less" scoped>
  .swiper-box {
    width: 100%;
    height: 100%;
    .swiper {
      width: 100%;
      height: 100%;
    }
    // overflow hidden
    .swiper-slide {
      width: 100%;
      // height 33px !important
      line-height: 32px;
      cursor: pointer;
    }
  }
</style>
