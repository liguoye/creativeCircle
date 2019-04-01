<template>
  <div class="mpm-layout mpm-login">
    <div class="mpm-layout mpm-login-header">
      <span>订单选配管理</span>
    </div>
    <!-- <div class="mpm-layout mpm-login-content">
      <div class="mpm-layout"></div>
      <div class="mpm-layout mpm-login-from">
        <div class="mpm-login-from-item">
          <el-input v-model="loginInfoData.userId"
                    placeholder="请输入帐号"
                    @keyup.enter.native="checkLogin">
            <template slot="prepend">帐号</template>
          </el-input>
        </div>
        <div class="mpm-login-from-item">
          <el-input v-model="loginInfoData.pwd"
                    type="password"
                    placeholder="请输入密码"
                    @keyup.enter.native="checkLogin">
            <template slot="prepend">密码</template>
          </el-input>
        </div>
        <div class="mpm-login-from-item">
          <el-button style="width:100%"
                     type="primary"
                     @click="checkLogin">登录</el-button>
        </div>
      </div>
      <div class="mpm-layout"></div>
    </div>
    <div class="mpm-layout mpm-login-footer"></div> -->
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginInfoData: {
        userId: '',
        pwd: ''
      }
    }
  },
  created: function () { },
  methods: {
    checkLogin: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style type="text/css">
.mpm-layout {
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: auto;
}
.mpm-login {
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.65);
}
.mpm-login-header {
  height: 58px;
  flex: 0 0 58px;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  font-size: 20px;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  line-height: 58px;
  padding-left: 22px;
}
.mpm-login-content {
  flex: 1;
  flex-direction: row;
}
.mpm-login-from {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mpm-login-from-item {
  margin-bottom: 30px;
  width: 400px;
}
.mpm-login-footer {
  height: 50px;
  flex: 0 0 58px;
  justify-content: center;
  align-items: center;
  background: #fafafa;
}
#app .mpm-login-from-item .el-input__inner {
  height: 40px;
}
</style>
