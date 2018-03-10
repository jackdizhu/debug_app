<template>
  <div>
    <el-container>
      <el-card class="box-card">
        <div slot="header" class="bootclearfix box-card-header" @click="showProjectDetails">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click.stop="edit">编辑</el-button>
        </div>
        <div class="text item">
          列表内容
        </div>
      </el-card>
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
    showProjectDetails () {
      this.$router.push('/home/projectList/projectDetails')
    },
    edit () {
      console.log('edit')
    }
  },
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
  @import '~@/them/com.less';

  .box-card-header {
    cursor: pointer;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }
</style>
