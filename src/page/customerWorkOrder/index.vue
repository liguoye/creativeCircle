<template>
  <div class="customerWorkOrder">
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')" class="current">新客服工单</li>
      </ul>
    </div>
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')" class="current">任务处罚列表</li>
      </ul>
    </div>

    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <span>工单状态: </span>
            <el-select v-model="formData.wordOrderState.value" placeholder="请选择">
              <el-option v-for="item in formData.wordOrderState.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>工单类型: </span>
            <el-select v-model="formData.workOrderType.value" placeholder="请选择">
              <el-option v-for="item in formData.workOrderType.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>问题分类: </span>
            <el-select v-model="formData.problemClass.value" placeholder="请选择">
              <el-option v-for="item in formData.problemClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <span>订单编号: </span>
            <el-input v-model="formData.orderNum" placeholder="请输入内容"></el-input>
            <span>任务编号: </span>
            <el-input v-model="formData.taskNum" placeholder="请输入内容"></el-input>
            <span>创建时间: </span>
            <el-date-picker v-model="formData.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnFFF">刷新</el-button>
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
      msg: 'customerWorkOrder',
      formData: {
        wordOrderState: {
          value: '全部',
          options: [
            { label: '全部的', value: '全部的' },
            { label: '待处理', value: '待处理' },
            { label: '跟进中', value: '跟进中' },
            { label: '待执行', value: '待执行' },
            { label: '处理完成', value: '处理完成' },
            { label: '已撤销', value: '已撤销' },
            { label: '拒绝处理', value: '拒绝处理' }
          ]
        },
        workOrderType: {
          value: '全部',
          options: [
            { label: '全部的', value: '全部的' },
            { label: '其他导致买家损失的行为', value: '其他导致买家损失的行为' },
            { label: '退款', value: '退款' },
            { label: '好评问题', value: '好评问题' },
            { label: '任务过程出错', value: '任务过程出错' }
          ]
        },
        problemClass: {
          value: '全部',
          options: [
            { label: '全部的', value: '全部的' }
          ]
        },
        createTime: '',
        taskNum: '',
        orderNum: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务编号', code: 'task1', width: '' },
          { name: '订单编号', code: 'task2', width: '' },
          { name: '工单类型', code: 'task3', width: '' },
          { name: '任务状态', code: 'task4', width: '' },
          { name: '处罚金额', code: 'task5', width: '' },
          { name: '工单状态', code: 'task6', width: '' },
          { name: '创建时间', code: 'task7', width: '' },
          { name: '操作', code: 'task8', width: '' }
        ]
      }
    }
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    }
  }
}
</script>
<style lang="less" scoped>
.customerWorkOrder {
  width: 1150px;
  margin: 0 auto;
  .btnGroup {
    .el-row {
      .el-col {
        margin-bottom: 5px;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
