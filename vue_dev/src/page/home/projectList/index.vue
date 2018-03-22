<template>
  <div>
    <el-container>
      <el-header class="el-header-h5" style="height: 32px;line-height: 32px;">
        项目列表
      </el-header>

      <el-main class="el-main-con">
        <el-card class="box-card" v-for="(item, key) in projectList" :key="key">
          <div slot="header" class="bootclearfix box-card-header" @click.stop="showProjectDetails(item)">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click.stop="edit(item)">编辑</el-button>
          </div>
          <div class="text item">
            {{item.msg}}
          </div>
          <div class="text item">
            {{item.key}}
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
      projectList: []
    }
  },
  // 父组件数据
  props: [],
  // 组件
  components: {
  },
  // 计算
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters(['getUserId'])
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    ...mapActions(['actions_checkProject']),
    showProjectDetails (project) {
      this.actions_checkProject(project)
      console.log(project)
      setTimeout(() => {
        this.$router.push('/home/projectList/projectDetails')
      }, 0)
    },
    edit (project) {
      this.actions_checkProject(project)
      this.$router.push('/home/updateProject')
    }
  },
  // el 和 data 并未初始化
  beforeCreate () {
    // this.$router.push('/index')
    console.log('beforeCreate ------------- el 和 data 并未初始化')
  },
  // 完成了 data 数据的初始化，el没有
  created () {
    this.$request({
      url: this.$api.projectList,
      type: 'GET',
      params: {
        userId: this.getUserId
      }
    }).then(res => {
      if (res.res_code === '0') {
        this.projectList = res.project
        console.log(res, 'this.$api.mock')
      } else {
        this.$message.error('查询项目列表失败.')
      }
    })
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
    margin-bottom: 20px;
  }
</style>
