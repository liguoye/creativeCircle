<template>
  <div>
    <div class="red">此表格用于记录所有精刷单已支付的订单信息</div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="12" class="formGroup" style="text-align:left !important;">
            <span>统计时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="12" style="line-height:40px;">
            <el-button class="tablebtnActive" style="margin-left:0px;">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;">导出</el-button>
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
      msg: 'orderMessage',
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
          { name: '任务号', code: 'task1', width: '' },
          { name: '订单编号', code: 'task2', width: '' },
          { name: '商品简称', code: 'task3', width: '' },
          { name: '掌柜号', code: 'task4', width: '' },
          { name: '任务类型', code: 'task5', width: '' },
          { name: '担保金额', code: 'task6', width: '' },
          { name: '实际金额', code: 'task7', width: '' },
          { name: '发布点', code: 'task8', width: '' },
          { name: '置顶费用', code: 'task9', width: '' },
          { name: '自发空包减免费用', code: 'task10', width: '140' },
          { name: '支付时间', code: 'task11', width: '' }
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
