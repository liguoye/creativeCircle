<template>
  <div class="header con_width">
    <div class="logo">
      <a
        href="#/business/index"
        class="router-link-exact-active router-link-active"
      ><img src="../assets/picture/logo.png" /></a>
    </div>
    <div
      class="fr"
      style="margin-top: 29px;"
    >
      <div class="dwoent" >
        <div class="rpamet colort" @click="click('1')">
          <div class="wpet">
            <div class="roamet">
              <div class="poemt" v-if="activeIndex=='1'"><img src="../assets/picture/roader.png" /></div>
              <div class="poanet"></div>
            </div>
          </div>
          <div >显示任务</div>
        </div>
        <div class="wpamet"  @click="click('2')">
          <div class="wpet">
            <div class="roamet">
              <!---->
              <div class="poemt" v-if="activeIndex=='2'"><img src="../assets/picture/roader.png" /></div>
              <div class="poanet"></div>
            </div>
          </div>
          <div  >隐藏任务</div>
        </div>
      </div>
      <span>欢迎您，{{username}}</span>
      <span
        class="outBtn"
        @click="loginOut"
      >退出</span>
    </div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
export default {
  data() {
    return {
      activeIndex: "1",
      username:''
    };
  },
  created(){
      let username=cookie.get('username')||''
      this.username=username
  },
  methods: {
      click(index){
          this.activeIndex=index
      },
    loginOut() {
      this.$ajax.post("member/loginOut").then(res => {
        if (res && res.data && res.data.code === 1) {
           cookie.remove('logined');
           location.href='/'
        }
      });
    }
  }
};
</script>
<style  lang="less">
.header {
  width: 1200px;
  margin: 0 auto;
  height: 80px;
  position: relative;
  .logo {
    position: absolute;
    left: 0;
    top: 12px;
    height: 55px;
    a {
      background: transparent;
      text-decoration: none;
      color: #333;
      user-select: none;
      cursor: pointer;
      img {
        width: 389px;
        height: 62px;
      }
    }
  }
  .fr {
    float: right;
    margin-top: 29px;
    .dwoent {
      float: left;
      overflow: hidden;
      width: 220px;
      font-size: 18px;
      .rpamet {
        float: left;
        width: 110px;
        cursor: pointer;
        // color: #d8d8d8;
      }
      .wpamet {
        cursor: pointer;
        color: #d8d8d8;
        .wpet {
          float: left;
          margin-right: 4px;
          .roamet {
            width: 24px;
            height: 24px;
            line-height: 24px;
            .poanet {
              width: 18px;
              height: 18px;
              border-radius: 100%;
              border: 1px solid #d8d8d8;
              color: #d8d8d8;
              margin: 4px auto;
            }
          }
        }
      }
      .colort {
        // color: red;
        .wpet {
          float: left;
          margin-right: 4px;
          .roamet {
            width: 24px;
            height: 24px;
            line-height: 24px;
            .poanet {
              width: 18px;
              height: 18px;
              border-radius: 100%;
              border: 1px solid #d8d8d8;
              color: #d8d8d8;
              margin: 4px auto;
            }
          }
        }
      }
    }
    .outBtn {
      background: #0099e5;
      color: #fff;
      border-radius: 3px;
      width: 48px;
      text-align: center;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>
