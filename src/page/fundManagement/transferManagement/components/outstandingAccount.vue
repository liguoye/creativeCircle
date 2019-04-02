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
          { name: '提现人', code: 'task3', width: '' },
          { name: '银行卡号', code: 'task4', width: '' },
          { name: '开户行', code: 'task5', width: '' },
          { name: '支行名称', code: 'task6', width: '' },
          { name: '转账状态', code: 'task7', width: '' },
          { name: '转账截止时间', code: 'task8', width: '' },
          { name: '操作按钮', code: 'task9', width: '' }
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
