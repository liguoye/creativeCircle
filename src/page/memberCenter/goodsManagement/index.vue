<template>
  <div class="goodsManagement">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
export default {
  components: {
    navList
  },
  props: {
  },
  data () {
    return {
      currentTab: 'goodsManagement'
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
.goodsManagement {
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
      p {
        font-size: 13px;
        line-height: 30px;
        span:first-child {
          display: inline-block;
          width: 210px;
          text-align: right;
        }
      }
    }
  }
}
</style>
