<template>
  <div class="header con_width">
    <div class="logo">
      <a href="#/business/index" class="router-link-exact-active router-link-active"><img src="../assets/picture/logo.png" />></a>
    </div>
    <div class="fr" style="margin-top: 29px;">
      <div class="dwoent">
        <div class="rpamet colort">
          <div class="wpet">
            <div class="roamet">
              <div class="poemt"><img src="../assets/picture/roader.png" /></div>
              <div class="poanet"></div>
            </div>
          </div>
          <div>显示任务</div>
        </div>
        <div class="wpamet">
          <div class="wpet">
            <div class="roamet">
              <!---->
              <div class="poanet"></div>
            </div>
          </div>
          <div>隐藏任务</div>
        </div>
      </div>
      574014209
      <a class="outBtn">退出</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  }
}
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
        color: #d8d8d8;
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
        color: red;
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
    }
  }
}
</style>
