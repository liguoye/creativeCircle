<template>
  <div class="orderMessage">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="taskManagementNavList topList">
          <ul>
            <li @click="toPNavChangeTab('1')" :class="topTabCurrent=='1'? 'current' :''">精刷单订单详情信息</li>
            <li @click="toPNavChangeTab('2')" :class="topTabCurrent=='2'? 'current' :''">日常订单详情信息</li>
          </ul>
        </div>
        <div class="tabContent">
          <order-detail-msg v-if="topTabCurrent=='1'"></order-detail-msg>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
import orderDetailMsg from './components/orderDetailMsg.vue'
export default {
  components: {
    navList,
    orderDetailMsg
  },
  props: {
  },
  data () {
    return {
      currentTab: 'orderMessage',
      topTabCurrent: '1',
      name: '',
      money: ''
    }
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    },
    toPNavChangeTab (val) {
      console.log(val)
      this.topTabCurrent = val
    }
  }
}
</script>
<style lang="less" scoped>
.orderMessage {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  .submitBtn {
    border-radius: 15px;
    margin-left: 10px;
  }
  .el-row {
    width: 100%;
  }
  .navList {
    width: 170px;
  }
  .accountManage {
    padding: 0 40px;
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .tabContent {
      margin-top: 20px;
    }
  }
}
</style>
