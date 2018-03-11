<template>
  <div>
    <el-container>
      <el-form ref="formProject" :model="formProject" :rules="ruleProject" :label-position="'right'" :label-width="'80px'">
        <el-form-item label="项目名称" prop="name">
          <el-input type="text" v-model="formProject.name" />
        </el-form-item>
        <el-form-item label="项目描述" prop="msg">
          <el-input type="textarea" v-model="formProject.msg" />
        </el-form-item>
        <el-form-item label="map文件" prop="mapFile">
          <el-upload
            class="upload"
            :action="$api.upload"
            multiple
            :limit="3"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-input type="text" v-model="formProject.mapFile" />
        </el-form-item>
        <el-form-item label="mapURL" prop="mapFile">
          <el-input type="text" v-model="formProject.mapFile" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('formProject')">确定</el-button>
          <el-button type="ghost" @click="handleReset('formProject')" style="margin-left: 8px">重置</el-button>
        </el-form-item>
      </el-form>
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
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容.'))
      } else {
        callback()
      }
    }

    return {
      fileList: [],
      formProject: {
        name: '',
        msg: '',
        mapFile: ''
      },
      ruleProject: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        msg: [
          { validator: validateName, trigger: 'blur' }
        ],
        mapFile: [
          { validator: validateName, trigger: 'blur' }
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
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    handleChange (file, fileList) {
      // this.fileList = fileList.slice(-3)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$request({
          //   url: this.$api.login,
          //   type: 'POST',
          //   params: this.formLogin
          // }).then(res => {
          //   if (res.res_code === '0') {
          //     this.$message.success('登录成功!')
          //     console.log(res, 'this.$api.mock')
          //     this.user_signin(res)

          //     this.$router.push('/home')
          //   } else {
          //     this.$message.error('登录失败.')
          //   }
          // })
          this.$message.success('handleSubmit!')
          console.log('handleSubmit')
        } else {
          this.$message.error('信息校验失败.')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
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

</style>
