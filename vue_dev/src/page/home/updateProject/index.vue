<template>
  <div>
    <el-container>
      <el-header class="el-header-h5" style="height: 32px;line-height: 32px;">
        项目编辑
      </el-header>

      <el-main class="el-main-con">
        <el-card class="box-card">
          <el-form ref="formProject" :model="formProject" :rules="ruleProject" :label-position="'right'" :label-width="'80px'">
            <el-form-item label="项目名称" prop="name">
              <el-input type="text" v-model="formProject.name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="项目描述" prop="msg">
              <el-input type="textarea" v-model="formProject.msg" />
            </el-form-item>
            <el-form-item label="map文件" prop="mapFile">
              <el-upload
                class="upload"
                :action="$api.upload"
                accept="*.map"
                :headers="headers"
                :limit="1"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <!-- mapFileUrl 功能后面做 -->
            <!-- <el-form-item label="mapURL" prop="mapFileUrl">
              <el-input type="text" v-model="formProject.mapFileUrl" />
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="handleSubmit('formProject')">确定</el-button>
              <el-button type="ghost" @click="handleReset('formProject')" style="margin-left: 8px">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容.'))
      } else {
        callback()
      }
    }

    return {
      resProject: {},
      headers: {
        authorization: ''
      },
      fileList: [],
      formProject: {
        _id: '',
        userId: '',
        name: '',
        msg: '',
        mapFile: '',
        mapFileUrl: ''
      },
      ruleProject: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        msg: [
        ],
        mapFile: [
        ]
      }
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
      'user',
      'token'
    ]),
    ...mapGetters([
      'getUserId',
      'getToken',
      'getCheckProjectId'
    ])
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    handleChange (file, fileList) {
      if (file) {
        // let { size, name, type } = file.raw
        let _name = (file.response && file.response.file && file.response.file.nowName) || ''
        this.formProject.mapFile = _name
      }
    },
    handleSubmit (name) {
      this.formProject.userId = this.getUserId
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$request({
            url: this.$api.projectUpdate,
            type: 'POST',
            params: this.formProject
          }).then(res => {
            if (res.res_code === '0') {
              this.$message.success('更新项目成功!')
              console.log(res, 'this.$api.mock')

              // this.$router.push('/home')
            } else {
              this.$message.error('更新项目失败.')
            }
          })
        } else {
          this.$message.error('信息校验失败.')
        }
      })
    },
    handleReset (name) {
      Object.assign(this.formProject, this.resProject)
    }
  },
  // el 和 data 并未初始化
  beforeCreate () {
    // this.$router.push('/index')
    console.log('beforeCreate ------------- el 和 data 并未初始化')
  },
  // 完成了 data 数据的初始化，el没有
  created () {
    this.headers.authorization = this.getToken

    this.$request({
      url: this.$api.projectFindOne,
      type: 'GET',
      params: {
        _id: this.getCheckProjectId
      }
    }).then(res => {
      if (res.res_code === '0') {
        this.resProject = res.project
        Object.assign(this.formProject, this.resProject)
        console.log(res, 'this.$api.mock')
      } else {
        this.$message.error('查询项目信息失败.')
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

  .box-card{
    padding: 28px 6px 30px 6px;
  }
</style>
