<template>
  <div class="publicPointExchange">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="taskManagementNavList topList">
          <ul>
            <li @click="toPNavChangeTab('1')" :class="topTabCurrent=='1'? 'current' :''">存款兑换发布点</li>
          </ul>
        </div>
        <div class="tabContent">
          <p>
            <span class="left W210px">资金余额：</span>
            <span class="right">
              {{user.Money/100}} 元
              <em class="red">（存款用于支付贷款）</em>
            </span>
          </p>
          <p>
            <span class="left W210px">可用发布点：</span>
            <span class="right">
              {{user.MinLi/100}} 点
              <em class="red">（发布点用于支付佣金）</em>
            </span>
          </p>
          <p>
            <span class="left W210px">&nbsp;</span>
            <span class="right">
              将
              <el-input size="mini" v-model="pubMoney" v-bind="{style:{width:'200px',}}"></el-input>元兑换成发布点，兑换比率：1元＝1点
            </span>
          </p>
          <div class="H10"></div>
          <p style="margin-top:10px;margin-bottom:30px;">
            <span class="left W210px">&nbsp;</span>
            <el-button type="primary" class="tablebtnActive" @click="exchange('1')">提交申请</el-button>
          </p>
        </div>
        <div class="taskManagementNavList topList">
          <ul>
            <li @click="toPNavChangeTab('1')" :class="topTabCurrent=='1'? 'current' :''">兑换发布点存款</li>
          </ul>
        </div>
        <div class="tabContent">
          <p>
            <span class="left W210px">可用发布点:</span>
            <span class="right">{{user.MinLi/100}} 点</span>
          </p>
          <p>
            <span class="left W210px">资金余额：</span>
            <span class="right"> {{user.Money/100}} 元</span>
          </p>
          <p>
            <span class="left W210px">&nbsp;</span>
            <span class="right">
              将
              <el-input size="mini" v-model="pubPoint" v-bind="{style:{width:'200px',}}"></el-input>个发布点兑换成帐户存款，兑换比率：1点＝1元
            </span>
          </p>
          <div class="H10"></div>
          <p style="margin-top:10px;">
            <span class="left W210px">&nbsp;</span>
            <el-button type="primary" class="tablebtnActive" @click="exchange('2')">提交申请</el-button>
          </p>
        </div>
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
  props: {},
  data () {
    return {
      currentTab: 'publicPointExchange',
      topTabCurrent: '1',
      pubPoint: 0,
      pubMoney: 0,
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    },
    toPNavChangeTab (val) {
     // console.log(val)
      this.topTabCurrent = val
    },
    exchange (val) {
      this.$ajax.get('shopmember/exchange', {
        params: {
          token: this.$getToken(),
          type: val,
          price: val === '1' ? this.pubMoney : this.pubPoint
        }
      }).then(res => {
       // console.log('兑换点', res)
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: res.data.msg,
            type: 'success'
          })
          this.getUserInfo()
        }
      })
    },
    getUserInfo () {
      this.$ajax.get('shopmember/memberInfo').then(res => {
       // console.log('余额', res)
        if (res && res.data && res.data.code === 1) {
          this.user = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.publicPointExchange {
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
