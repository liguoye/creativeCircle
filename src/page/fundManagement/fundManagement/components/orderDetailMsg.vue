<template>
  <div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="20" class="formGroup" style="text-align:left !important;">
            <span>统计时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <span>类型</span>
            <el-select v-model="formData.taskClass.value" placeholder="请选择">
              <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>任务编号</span>
            <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4" style="line-height:40px;">
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
            { label: '发布任务', value: '发布任务' },
            { label: '取消任务', value: '取消任务' },
            { label: '充值', value: '充值' },
            { label: '购买流量', value: '购买流量' },
            { label: '多退少补', value: '多退少补' },
            { label: '任务处罚', value: '任务处罚' },
            { label: '财务增', value: '财务增' }
          ]
        },
        keyWord: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '消费ID', code: 'task1', width: '' },
          { name: '类型', code: 'task2', width: '' },
          { name: '消费存款', code: 'task3', width: '' },
          { name: '消费发布点', code: 'task4', width: '' },
          { name: '原存款', code: 'task5', width: '' },
          { name: '原发布点', code: 'task6', width: '' },
          { name: '剩余存款', code: 'task7', width: '' },
          { name: '剩余发布点', code: 'task8', width: '' },
          { name: '备注', code: 'task9', width: '' },
          { name: '消费时间', code: 'task10', width: '' }
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
