<template>
  <div>
    <div class="tips">
      <p>下方表格记录的是买家提交的提现未到账反馈，请复制订单编号到网银核实该笔订单的转账情况：</p>
      <p>1、若经核实，该笔订单显示为“转账成功”，请在上传凭证窗口
        <span class="red">提交</span>该笔订单的
        <span class="red">成功转账凭证</span>;</p>
      <p>2、若经核实，实际上
        <span class="red">未对该订单进行转账</span>，请及时转账，上传凭证。若
        <span class="red">实际转账失败</span>了，请在上传凭证窗口点击
        <span class="red">【转账失败】</span>按钮，将该笔订单的状态变更为转账失败；</p>
      <p>
        <span class="red">温馨提示：</span>请务必在
        <span class="red">每日下午15点前</span>对需要上传凭证的订单进行操作，否则
        <span class="red">任务将被隐藏</span>。</p>
    </div>
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
          </el-col>
        </el-row>
      </div>
      <div class="tableCom">
        <el-table :data="tableData.data" border style="width: 100%">

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
          { name: '提现人', code: 'bank_account.card_name', width: '' },
          { name: '银行卡号', code: 'bank_account.bank_number', width: '130' },
          { name: '开户行', code: 'bank_account.bank_name', width: '' },
          { name: '支行名称', code: 'bank_account.branch', width: '' },
          { name: '转账状态', code: 'status', width: '', com: 'status' },
          { name: '转账截止时间', code: 'ut', width: '150' },
          { name: '操作按钮', code: '', width: '', com: 'handle' }
        ]
      }
    }
  },
  methods: {

    getchargeList (param) {
      let queryParams = {
        params: {
          token: this.$getToken(),
          type: '3'
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
       // console.log('转账列表', res)
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data
        }
      })
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
