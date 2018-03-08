<template>
  <div class="VAwesomeSwiper">
    <v-awesome-swiper :list="arr"></v-awesome-swiper>
  </div>
</template>

<script>
  import VAwesomeSwiper from "@/components/v-awesome-swiper.1.vue";
  export default {
    components: {
      VAwesomeSwiper
    },

    data () {
      return {
        arr: [
          {
            name:  '12月活动',
            link: 'http:127.0.0.1:7300'
          },
          {
            name:  '1月活动',
            link: 'http:127.0.0.1:7300'
          }
        ]
      }
    },
    methods: {
    },
    watch: {
    },
    created: function () {
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    beforeDestroy () {
    }

  }
</script>

<style lang="less" scoped>
  .VAwesomeSwiper{
    width: 300px;
    height: 200px;
    border: 1px solid #d7dde4;
  }
</style>
