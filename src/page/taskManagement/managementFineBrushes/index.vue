<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="publicFineBrushes">
      <div class="formGroup">
        <el-row>
          <el-col :span="12">
            <el-select v-model="formData.taskClass.value" placeholder="请选择">
              <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.allTask.value" placeholder="请选择">
              <el-option v-for="item in formData.allTask.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.taskNum.value" placeholder="请选择">
              <el-option v-for="item in formData.taskNum.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="formData.orderKeyword" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.payTime.value" placeholder="请选择">
              <el-option v-for="item in formData.payTime.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
      <div class="btnGroup">
        <el-button class="tablebtnActive">查询</el-button>
        <el-button class="tablebtnFFF">刷新</el-button>
        <el-button class="tablebtnFFF">一键取消</el-button>
      </div>
      <div class="table">
        <table-com :columns="tableData.columns"></table-com>
      </div>
    </div>
  </div>
</template>
<script>
import navList from '@/components/taskManagementNavList.vue'
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    navList,
    tableCom
  },
  data () {
    return {
      currentTab: 'managementFineBrushes',
      formData: {
        taskClass: {
          value: '任务分类',
          options: [
            { label: '任务分类', value: '任务分类' },
            { label: '精刷单任务', value: '精刷单任务' },
            { label: '预约推送任务', value: '预约推送任务' },
            { label: '复购任务', value: '复购任务' }
          ]
        },
        allTask: {
          value: '全部任务',
          options: [
            { label: '全部任务', value: '全部任务' },
            { label: '待接手', value: '待接手' },
            { label: '进行中', value: '进行中' },
            { label: '待发货', value: '待发货' },
            { label: '待完成', value: '待完成' },
            { label: '已完成', value: '已完成' },
            { label: '隐藏中', value: '隐藏中' }
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
        payTime: {
          value: '支付时间',
          options: [
            { label: '支付时间', value: '支付时间' },
            { label: '接手时间', value: '接手时间' },
            { label: '发布时间', value: '发布时间' },
            { label: '完成时间', value: '完成时间' }
          ]
        },
        browseKeyword: '',
        orderKeyword: '',
        account: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务分类', code: 'task1', width: '' },
          { name: '任务/订单编号', code: 'task2', width: '' },
          { name: '买号/商品信息', code: 'task3', width: '' },
          { name: '商品价格/发布点', code: 'task4', width: '' },
          { name: '操作', code: 'task5', width: '' },
          { name: '操作按钮', code: 'task6', width: '' }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.publicFineBrushes {
  width: 1150px;
  margin: 0 auto;
  .formGroup {
    margin-top: 20px;
  }
}
</style>
