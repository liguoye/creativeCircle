<template>
  <div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important;width:calc(100% - 195px);">
            <span>订单编号</span>
            <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
            <span>转账状态</span>
            <el-select v-model="formData.taskClass.value" placeholder="请选择">
              <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>转账时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px;width:195px;">
            <el-button class="tablebtnActive" style="margin-left:0px;">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;">刷新</el-button>
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
      msg: 'flowTaskManagement',
      formData: {
        taskClass: {
          value: '',
          options: [
            { label: '转账成功', value: '转账成功' },
            { label: '转账失败', value: '转账失败' },
            { label: '未到账', value: '未到账' }
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
          { name: '转账时间', code: 'task7', width: '' }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
