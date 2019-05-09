<template>
  <div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="20" class="formGroup" style="text-align:left !important;">
            <span>统计时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <span>类型</span>
            <el-select v-model="formData.type.value" placeholder="请选择">
              <el-option v-for="item in formData.type.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>任务编号</span>
            <el-input v-model="formData.orderid" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4" style="line-height:40px;">
            <el-button class="tablebtnActive" style="margin-left:0px;" @click="queryData('param')">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;" @click="handleDownload()">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <table-com :columns="tableData.columns" :data="list" @handleCurrentChange="handleCurrentChange" :total="total"
          :table-height="400"></table-com>
      </div>
    </div>
  </div>
</template>
<script>
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    tableCom
  },
  created () {
    this.queryData()
  },
  data () {
    return {
      msg: 'orderMessage',
      page: 1,
      total: 0,
      formData: {
        type: {
          value: '',
          options: [
            { value: '1', label: '发布任务' },
            { value: '2', label: '取消任务' },
            { value: '3', label: '充值' },
            { value: '4', label: '购买流量' },
            { value: '5', label: '多退少补' },
            { value: '6', label: '任务处罚' },
            { value: '7', label: '财务增' },
            { value: '8', label: '财务扣' },
            { value: '9', label: '购买发布点' },
            { value: '10', label: '兑换资金' },
            { value: '11', label: '返回待支付退差价' },
            { value: '12', label: '返回待支付退担保金' },
            { value: '13', label: '取消流量' },
            { value: '14', label: '返回待支付退处罚' },
            { value: '15', label: '工单处罚' },
            { value: '16', label: '退出任务退处罚' },
            { value: '17', label: '退出任务退多退少补' },
            { value: '18', label: '购买智能助手基础版' },
            { value: '19', label: '购买评价' },
            { value: '20', label: '取消评价' },
            { value: '21', label: '返还购买评价' }
          ]
        },
        orderid: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '消费ID', code: 'orderid', width: '150' },
          { name: '类型', code: 'type', width: '' },
          { name: '消费存款', code: 'b_price', width: '' },
          { name: '消费发布点', code: 'b_publishing', width: '100' },
          { name: '原存款', code: 'before_price', width: '' },
          { name: '原发布点', code: 'before_publishing', width: '' },
          { name: '剩余存款', code: 'price', width: '' },
          { name: '剩余发布点', code: 'publishing', width: '100' },
          { name: '备注', code: 'remark', width: '200' },
          { name: '消费时间', code: 'ct', width: '160' }
        ]
      }
    }
  },
  computed:{
      list(){
          let data=this.tableData.data
          data.forEach(item=>{
              item.before_publishing=item.before_publishing/100
              item.publishing=item.publishing/100
              item.b_publishing=item.b_publishing/100
          })
          return data
      }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.queryData('param')
    },
    queryData (param) {
      let queryParams = {
        params: {
          token: this.$getToken()
        }
      }
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            type: this.formData.type.value,
            orderid: this.formData.orderid,
            page: this.page,
            start: this.formData.date[0],
            end: this.formData.date[1]

          }
        }
      }
      this.$ajax.get('shopmember/detailed', queryParams).then(res => {
        if (res && res.data && res.data.code === 1) {
            let list=res.data.data.data
          list.forEach(item => {
              switch (item.type) {
                    case 1:
                      item.type='发布任务'
                      break;
                    case 2:
                      item.type='取消任务'
                      break;
                    case 3:
                      item.type='充值'
                      break;
                    case 4:
                      item.type='购买流量'
                      break;
                    case 5:
                      item.type='多退少补'
                      break;
                    case 6:
                      item.type='任务处罚'
                      break;
                    case 7:
                      item.type='财务增'
                      break;
                    case 8:
                      item.type='财务扣'
                      break;
                    case 9:
                      item.type='购买发布点'
                      break;
                    case 10:
                      item.type='兑换资金'
                      break;
                    case 11:
                      item.type='返回待支付退差价'
                      break;
                    case 12:
                      item.type='返回待支付退担保金'
                      break;
                    case 13:
                      item.type='取消流量'
                      break;
                    case 14:
                      item.type='返回待支付退处罚'
                      break;
                    case 15:
                      item.type='工单处罚'
                      break;
                    case 16:
                      item.type='退出任务退处罚'
                      break;
                    case 17:
                      item.type='退出任务退多退少补'
                      break;
                    case 18:
                      item.type='购买智能助手基础版'
                      break;
                    case 19:
                      item.type='购买评价'
                      break;
                    case 20:
                      item.type='取消评价'
                      break;
                    case 21:
                      item.type='返还购买评价'
                      break;
              
                  default:
                      break;
              }
              item.b_price=item.b_price/100
              item.MinLi=item.b_publishing/100
              item.before_price=item.before_price/100
              item.price=item.price/100
          });
          this.tableData.data = res.data.data.data
          this.total = res.data.data.total
          this.page = 1
        }
      })
    },
    // 导出功能
    handleDownload () {
      if (this.tableData.data.length <= 0) {
        this.$notify({
          title: '没有数据可导出',
          type: 'warning'
        })
        return false
      }
      this.downloadLoading = true
      let tHeader = []
      let filterVal = [] // 字段如果有前缀要去除(bank_account.bank_name)
      for (let i = 0; i < this.tableData.columns.length; i++) {
        tHeader.push(this.tableData.columns[i]['name'])
        filterVal.push(this.tableData.columns[i]['code'])
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel.js')
        const list = this.tableData.data
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '列表excel')
        this.downloadLoading = false
      })
    },
    // 导出格式化数据
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="less" scoped>
.tips {
  border: 1px solid #ccebfa;
  border-radius: 4px;
  flex-direction: row;
  padding: 10px;
  margin: 20px 0;
  font-size: 13px;
  p {
    line-height: 22px;
    .red {
      color: red;
    }
  }
}
</style>
