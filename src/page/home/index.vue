<template>
  <div class="home">
    <div class="banner">
      <img class="banner-img" src="../../assets/picture/banner.png">
      <div class="businessBox" v-if="detail">
        <div class="con">
          <div class="H20"></div>
          <div class="con-left">
            <p>
              愉快合作第
              <span class="red">{{detail.days}}</span>天
            </p>
            <p>
              存款：
              <span class="red">{{detail.Money|percent}}</span>元
            </p>
            <p>
              发布点：
              <span class="red">{{detail.MinLi}}</span>个
            </p>
            <p>
              绑定店铺：
              <span class="red">{{detail.shop_num}}</span>个
            </p>
            <p>
              高危预警：
              <a href="#/business/premium-task/warning" class="red">{{detail.warning}}</a>个
            </p>
            <p>
              <a href="#/business/premium-task/manage?type=true" class>
                已隐藏任务数：
                <span class="red">{{detail.hide}}</span>条
              </a>
            </p>
            <p>
              <a href="#/business/member/assistant" class>
                智能助手店铺过期数：
                <span class="red">{{detail.end_shop}}</span>个
              </a>
            </p>
            <p>
              <a href="#/business/member/assistant" class>
                订单助手店铺过期数：
                <span class="red">{{detail.end_shops}}</span>个
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="businessAccount" v-if="detail">
      <div class="content">
        <el-row>
          <el-col :span="8" class="colSty">
            <div class="tabHeader">卖家转账</div>
            <div class="tabContent">
              <el-row>
                <el-col :span="12">
                  <a
                    href="#/business/funds/transfer/pending"
                    class="woent_a"
                    style="padding-left: 20px; display: block;"
                  >
                    <div class="qoanet">等待转账</div>
                    <div class style="font-size: 21px; font-weight: 900;">{{detail.order.order_one}}</div>
                  </a>
                </el-col>
                <el-col :span="12">
                  <a
                    href="#/business/funds/transfer/pending"
                    class="woent_a"
                    style="padding-left: 20px; display: block;"
                  >
                    <div class="qoanet">超时未转账</div>
                    <div class style="font-size: 21px; font-weight: 900;">{{detail.order.order_two}}</div>
                  </a>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <a
                    href="#/business/funds/transfer/pending"
                    class="woent_a"
                    style="padding-left: 20px; display: block;"
                  >
                    <div class="qoanet">等待上传凭证</div>
                    <div class style="font-size: 21px; font-weight: 900;">{{detail.order.order_thr}}</div>
                  </a>
                </el-col>
                <el-col :span="12">
                  <a
                    href="#/business/funds/transfer/pending"
                    class="woent_a"
                    style="padding-left: 20px; display: block;"
                  >
                    <div class="qoanet">超时未上传凭证</div>
                    <div class style="font-size: 21px; font-weight: 900;">{{detail.order.order_fou}}</div>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8" class="colSty">
            <div class="tabHeader">订单标记</div>
            <div class="tabContent">
              <el-row>
                <el-col :span="12">
                  <a
                    href="#/business/funds/transfer/pending"
                    class="woent_a"
                    style="padding-left: 20px; display: block;"
                  >
                    <div class="qoanet">未标记</div>
                    <div class style="font-size: 21px; font-weight: 900;">{{detail.biaoji}}</div>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8" class="colSty">
            <div class="tabHeader">公告</div>
            <div class="tabContent">
              <el-row>
                <el-col :span="8">
                  <a href="#/business/member/notice" style="text-align: center;">
                    <div
                      class="wcpwoet"
                      style="width: 75px; height: 64px; background-color: rgb(241, 245, 255); border-radius: 100%; padding-top: 11px; display: block; margin: 0px auto;"
                    >
                      <img src="../../assets/picture/iconett_6.png">
                    </div>
                    <div class="qoanet" style="margin-top: 5px;">平台公告</div>
                  </a>
                </el-col>
                <el-col :span="8">
                  <a href="#/business/member/notice" style="text-align: center;">
                    <div
                      class="wcpwoet"
                      style="width: 75px; height: 64px; background-color: rgb(241, 245, 255); border-radius: 100%; padding-top: 11px; display: block; margin: 0px auto;"
                    >
                      <img src="../../assets/picture/iconett_1.png">
                    </div>
                    <div class="qoanet" style="margin-top: 5px;">收费标准</div>
                  </a>
                </el-col>
                <el-col :span="8">
                  <a href="#/business/member/notice" style="text-align: center;">
                    <div
                      class="wcpwoet"
                      style="width: 75px; height: 64px; background-color: rgb(241, 245, 255); border-radius: 100%; padding-top: 11px; display: block; margin: 0px auto;"
                    >
                      <img src="../../assets/picture/iconett_4.png">
                    </div>
                    <div class="qoanet" style="margin-top: 5px;">新手教程</div>
                    
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      detail: null
    };
  },
  created() {
    this.getHome();
    console.log(this.getdata)
  },
  computed: {...mapGetters(['getdata'])},
  methods: {
    getHome() {
      this.$ajax.get("/shopmember/index").then(res => {
        if (res && res.data && res.data.code == 1) {
          this.detail = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.home {
  .banner {
    height: 460px;
    // background-image: url('../../assets/picture/banner.png');
    // background-repeat: no-repeat;
    position: relative;
    .banner-img {
      position: absolute;
      top: 0;
      width: 100%;
      height: auto;
      left: 0;
    }
    .businessBox {
      width: 348px;
      height: 348px;
      position: absolute;
      right: 230px;
      top: 45%;
      margin-top: -200px;
      background: hsla(0, 0%, 100%, 0.3);
      border: 1px solid #fff;
      border-radius: 10px;
      height: 327px;
      .con {
        border-radius: 10px;
        background: #fff;
        width: 310px;
        height: 288px;
        margin: 10px;
        padding: 10px;
        p {
          margin: 0;
          margin-left: 40px;
          line-height: 50px;
          padding: 0;
          font-size: 15px;
          line-height: 35px !important;
          .red {
            color: #f33 !important;
            padding-right: 5px;
          }
          a {
            background: transparent;
            text-decoration: none;
            color: #333;
            user-select: none;
            cursor: pointer;
          }
        }
      }
    }
  }
  .businessAccount {
    height: 330px;
    width: 100%;
    position: relative;
    .content {
      position: relative;
      width: 1360px;
      box-sizing: border-box;
      margin: 0 auto;
      margin-top: -66px;
      z-index: 11000;
      background-color: #fff;
      color: red;
      box-shadow: 0 5px 5px #ebebec;
      border-top: 5px solid #0099e5;
      padding: 50px 70px 70px 70px;
      .colSty {
        border: 1px solid #dfe6ec;
        overflow: hidden;
        height: 194px;
        border-radius: 4px;
      }
      .colSty:not(:last-child) {
        margin-right: 30px;
        width: calc(33% - 30px);
      }
      .tabHeader {
        font-size: 16px;
        line-height: 32px;
        padding-left: 10px;
        border-bottom: 1px solid rgb(223, 230, 236);
        margin-bottom: 18px;
        color: #333;
      }
      .tabContent {
        a {
          padding-left: 20px;
          display: block;
          user-select: none;
          text-decoration: none;
          color: #333;
          cursor: pointer;
          div {
            position: relative;
            z-index: 0;
            img {
              position: relative;
              z-index: 1110;
              width: 30px;
              height: 30px;
              margin: 11px auto;
              display: block;
            }
          }
          &:hover div {
            // background-color: #0099e5 !important;
            color: #0099e5 !important;
          }
          .qoanet {
            color: #a3a7ab;
          }
        }
      }
    }
  }
}
</style>
