<template>
  <div>
    <div class="tips">
      <p>下方表格记录的是买家已在购物平台
        <span class="red">退款成功</span>的订单。对于以下情况的订单，买家有权利到购物平台进行退款：</p>
      <p>1、卖家长时间未转账;</p>
      <p>2、卖家频繁操作转账失败的订单。</p>
      <p>退款成功后，管理员会将订单状态变更为"已退款"。</p>
    </div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important;width:calc(100% - 195px);">
            <span>订单编号</span>
            <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
            <span>转账时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px;width:195px;">
            <el-button class="tablebtnActive" style="margin-left:0px;">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;">刷新</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <table-com :columns="tableData.columns"></table-com>
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
  data () {
    return {
      msg: 'flowTaskManagement',
      formData: {
        taskClass: {
          value: '',
          options: [
            { label: '未到账', value: '未到账' },
            { label: '转账失败', value: '转账失败' }
          ]
        },
        taskNum: {
          value: '任务编号',
          options: [
            { label: '任务编号', value: '任务编号' },
            { label: '订单编号', value: '订单编号' },
            { label: '运单号', value: '运单号' },
            { label: '店铺名称', value: '店铺名称' },
            { label: '买号名称', value: '买号名称' },
            { label: '商品编号', value: '商品编号' }
          ]
        },
        keyWord: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '订单编号', code: 'task1', width: '' },
          { name: '转账金额', code: 'task2', width: '' },
          { name: '转账人银行卡', code: 'task3', width: '' },
          { name: '提现人银行卡', code: 'task4', width: '' },
          { name: '提现人姓名', code: 'task5', width: '' },
          { name: '转账状态', code: 'task6', width: '' },
          { name: '转账截止时间', code: 'task7', width: '' }
        ]
      }
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
