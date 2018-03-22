<template>
  <div>
    <el-container :style="{minHeight: '100vh'}" class="flex items-center content-center justify-center">

      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="登录">
            <el-form ref="formLogin" :model="formLogin" :rules="ruleLogin" :label-position="'right'" :label-width="'80px'">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="formLogin.name" />
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="formLogin.passwd" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit('formLogin')">确定</el-button>
                <el-button type="ghost" @click="handleReset('formLogin')" style="margin-left: 8px">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-form ref="formRegister" :model="formRegister" :rules="ruleRegister" :label-position="'right'" :label-width="'80px'">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="formRegister.name" />
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="formRegister.passwd" />
              </el-form-item>
              <el-form-item label="确认密码" prop="passwdCheck">
                <el-input type="password" v-model="formRegister.passwdCheck" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit('formRegister')">确定</el-button>
                <el-button type="ghost" @click="handleReset('formRegister')" style="margin-left: 8px">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </div>

    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
//   Form
// } from 'iview'
export default {
  name: 'index',
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名.'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码.'))
      } else {
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码.'))
      } else if (value !== this.formRegister.passwd) {
        callback(new Error('两次输入的密码不一致.'))
      } else {
        callback()
      }
    }

    return {
      formLogin: {
        name: '',
        passwd: ''
      },
      ruleLogin: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      formRegister: {
        name: '',
        passwd: '',
        passwdCheck: ''
      },
      ruleRegister: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
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
  computed: {},
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    ...mapActions(['user_signin']),
    getRegister (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$request({
            url: this.$api.register,
            type: 'POST',
            params: this.formRegister
          }).then(res => {
            if (res.res_code === '0') {
              this.$message.success('注册成功!')
              console.log(res, 'this.$api.mock')
            }
          })
        } else {
          this.$message.error('信息校验失败.')
        }
      })
    },
    getLogin (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$request({
            url: this.$api.login,
            type: 'POST',
            params: this.formLogin
          }).then(res => {
            if (res.res_code === '0') {
              this.$message.success('登录成功!')
              console.log(res, 'this.$api.mock')
              this.user_signin(res)

              this.$router.push('/home')
            } else {
              this.$message.error('登录失败.')
            }
          })
        } else {
          this.$message.error('信息校验失败.')
        }
      })
    },
    handleSubmit (name) {
      if (name === 'formRegister') {
        this.getRegister(name)
      } else {
        this.getLogin(name)
      }
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
  .el-form{
    width: 412px;
    height: 320px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
