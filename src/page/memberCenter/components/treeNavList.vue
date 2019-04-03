<template>
  <div class="navList">
    <ul>
      <li class="title">
        <i class="el-icon-star-off"></i>会员中心</li>
      <li @click="navListClick('basicData')" :class="currentTab=='basicData'? 'current' :''">基本资料</li>
      <li @click="navListClick('cuteHand')" :class="currentTab=='cuteHand'? 'current' :''">智能助手</li>
      <li @click="navListClick('shopManagement')" :class="currentTab=='shopManagement'? 'current' :''">店铺管理</li>
      <li @click="navListClick('goodsManagement')" :class="currentTab=='goodsManagement'? 'current' :''">商品管理</li>
      <li @click="navListClick('inviteHaoyu')" :class="currentTab=='inviteHaoyu'? 'current' :''">邀请好友 </li>
      <li @click="navListClick('platformNotice')" :class="currentTab=='platformNotice'? 'current' :''">平台公告 </li>
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
