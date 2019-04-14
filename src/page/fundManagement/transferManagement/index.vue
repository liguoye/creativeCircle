<template>
  <div class="transferManagement">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="taskManagementNavList topList">
          <ul>
            <li @click="toPNavChangeTab('1')" :class="topTabCurrent=='1'? 'current' :''">等待转账</li>
            <li @click="toPNavChangeTab('2')" :class="topTabCurrent=='2'? 'current' :''">转账结果</li>
            <li @click="toPNavChangeTab('3')" :class="topTabCurrent=='3'? 'current' :''">未到账反馈 </li>
            <li @click="toPNavChangeTab('4')" :class="topTabCurrent=='4'? 'current' :''">买家已退款</li>
          </ul>
        </div>
        <div class="tabContent">
          <buyer-refun v-if="topTabCurrent=='4'"></buyer-refun>
          <outstanding-account v-if="topTabCurrent=='3'"></outstanding-account>
          <transfer-result v-if="topTabCurrent=='2'"></transfer-result>
          <wait-transfer-account v-if="topTabCurrent=='1'"></wait-transfer-account>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
import buyerRefun from './components/buyerRefun.vue'
import outstandingAccount from './components/outstandingAccount.vue'
import transferResult from './components/transferResult.vue'
import waitTransferAccount from './components/waitTransferAccount.vue'
export default {
  components: {
    navList,
    buyerRefun,
    outstandingAccount,
    transferResult,
    waitTransferAccount
  },
  props: {
  },
  data () {
    return {
      currentTab: 'transferManagement',
      topTabCurrent: '1',
      name: '',
      money: '',
      bankList:[],
      user:{}
    }
  },
  created(){
    //   this.getUserInfo()
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    },
    toPNavChangeTab (val) {
      console.log(val)
      this.topTabCurrent = val
    },
    
  }
}
</script>
<style lang="less" scoped>
.transferManagement {
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
