<template>
  <div class="flex items-center content-center justify-center">
    <div class="link">
      <p>
        <router-link to="/page/VModelTest">v-model 组件 双向绑定</router-link>
      </p>
      <p>
        <router-link to="/page/VAwesomeSwiper">活动广告 轮播</router-link>
      </p>
      <p>
        <router-link to="/page/VAwesomeSwiper2">广告图 轮播</router-link>
      </p>
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import logo from '@/assets/logo.png'

export default {
  name: 'app',
  data: () => {
    return {}
  },
  // 父组件数据
  props: [],
  // 组件
  components: {},
  // 计算
  computed: {},
  // 数据监听
  watch: {},
  // 事件方法
  methods: {},
  // el 和 data 并未初始化
  beforeCreate() {
  },
  // 完成了 data 数据的初始化，el没有
  created() {
    // get test
    this.$request({
      url: this.$api.mock,
      type: 'GET',
      params: {}
    }).then(res => {
      console.log(res, 'this.$api.mock')
    })
    // post test
    this.$request({
      url: this.$api.mock,
      type: 'POST',
      params: {}
    }).then(res => {
      console.log(res, 'this.$api.mock')
    })
  },
  // 完成了 el 和 data 初始化
  beforeMount() {
  },
  // 完成挂载
  mounted() {
  }
}
</script>

<style lang="less" scoped>
  .link{
    text-align: left;
    width: 25%;
    font-size: 1.4rem;
  }
  .page{
    width: 75%;
    background: #f5f7f9;
  }
  .link,
  .page{
    padding: .5rem;
    min-height: 40rem;
  }
</style>
