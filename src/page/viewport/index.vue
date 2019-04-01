<template>
  <div class="viewport">
    <div class="navBar">
      <div class="navList">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgba(31, 45, 70, 0.7)"
          text-color="#fff" active-text-color="#0099e5">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="dfdsf">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-sdf">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="routerView">

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({ name: 'customerWorkOrder', param: {} })
    }
  }
}
</script>
<style  lang="less">
body {
  margin: 0;
  line-height: 1.5;
  color: #333;
  font-size: 12px;
  padding: 0;
  height: 100%;
}

div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  padding: 0;
  margin: 0;
}

.viewport {
  width: 100%;
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
}
.navBar {
  width: 100%;
  height: 55px;
  background: #243653;
  .navList {
    width: 1100px;
    margin: 0 auto;
    background: rgba(31, 45, 70, 0.7);
    .el-menu-demo {
      margin: 0 auto;
      .el-menu-item {
        height: 55px;
        width: 170px;
        text-align: center;
        font-size: 14px;
        &:hover {
          color: #0099e5 !important;
          border-bottom-color: #0099e5 !important;
          background-color: #243653 !important;
        }
      }
      .is-active,
      .is-active > .el-submenu__title {
        border-bottom-width: 3px;
      }
      .el-submenu__title {
        width: 170px;
        text-align: center;
        height: 55px;
        &:hover {
          color: #0099e5 !important;
          border-bottom-color: #0099e5 !important;
          background-color: #243653 !important;
        }
      }
    }
  }
}
.el-menu--horizontal {
  // background: rgba(31, 45, 70, 0.7);
  .el-menu {
    background: rgba(31, 45, 70, 0.7);
    // margin-top: 0;
    .el-menu-item {
      background: transparent !important;
      margin: 0;
      // width: 170px;
      color: #fff !important;
      &:hover {
        background: hsla(0, 0%, 100%, 0.7) !important;
        color: red;
      }
    }
  }
}
</style>
