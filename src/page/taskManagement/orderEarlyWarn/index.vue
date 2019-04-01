<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="orderEarlyWarn">
      <div class="tips">
        <div class="tip-text">
          <p>
            <span class="red">高危预警单处理说明：</span>
          </p>
          <p>1、疑似真包，商家根据淘宝订单号查看该笔订单是否已经发送真实物流，切记该笔订单为刷单，处理发真包情况，把平台空包运单号回填到淘宝中，然后处理完点击平台处理操作;</p>
          <p>2、运单号反馈失败.出现这种情况是由于平台和淘宝对接回填物流失败，商家务必将物流单号填写到淘宝平台，点击平台进行处理完成；</p>
        </div>
      </div>

      <div class="btnGroup">
        <el-row>
          <el-col :span="19" class="formGroup" style="text-align:left !important">
            <span>任务编号:</span>
            <el-input v-model="formData.taskNum" placeholder="请输入内容"></el-input>
            <span>订单编号:</span>
            <el-input v-model="formData.orderNum" placeholder="请输入内容"></el-input>
            <span>转账截止时间:</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5" style="line-height:40px">
            <el-button class="tablebtnActive">查询</el-button>
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
      currentTab: 'orderEarlyWarn',
      formData: {
        taskNum: '',
        orderNum: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务编号', code: 'task1', width: '' },
          { name: '任务编号', code: 'task2', width: '' },
          { name: '运单号', code: 'task3', width: '' },
          { name: '高危类型', code: 'task4', width: '' },
          { name: '店铺名称', code: 'task5', width: '' },
          { name: '处理状态', code: 'task6', width: '' },
          { name: '操作', code: 'task7', width: '' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.orderEarlyWarn {
  width: 1150px;
  margin: 0 auto;
  .tips {
    border: 1px solid #ccebfa;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 20px 0;
    background-color: #fff;
    .tip-text {
      flex-grow: 1;
      p {
        .red {
          color: #f33 !important;
        }
      }
    }
  }
}
</style>
