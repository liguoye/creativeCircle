<template>
  <div class="fundManagement">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="taskManagementNavList topList">
          <ul>
            <li @click="toPNavChangeTab('1')" :class="topTabCurrent=='1'? 'current' :''">收支流水明细</li>
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
      currentTab: 'fundManagement',
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
.fundManagement {
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
