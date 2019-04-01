<template>
  <div class="taskManagementNavList">
    <ul>
      <li @click="navListClick('publicFineBrushes')" :class="currentTab=='publicFineBrushes'? 'current' :''">发布精刷单</li>
      <li @click="navListClick('managementFineBrushes')" :class="currentTab=='managementFineBrushes'? 'current' :''">管理精刷单</li>
      <li @click="navListClick('orderEarlyWarn')" :class="currentTab=='orderEarlyWarn'? 'current' :''">订单预警
        <span>(0)</span>
      </li>
      <li @click="navListClick('evaluationManagement')" :class="currentTab=='evaluationManagement'? 'current' :''">评价管理</li>
      <li @click="navListClick('taoBaoAsk')" :class="currentTab=='taoBaoAsk'? 'current' :''">淘宝问大家
        <span>(0)</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    currentTab: {
      type: String,
      default () {
        return 'publicFineBrushes'
      }
    }
  },
  data () {
    return {
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
</style>
