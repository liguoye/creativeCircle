<template>
  <div class="firstStep">
    <el-row>
      <el-col :span="8">
        <div class="title">
          <el-radio v-model="radio" label="1">精刷单</el-radio>
        </div>
        <div class="content">
          <p class="detail">特点</p>
          <p class="detail"> 安全：兼职真实买家，一人一号，永不复购高权重：实名主号，三心以上可对目标客户进行定位</p>
          <p class="detail">智能化：自动标记、发货、对账
            <span class="red">（必须开通智能助手）</span>
          </p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title">
          <el-radio v-model="radio" label="2">指定推送任务</el-radio>
        </div>
        <div class="content">
          <p class="detail">特点</p>
          <p class="detail">个性化下单路径：指定收藏用户下单、指定加购用户下单</p>
          <p class="detail">全面性：包含精刷单的所有特点</p>
          <p class="detail">智能化：自动标记、发货、对账
            <span class="red">（必须开通智能助手）</span>
          </p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title">
          <el-radio v-model="radio" label="3">复购任务</el-radio>
        </div>
        <div class="content">
          <p class="detail">特点</p>
          <p class="detail">个性化下单路径：指定用户复购</p>
          <p class="detail">全面性：包含精刷单的所有特点</p>
          <p class="detail">智能化：自动标记、发货、对账
            <span class="red">（必须开通智能助手）</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <btn-group :btn-active="btnActive" @btnClick="btnClick" :show-back-btn="false"></btn-group>
  </div>
</template>
<script>
import btnGroup from './components/btnGroup.vue'
export default {
  components: {
    btnGroup
  },
  data () {
    return {
      radio: '1',
      btnActive: 2
    }
  },
  methods: {
    btnClick (val) {
      if (val === 'back') {
        return ''
      } else {
        this.$emit('changeState', { state: 'secondStep', radio: this.radio })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.firstStep {
  margin-top: 20px;
  .el-col {
    border: 1px solid #beeced;
    height: 227px;
    background: #fff;
    &:not(:last-child) {
      margin-right: 10px;
      width: calc(33.3% - 10px);
    }
  }
  .title {
    border-bottom: 2px solid #beeced;
    line-height: 43px;
    text-align: center;
    font-size: 16px;
    color: #3cc;
  }
  .content {
    margin-top: 10px;
    .detail {
      margin: 0 50px;
      font-size: 14px;
      line-height: 25px;
      .red {
        color: #f33 !important;
      }
    }
  }
}
</style>
