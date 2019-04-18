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
            <el-button class="tablebtnFFF" style="margin-left:0px;">导出</el-button>
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
          { name: '转账人银行卡', code: 'bank_account.bank_number', width: '' },
          { name: '提现人银行卡', code: 'bank_account.bank_name', width: '' },
          { name: '提现人姓名', code: 'bank_account.card_name', width: '' },
          { name: '转账状态', code: 'status', width: '', com: 'status' },
          { name: '转账时间', code: 'endtime', width: '' }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.tableSelectData = val
    },
    getchargeList (param) {
      let queryParams = {
        params: {
          token: this.$getToken(),
          type: '已转账'
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
        console.log('转账列表', res)
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
