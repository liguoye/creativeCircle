<template>
  <div class="navBar">
    <div class="navList">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgba(31, 45, 70, 0.7)"
        text-color="#fff" active-text-color="#0099e5">
        <el-menu-item v-if="!item.hasChild" v-for="(item) in navListData" :key="item.name+item.code" :index="item.code">{{item.name}}</el-menu-item>
        <el-submenu v-else :index="item.code">
          <template slot="title">{{item.name}}</template>
          <el-menu-item v-for="(list) in item.children" :index="list.code" :key="list.name+list.code">{{list.name}}</el-menu-item>
        </el-submenu>
      </el-menu>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 'home',
      navListData: [
        { name: '首页', code: 'home', children: [], hasChild: false },
        { name: '精刷任务管理',
          code: 'taskManagement',
          hasChild: true,
          children: [
            { name: '发布精刷单', code: 'publicFineBrushes', children: [] },
            { name: '管理精刷单', code: 'managementFineBrushes', children: [] },
            { name: '订单预警', code: 'orderEarlyWarn', children: [] },
            { name: '评价管理', code: 'evaluationManagement', children: [] },
            { name: '淘宝问大家', code: 'taoBaoAsk', children: [] }
          ]
        },
        { name: '淘宝APP点击',
          code: 'taoBaoAPP',
          hasChild: true,
          children: [
            { name: '发布流量任务', code: 'pubilcFlowTask', children: [] },
            { name: '流量任务管理', code: 'flowTaskManagement', children: [] }
          ]
        },
        { name: '资金管理',
          code: 'fundManagement',
          hasChild: true,
          children: [
            { name: '账号充值', code: 'accountRecharge', children: [] },
            { name: '转账管理', code: 'transferManagement', children: [] },
            { name: '发布点兑换', code: 'publicPointExchange', children: [] },
            { name: '资金管理', code: 'fundManagement', children: [] },
            { name: '订单信息', code: 'orderMessage', children: [] }
          ]
        },
        { name: '会员中心',
          code: 'memberCenter',
          hasChild: true,
          children: [
            { name: '基本资料', code: 'basicData', children: [] },
            { name: '智能助手', code: 'cuteHand', children: [] },
            { name: '店铺管理', code: 'shopManagement', children: [] },
            { name: '商品管理', code: 'goodsManagement', children: [] },
            { name: '邀请好友', code: 'inviteHaoyu', children: [] },
            { name: '平台公告', code: 'platformNotice', children: [] }
          ]
        },
        { name: '客服工单', code: 'customerWorkOrder', children: [], hasChild: false }
      ]

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({ name: key, param: { tab: key } })
    }
  }
}
</script>
<style  lang="less">
body {
  margin: 0;
  line-height: 1.5;
  color: #333;
  font-size: 12px;
  padding: 0;
  height: 100%;
}

div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  padding: 0;
  margin: 0;
}

.viewport {
  width: 100%;
}
.navBar {
  width: 100%;
  height: 55px !important;
  background: #243653;
  .navList {
    width: 1360px;
    height: 55px !important;
    margin: 0 auto;
    background-color: #243653 !important;

    .el-menu--horizontal {
      border-bottom: 2px solid rgba(31, 45, 70, 0.7) !important;
    }
    .el-menu-demo {
      margin: 0 auto;
      padding-left: 160px;
      height: 53px !important;
      .el-menu-item {
        height: 54px;
        width: 170px;
        text-align: center;
        font-size: 14px;
        border-bottom-width: 3px;
        border-bottom-color: #243653 !important;
        &:hover {
          color: #0099e5 !important;
          border-bottom-color: #0099e5 !important;
          background-color: #243653 !important;
        }
      }
      .el-menu--horizontal {
        border-bottom: 2px solid rgba(31, 45, 70, 0.7) !important;
      }
      .is-active,
      .is-active > .el-submenu__title {
        border-bottom-width: 3px;
        border-bottom-color: #0099e5 !important;
      }
      .el-submenu__title {
        width: 170px;
        border-bottom-width: 3px;
        text-align: center;
        height: 54px;
        &:hover {
          color: #0099e5 !important;
          border-bottom-color: #0099e5 !important;
          background-color: #243653 !important;
        }
      }
    }
  }
}
.el-menu--horizontal {
  // background: rgba(31, 45, 70, 0.7);
  .el-menu {
    background: rgba(31, 45, 70, 0.7);
    // margin-top: 0;
    .el-menu-item {
      background: transparent !important;
      margin: 0;
      // width: 170px;
      color: #fff !important;
      &:hover {
        background: hsla(0, 0%, 100%, 0.7) !important;
        color: red;
      }
    }
  }
}
</style>
