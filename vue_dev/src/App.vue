<template>
  <div id="app">
    <div class="img-box">
      <img :src="logo" width="16px">
    </div>
    <router-view/>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'app',
  data: () => {
    return {
      logo: logo
    }
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
  beforeCreate () {
    // this.$router.push('/index')
    console.log('beforeCreate ------------- el 和 data 并未初始化')
  },
  // 完成了 data 数据的初始化，el没有
  created () {
    console.log('created ------------------ 完成了 data 数据的初始化，el没有')
  },
  // 完成了 el 和 data 初始化
  beforeMount () {
    console.log('beforeMount -------------- 完成了 el 和 data 初始化')
  },
  // 完成挂载
  mounted () {
    console.log('mounted ------------------ 完成挂载')
  }
}
</script>

<style lang="less" scoped>
  .img-box{
    text-align: center;
    padding: 1rem;
  }
</style>
