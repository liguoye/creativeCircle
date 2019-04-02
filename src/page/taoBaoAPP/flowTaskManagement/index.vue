<template>
  <div class="flowTaskManagement">
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')">发布流量任务</li>
        <li @click="navListClick('flowTaskManagement')" class="current">流量任务管理</li>
      </ul>
    </div>

    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <el-select v-model="formData.taskClass.value" placeholder="请选择">
              <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.taskNum.value" placeholder="请选择">
              <el-option v-for="item in formData.taskNum.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
            <span>支付时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive">查询</el-button>
            <el-button class="tablebtnFFF">刷新</el-button>
            <el-button class="tablebtnFFF">一键审核(0)</el-button>
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
          value: '所有任务',
          options: [
            { label: '所有任务', value: '所有任务' },
            { label: '未设置评价', value: '未设置评价' },
            { label: '完成评价', value: '完成评价' },
            { label: '等待评价', value: '等待评价' },
            { label: '等待追评', value: '等待追评' },
            { label: '完成追评', value: '完成追评' },
            { label: '已取消评价', value: '已取消评价' }
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
          { name: '任务信息', code: 'task1', width: '' },
          { name: '商品信息', code: 'task2', width: '' },
          { name: '任务详情', code: 'task3', width: '' },
          { name: '任务状态', code: 'task4', width: '' },
          { name: '操作按钮', code: 'task5', width: '' }
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
.flowTaskManagement {
  width: 1150px;
  margin: 0 auto;
}
</style>
