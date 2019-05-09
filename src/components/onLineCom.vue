<template>
  <div class="service-control">
    <div
      class="service-bar"
      @click="barClick"
    ><a :class="barOpen ? 'service-bar-opening' : 'service-bar-closed'"></a></div>
    <div :class="barOpen ? 'service-box opening' : 'service-box closed'">
      <div class="service-container">
        <h3>客服列表</h3>
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
          ><span>商家顾问</span> <a
              target="_blank"
              :href="'http://wpa.qq.com/msgrd?v=3&uin='+item+'&site=qq&menu=yes'"
            ><img src="../assets/picture/button_111.jpg"></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barOpen: false,
      list: []
    };
  },
  created() {
    this.getHome();
  },
  methods: {
    barClick() {
     // console.log(111111111);
      if (this.barOpen) {
        this.barOpen = false;
      } else {
        this.barOpen = true;
      }
    },
    getHome() {
      this.$ajax.get("login/qq").then(res => {
        if (res && res.data && res.data.code == 1) {
         // console.log(res.data.data);
          this.list = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.service-control {
  background: rgba(51, 51, 51, 0.9);
  position: fixed;
  top: 70%;
  right: 0;
  z-index: 999999;
  .service-bar {
    width: 38px;
    float: left;
    position: relative;
    z-index: 1;
    a {
      position: relative;
      z-index: 9;
      top: 0;
      left: 0;
      background-image: url("../assets/picture/qqBack.png");
      background-repeat: no-repeat;
      display: block;
      width: 20px;
      height: 146px;
      padding: 8px;
      user-select: none;
      cursor: pointer;
    }
    .service-bar-closed {
      background-position: -2px 0;
    }
    .service-bar-opening {
      background-position: -40px 0;
    }
  }
  .service-box {
    overflow: hidden;
    transition: 218ms;
    h3 {
      font-size: 14px;
      color: #333;
      font-weight: 600;
      line-height: 24px;
      padding: 5px;
    }
    .service-container {
      min-height: 162px;
      background-color: #f7f7f7;
      ul {
        padding: 0 0 0 8px;
        li {
          //   line-height: 38px;
          height: 50px;
          border-bottom: 1px solid #e6e4e4;
          overflow: hidden;
          span {
            color: #777;
          }
          a {
            margin-left: 2px;
            user-select: none;
            cursor: pointer;
            img {
              border: 0;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .opening {
    width: 150px;
    padding: 5px;
  }
  .closed {
    width: 0;
  }
}
</style>
