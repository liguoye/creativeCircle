<template>
  <div class="navList">
    <ul>
      <li class="title">
        <i class="el-icon-news"></i>资金管理</li>
      <li @click="navListClick('accountRecharge')" :class="currentTab=='accountRecharge'? 'current' :''">账号充值</li>
      <li @click="navListClick('transferManagement')" :class="currentTab=='transferManagement'? 'current' :''">转账管理</li>
      <li @click="navListClick('publicPointExchange')" :class="currentTab=='publicPointExchange'? 'current' :''">发布点兑换</li>
      <li @click="navListClick('fundManagement')" :class="currentTab=='fundManagement'? 'current' :''">资金管理</li>
      <li @click="navListClick('orderMessage')" :class="currentTab=='orderMessage'? 'current' :''">订单信息 </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    currentTab: {
      type: String,
      default () {
        return 'accountRecharge'
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
.navList {
  width: 170px;
  ul {
    li {
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      list-style: none;
      text-decoration: none;
      &:not(:first-child):hover {
        color: #fff;
        background: #0099e5;
      }
    }
    .current {
      color: #fff;
      background: #0099e5;
    }
    .title {
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      color: #000;
      i {
        padding-right: 3px;
      }
    }
  }
}
</style>
