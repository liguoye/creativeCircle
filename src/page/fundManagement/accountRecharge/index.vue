<template>
  <div class="accountRecharge">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <el-row>
          <el-col :span="14" class="accountManageLeft">
            <p>
              <span class="left">账户余额：</span>
              <span class="right">
                <em class="red">{{user.Money/100}}</em>元</span>
            </p>
            <p>
              <span class="left">充值方式：</span>
              <span class="right">
                <em class="red">支付宝APP</em>转账充值，电脑转账不会自动充值，请务必使用支付宝APP充值</span>
            </p>
            <p>
              <span class="left">支付宝账号：</span>
              <span class="right">{{user.alipay}}</span>
            </p>
            <p>
              <span class="left">开户人：</span>
              <span class="right">{{user.alipay_name}}</span>
            </p>
            <p>
              <span class="left">支付宝昵称：</span>

              <span class="right" style="display:inline-block;width:200px;">
                <el-input placeholder="请输入支付宝昵称" v-model="alipay" clearable size="mini">
                </el-input>
              </span>
              <el-button type="primary" size="mini" class="submitBtn" :disabled="!alipay" @click="saveAlipay">保存修改</el-button>
            </p>
            <p>
              <span class="left red">特别提醒：</span>
              <span class="right">支付宝昵称不是
                <em class="red">支付宝账号！</em>请参照下图查看支付宝昵称</span>
            </p>
            <p>
              <span class="left">充值金额：</span>

              <span class="right" style="display:inline-block;width:200px;">
                <el-input-number size="mini" v-model="price"></el-input-number>
              </span>
            </p>

            <p style="margin-top:15px">
              <el-button type="primary" size="mini" style="margin-left:120px;margin-bottom:40px;" class="submitBtn" @click="submitConfirm"
                :disabled="!price||!alipay">确认提交</el-button>
            </p>
          </el-col>
          <el-col :span="10" class="accountManageRight">
            <div class="tieshi">
              <div class="titleNotice">
                <span class="left"></span>
                <em>转账小贴士</em>
                <span class="right"></span>
              </div>
              <div class="con">
                <p class="info" style="color: rgb(0, 153, 229);">温馨提示：</p>
                <p class="red">
                  充值金额超过500，建议银行卡转账。支付宝昵称备注转出卡的户名。
                </p>
                <p class="red">
                  <span class="left">银行户名：</span>
                  <span class="right">曾欣宜</span>
                </p>
                <p class="red">
                  <span class="left">银行卡号：</span>
                  <span class="right red">6217923602278128</span>
                </p>
                <p class="red">
                  <span class="left">开户所在银行：</span>
                  <span class="right">浦发银行福建晋江支行</span>
                </p>
                <p class="info" style="color: rgb(0, 153, 229);">操作步骤：</p>
                <p class="red">
                  支付昵称位置填写银行卡户名,填写完金额生成充值ID然后通过银行卡转账即可,财务收到信息会立即确认到账。
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="accountDetail">
          <p>支付宝昵称设置说明：</p>
          <p>1、只有支付宝APP端才能查看和设置支付宝昵称；</p>
          <p>2、前往
            <span class="red">【支付宝APP--我的--查看个人主页--管理--昵称】</span>处进行设置/查看。</p>
          <p>3、务必正确设置支付宝昵称后再进行充值，否则不会自动到账。</p>
          <img src="../../../assets/picture/ex01.png">
        </div>
        <div class="accountDetail">
          <p>充值方法：</p>
          <p class="ML20">第一步：输入支付宝昵称；</p>
          <p class="ML20">第二步：输入充值金额；
            <span class="red">充值金额必须是100元的整数倍，否则无法充值到账）</span>
          </p>
          <p class="ML20">第三步：点击确认提交（跳出8位充值订单ID）；</p>
          <p class="ML20">第四步：在支付宝中输入充值金额和充值订单ID (8位数字)，支付成功30秒内自动充值到账。</p>
          <p>
            <span class="red">特别提醒： </span>转账备注务必正确填写，否则无法自动充值到账。如果备注填写错误或者忘记填写，请联系平台管理员手动充值，联系QQ：84394322。</p>
          <p>支付宝转账操作演示：</p>
          <img src="../../../assets/picture/ex02.png">
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
  props: {
  },
  data () {
    return {
      currentTab: 'accountRecharge',
      alipay: '',
      price: '',
      user: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    },
    saveAlipay () {
      this.$ajax.get('ShopMember/upd', {
        params: {
          token: this.$getToken(),
          alipay: this.alipay
          // weixin: '',
          // qq: ''
        }
      }).then(res => {
      //  console.log('zhifubao', res)
        if (res && res.data && res.data.code === 1) {
          this.getUser()
          this.$notify({
            title: '支付宝号修改保存成功',
            type: 'success'
          })
        }
      })
    },
    getUser () {
      this.$ajax.get('shopmember/index').then(res => {
       // console.log('yonghuxinxi', res)
        if (res && res.data && res.data.code === 1) {
          this.user = res.data.data
        }
      })
    },
    submitConfirm () {
      this.$ajax.get('shopmember/alipay', {
        params: {
          token: this.$getToken(),
          alipay: this.alipay,
          price: this.price
        }
      }).then(res => {
       // console.log('tijiaoprice', res)
        if (res && res.data && res.data.code === 1) {
             this.$notify({
            title: '提交成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.accountRecharge {
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
    width: calc(100% - 210px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .accountManageLeft {
      p {
        line-height: 30px;
        .red {
          color: red;
        }
        .left {
          text-align: right;
          padding-right: 5px;
          display: inline-block;
          width: 90px;
          font-size: 13px;
        }
        em {
          font-style: normal;
        }
      }
    }
    .accountManageRight {
      .tieshi {
        position: relative;
        width: 470px;
        height: 250px;
        background: #ccebfa;
        border-radius: 10px;
        right: 0px;
        top: 0px;
        padding: 10px;
        .titleNotice {
          position: absolute;
          left: 145px;
          top: -13px;
          z-index: 5;
          .left {
            width: 0;
            height: 0;
            border-bottom: 12px solid #0099e5;
            border-left: 12px solid transparent;
            position: absolute;
            left: -10px;
            top: 1px;
          }
          em {
            display: inline-block;
            width: 180px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 18px;
            color: #fff;
            border-radius: 5px;
            background: #0099e5;
          }
          .right {
            width: 0;
            height: 0;
            border-bottom: 12px solid #0099e5;
            border-right: 12px solid transparent;
            position: absolute;
            left: 178px;
            top: 1px;
          }
        }
        .con {
          font-size: 14px;
          border-radius: 10px;
          background: #fff;
          height: 250px;
          position: relative;
          .info {
            color: rgb(0, 153, 229);
            padding-top: 10px;
          }
          p {
            line-height: 25px;
            padding: 0 10px;
            &:first-child {
              padding-top: 20px;
            }
          }
          .red {
            color: red;
          }
        }
      }
    }
    .accountDetail {
      padding: 10px 0;
      border-top: 1px solid #ccebfa;
      p {
        line-height: 30px;
        font-size: 13px;
        .red {
          color: red;
        }
      }
    }
  }
}
</style>
