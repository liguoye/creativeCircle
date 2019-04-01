<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="publicFineBrushes">
      <div class="navListShow">
        <ul>
          <li :class="orderProgressState=='firstStep'? 'current' :''">第一步：任务选择类型</li>
          <li :class="orderProgressState=='secondStep'? 'current' :''">第二步：来路设置</li>
          <li :class="orderProgressState=='thirdStep'? 'current' :''">第三步：价格和发布时间</li>
          <li :class="orderProgressState=='fourStep'? 'current' :''">第四步：快递和备注</li>
        </ul>
      </div>
      <div class="stateContent">
        <first-step v-if="orderProgressState=='firstStep'" @changeState="changeState"></first-step>
        <second-step v-if="orderProgressState=='secondStep'" @changeState="changeState"></second-step>
        <third-step v-if="orderProgressState=='thirdStep'" @changeState="changeState"></third-step>
        <four-step v-if="orderProgressState=='fourStep'" @changeState="changeState"></four-step>
      </div>
    </div>
  </div>
</template>
<script>
import navList from '@/components/taskManagementNavList.vue'
import firstStep from './firstStep.vue'
import secondStep from './secondStep.vue'
import thirdStep from './thirdStep.vue'
import fourStep from './fourStep.vue'
export default {
  components: {
    navList,
    firstStep,
    secondStep,
    thirdStep,
    fourStep
  },
  data () {
    return {
      currentTab: 'publicFineBrushes',
      orderProgressState: 'firstStep'
    }
  },
  methods: {
    changeState (val) {
      this.orderProgressState = val.state
    }
  }
}
</script>
<style lang="less" scoped>
.taskManagement {
  .publicFineBrushes {
    width: 1150px;
    margin: 0 auto;
    .navListShow {
      margin-top: 20px;
      ul {
        width: 100%;
        font-size: 0;
        li {
          font-size: 15px;
          display: inline-block;
          width: 25%;
          box-sizing: border-box;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border: 1px solid #3cc;
          border-right: 0;
          &:last-child {
            border-right: 1px solid #3cc;
          }
        }
        .current {
          background: #3cc !important;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
