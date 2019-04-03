<template>
  <div class="basicData">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <el-row>
          <el-col :span="14" class="accountManageLeft">
            <p><span class="left">姓名：</span> <span class="right">羽马</span></p>
            <p><span class="left">会员名：</span> <span class="right">574014209</span></p>
            <p><span class="left">总资产：</span> <span class="right">0（存款＋发布点）</span></p>
            <p><span class="left">登录密码：</span> <span class="right">已设置</span>
              <el-button class="btn" type="primary" size="mini" @click="btnClick()">修改</el-button>
            </p>
            <p><span class="left">支付密码：</span> <span class="right">已设置</span>
              <el-button class="btn" type="primary" size="mini" @click="btnClick()">修改</el-button>
            </p>
            <p><span class="left">QQ：</span> <span class="right">574014209</span>
              <el-button class="btn" type="primary" size="mini" @click="btnClick()">修改</el-button>
            </p>
            <p><span class="left">微信：</span> <span class="right">未绑定</span>
              <el-button class="btn" type="primary" size="mini" @click="btnClick()">设置</el-button>
            </p>
          </el-col>
          <el-col :span="10" class="accountManageRight">
            <div class="memberAccount">
              <div class="con">
                <p>帐户存款第：<span class="red">541</span> 天</p>
                <p>帐户存款：<span class="red">0</span> 元</p>
                <p>账户发布点：<span class="red">0</span> 个</p>
                <p>绑定店铺：<span class="red">2</span> 个</p>
                <p>高危预警：<a href="#/business/premium-task/warning" class="red">0</a>
                  个</p>
              </div>
            </div>
          </el-col>
        </el-row>
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
      currentTab: 'basicData'
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
.basicData {
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
    padding-bottom: 50px;
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .accountManageLeft {
      p {
        line-height: 45px;
        font-size: 12px;
        .btn {
          color: #fff;
          text-align: center;
          border-radius: 25px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .right {
          display: inline-block;
          width: 270px;
        }
        .left {
          display: inline-block;
          width: 145px;
          text-align: right;
        }
      }
    }
    .accountManageRight {
      .memberAccount {
        position: absolute;
        right: 135px;
        top: 0;
        background: #ccebfa;
        border-radius: 8px;
        width: 265px;
        .con {
          background: #fff;
          margin: 10px;
          border-radius: 8px;
          padding: 15px 0;
          line-height: 40px;
          padding-left: 30px;
          font-size: 12px;
          p {
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
