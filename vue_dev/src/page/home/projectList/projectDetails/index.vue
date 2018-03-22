<template>
  <div>
    <div class="block">
      <span class="demonstration">月</span>
      <el-date-picker
        v-model="dataM"
        type="month"
        @change="monthChange"
        placeholder="选择月">
      </el-date-picker>
    </div>
    <div class="vie-Chart" v-if="isgetInitData">
      <v-schart :canvasId="canvasId"
        :type="type"
        :width="width"
        :height="height"
        :data="data"
        :options="options"
      >
      </v-schart>
    </div>
    <el-collapse @change="handleChange">
      <el-collapse-item class="item-box" :title="item.name + ' ------- ' + item.date" :name="key" v-for="(item, key) in projectErrorInfoList" :key="key">
        <div>
          <p class="tit">初步错误信息</p>
          <p>filename: {{item.filename}}</p>
          <p>line: {{item.line}}</p>
          <p>column: {{item.column}}</p>
          <div v-if="item.ext" class="detailed-information">
            <p class="tit">详细错误信息</p>
            <p>filename: {{item.ext.source}}</p>
            <p>line: {{item.ext.line}}</p>
            <p>column: {{item.ext.column}}</p>
            <!-- 暂时不显示 代码片段 -->
            <!-- <p>code: </p>
            <textarea name="" id="" cols="30" rows="10" readonly>{{item.ext.code}}</textarea> -->
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import VSchart from 'vue-schart'
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
      // 查询数据 是否完成
      isgetInitData: false,
      minDate: this.$moment().startOf('month').format('YYYY-MM-DD'),
      maxDate: this.$moment().endOf('month').format('YYYY-MM-DD'),

      projectErrorInfoList: [],
      pickerOptions: {
        firstDayOfWeek: 1
      },
      dataM: this.$moment(),
      activeNames: ['1'],
      // 图表
      canvasId: 'myCanvas',
      type: 'line',
      width: 982,
      height: 200,
      data: [
        // {
        //   name: '2014',
        //   value: 0
        // },
        // {
        //   name: '2015',
        //   value: 2
        // },
        // {
        //   name: '2016',
        //   value: 3
        // },
        // {
        //   name: '2017',
        //   value: 0
        // }
      ],
      options: {
        // canvas 内边距
        padding: 50,
        // 默认背景颜色
        bgColor: '#FFFFFF',
        // 图表标题
        title: '当月错误信息 条目图表',
        // 图表标题颜色
        titleColor: '#000000',
        // 图表标题位置: top / bottom
        titlePosition: 'top',
        // y轴分成5等分
        yEqual: 5,
        // 默认填充颜色
        fillColor: '#1E9FFF',
        // 内容横线颜色
        contentColor: '#eeeeee',
        // 坐标轴颜色
        axisColor: '#666666'
      }
    }
  },
  // 父组件数据
  props: [],
  // 组件
  components: {
    VSchart
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
    initChartData () {
      let dayn = Number(this.$moment(this.maxDate).endOf('month').format('DD'))
      let _arr = []
      for (let i = 0; i < dayn; i++) {
        _arr[i] = {
          name: i + 1,
          value: 0
        }
      }
      this.data = _arr
      console.log(this.data)
    },
    getInitData () {
      // 开始查询数据
      this.isgetInitData = false

      this.initChartData()
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
            let _d = this.$moment(this.projectErrorInfoList[i].date)
            let _dateTime = _d.format('YYYY-MM-DD HH:mm:ss')
            let _date = Number(_d.format('DD'))
            this.projectErrorInfoList[i].date = _dateTime
            // 统计
            this.data[_date - 1].value += 1
            console.log(this.data)
            // 查询完 显示数据
            this.isgetInitData = true
          }
          console.log(res, 'this.$api.mock')
        } else {
          this.$message.error('查询项目详情失败.')
        }
      })
    },
    // 月份切换
    monthChange (val) {
      this.minDate = this.$moment(val).startOf('month').format('YYYY-MM-DD')
      this.maxDate = this.$moment(val).endOf('month').format('YYYY-MM-DD')
      this.getInitData()
    },
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
    this.getInitData()
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
  .item-box {
    .tit {
      color: #a6d734;
    }
  }
</style>
