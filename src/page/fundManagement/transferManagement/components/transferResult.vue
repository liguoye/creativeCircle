<template>
  <div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important;width:calc(100% - 195px);">
            <span>订单编号</span>
            <el-input v-model="formData.orderid" placeholder="请输入内容"></el-input>
            <span>转账状态</span>
            <el-select v-model="formData.type.value" placeholder="请选择">
              <el-option v-for="item in formData.type.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>转账时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px;width:195px;">
            <el-button class="tablebtnActive" style="margin-left:0px;" @click="getchargeList('param')">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;" @click="getchargeList()">刷新</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;" @click="handleDownload()">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom">
        <el-table :data="tableData.data" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <template v-for="(item,index) in tableData.columns">
            <!-- <template v-if="item.com=='input'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <el-input v-model="tableData.data[scope.$index][item.code]"></el-input>
                </template>
              </el-table-column>
            </template> -->
            <template v-if="item.com=='status'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <span v-if=" tableData.data[scope.$index]['status'] == 1 ">等待转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 2 ">已转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 3 ">转账失败</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 4 ">未转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 5 ">已退款</span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :key="index " :width="item.width " :prop="item.code " :label="item.name " align="center ">
              </el-table-column>
            </template>
          </template>
        </el-table>
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
    this.getchargeList()
  },
  data () {
    return {
      msg: 'flowTaskManagement',
      tableSelectData: [],
      formData: {
        type: {
          value: '',
          options: [
            { label: '等待转账', value: '等待转账' },
            { label: '已导出', value: '已导出' }
          ]
        },
        orderid: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '订单编号', code: 'orderid', width: '180' },
          { name: '转账金额', code: 'price', width: '' },
          { name: '转账人银行卡', code: 'bank_account.bank', width: '130' },
          { name: '提现人银行卡', code: 'bank_account.bank_name', width: '130' },
          { name: '提现人姓名', code: 'bank_account.card_name', width: '' },
          { name: '转账状态', code: 'status', width: '', com: 'status' },
          { name: '转账时间', code: 'ct', width: '150' }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
     // console.log(val)
      this.tableSelectData = val
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
      let filterVal = ['orderid', 'price', 'bank', 'bank_name', 'card_name', 'status', 'ct'] // 字段如果有前缀要去除(bank_account.bank_name)
      for (let i = 0; i < this.tableData.columns.length; i++) {
        tHeader.push(this.tableData.columns[i]['name'])
        // filterVal.push(this.tableData.columns[i]['code'])
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
    },
    getchargeList (param) {
      let queryParams = {
        params: {
          token: this.$getToken(),
          type: '2'
        }
      }
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            type: this.formData.type.value,
            orderid: this.formData.orderid,
            start: this.formData.date[0],
            end: this.formData.date[1]

          }
        }
      }
      this.$ajax.get('shopmember/accountsList', queryParams).then(res => {
      //  console.log('转账列表', res)
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
