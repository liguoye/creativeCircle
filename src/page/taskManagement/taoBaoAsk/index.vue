<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="taoBaoAsk">

      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <el-select v-model="formData.allTask.value" placeholder="请选择">
              <el-option v-for="item in formData.allTask.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="btnGroup" style="margin-top:0;padding-top:0">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
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
import navList from '@/components/taskManagementNavList.vue'
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    navList,
    tableCom
  },
  data () {
    return {
      currentTab: 'taoBaoAsk',
      formData: {
        allTask: {
          value: '全部任务',
          options: [
            { label: '全部任务', value: '全部任务' },
            { label: '等待设置回家', value: '等待设置回家' },
            { label: '等待刷客回答', value: '等待刷客回答' },
            { label: '已取消', value: '已取消' },
            { label: '商家待审核', value: '商家待审核' },
            { label: '管理员待审核', value: '管理员待审核' }
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
          { name: '任务/订单编号', code: 'task1', width: '' },
          { name: '买号/商品信息', code: 'task2', width: '' },
          { name: '提问与回答', code: 'task3', width: '' },
          { name: '任务状态', code: 'task4', width: '' },
          { name: '操作按钮', code: 'task5', width: '' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.taoBaoAsk {
  width: 1150px;
  margin: 0 auto;
}
</style>
