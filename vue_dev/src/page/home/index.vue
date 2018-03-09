<template>
  <div id="app">
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">
        <Content class="flex items-center content-center justify-center">
          <Card style="width:320px">
            <Tabs type="card">
              <TabPane label="登录">
                <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" :label-width="80">
                  <FormItem label="用户名" prop="name">
                    <Input type="text" v-model="formLogin.name"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formLogin.passwd"></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formLogin')">确定</Button>
                    <Button type="ghost" @click="handleReset('formLogin')" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane label="注册">
                <Form ref="formRegister" :model="formRegister" :rules="ruleRegister" :label-width="80">
                  <FormItem label="用户名" prop="name">
                    <Input type="text" v-model="formRegister.name"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formRegister.passwd"></Input>
                  </FormItem>
                  <FormItem label="确认密码" prop="passwdCheck">
                    <Input type="password" v-model="formRegister.passwdCheck"></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formRegister')">确定</Button>
                    <Button type="ghost" @click="handleReset('formRegister')" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>

          </Card>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
import {
  Layout,
  Row,
  Content,
  Card,
  FormItem,
  Input,
  Button,
  Tabs,
  TabPane,
  Form
} from 'iview'
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
      console.log(this.formRegister)

      if (value === '') {
        callback(new Error('请输入密码.'))
      } else {
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码.'))
      } else if (value !== this.formLogin.passwd) {
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
    getRegister (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$request({
            url: this.$api.register,
            type: 'POST',
            params: this.formRegister
          }).then(res => {
            if (res.res_code === '0') {
              this.$Message.success('注册成功!')
              console.log(res, 'this.$api.mock')
            }
          })
        } else {
          this.$Message.error('信息校验失败.')
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
              this.$Message.success('登录成功!')
              console.log(res, 'this.$api.mock')
            } else {
              this.$Message.error('登录失败.')
            }
          })
        } else {
          this.$Message.error('信息校验失败.')
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
      this.$refs[name].resetFields();
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
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .Row-con{
    height: 100%;
  }
</style>
