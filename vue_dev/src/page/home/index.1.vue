<template>
  <div id="app">
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">
        <Header :style="{padding: 0}" class="layout-header-bar Header-con">
          <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon> -->
          <h2>
            debug_app
          </h2>
        </Header>
        <Layout>
            <Sider ref="sideMenu" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="sideMenu">
              <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu :name="`${key + 1 + ''}`" v-for="(item, key) in menu.home" :key="key" @on-menu-item-select="linkTo">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    {{item.name}}
                  </template>
                  <MenuItem :name="`1-${I + 1}`" v-for="(li, I) in item.child" :key="I">{{li.link}}</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
              <router-view/>
            </Content>
        </Layout>
        <Footer class="Footer-con">
          <h5>
            debug_app koa + vue 定位前端 js 错误 (映射原始代码片段及行数)
          </h5>
        </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import menu from '@/com/menu'
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
      menu,
      isCollapsed: false
    }
  },
  // 父组件数据
  props: [],
  // 组件
  components: {
  },
  // 计算
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    linkTo (key, keyPath) {
      console.log(key, keyPath)
    },
    collapsedSider () {
      this.$refs.sideMenu.toggleCollapse()
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

  .Header-con{
    color: #fff;
    background-color: @title-color;
    text-align: center;
  }
  .Footer-con{
    text-align: center;
  }
</style>
