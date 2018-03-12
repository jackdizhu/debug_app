<template>
  <div>
    <el-container>
    </el-container>
  </div>
</template>

<script>
// import {
//   Layout,
//   Row,
//   Content,
//   Card,
//   FormItem,
//   Input,
//   Button,
//   Tabs,
//   TabPane,
//   Menu,
//   Submenu,
//   MenuItem,
//   Icon,
//   Form
// } from 'iview'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  // 父组件数据
  props: [],
  // 组件
  components: {
  },
  // 计算
  computed: {
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    getJson () {
      this.$request({
        url: this.$api.json,
        type: 'GET',
        params: {}
      }).then(res => {
        if (res.res_code.err === '0') {
          console.log(res, 'this.$api.mock')
          // this.$router.push('/home')
        } else {
          this.$message.error('getJson 失败.')
        }
      })
    }
  },
  // el 和 data 并未初始化
  beforeCreate () {
    // this.$router.push('/index')
    console.log('beforeCreate ------------- el 和 data 并未初始化')
  },
  // 完成了 data 数据的初始化，el没有
  created () {
    this.getJson()
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
  @import '~@/them/com.less';

</style>
