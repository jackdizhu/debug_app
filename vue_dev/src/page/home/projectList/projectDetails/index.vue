<template>
  <div>
    <div class="block">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="week"
        type="week"
        format="yyyy 第 WW 周"
        :picker-options="pickerOptions"
        placeholder="选择周">
      </el-date-picker>
    </div>
    <el-collapse @change="handleChange">
      <el-collapse-item :title="item.name + ' ------- ' + item.date" :name="key" v-for="(item, key) in projectErrorInfoList" :key="key">
        <div>
          <p>filename: {{item.filename}}</p>
          <p>line: {{item.line}}</p>
          <p>column: {{item.column}}</p>
          <p>## 详细信息</p>
          <div v-if="item.ext">
            <p>filename: {{item.ext.source}}</p>
            <p>line: {{item.ext.line}}</p>
            <p>column: {{item.ext.column}}</p>
            <p>code: </p>
            <textarea name="" id="" cols="30" rows="10" readonly>{{item.ext.code}}</textarea>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
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
    return {
      minDate: this.$moment().isoWeekday(1).format('YYYY-MM-DD'),
      maxDate: this.$moment().isoWeekday(7).format('YYYY-MM-DD'),

      projectErrorInfoList: [],
      pickerOptions: {
        firstDayOfWeek: 1
      },
      week: '',
      activeNames: ['1']
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
      'checkProject'
    ]),
    ...mapGetters(['getCheckProjectId'])
  },
  // 数据监听
  watch: {},
  // 事件方法
  methods: {
    handleChange (val) {
      console.log(val)
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
      url: this.$api.projectErrorInfoList,
      type: 'GET',
      params: {
        _id: this.getCheckProjectId,
        minDate: this.minDate,
        maxDate: this.maxDate
      }
    }).then(res => {
      if (res.res_code === '0') {
        this.projectErrorInfoList = res.projectErrorInfoList
        for (let i = 0; i < this.projectErrorInfoList.length; i++) {
          console.log(typeof this.projectErrorInfoList[i].date)
          this.projectErrorInfoList[i].date = this.$moment(this.projectErrorInfoList[i].date).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(res, 'this.$api.mock')
      } else {
        this.$message.error('查询项目详情失败.')
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

  textarea {
    resize: none;
    border: 0;
    background-color: #f6f8fa;
    color: #24292e;
    padding: 8px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
