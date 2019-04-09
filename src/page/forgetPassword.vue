<template>
  <div class="register">
    <p class="title">重置密码</p>
    <div v-if="phoneNumTest">
      <ul class="out">
        <li class="n current" @click="phoneNumTest=true">
          <p>验证会员信息</p>
        </li>
        <li class="n" @click="phoneNumTest=false">
          <p>重置登录密码</p>
        </li>
      </ul>
      <div class="form">
        <p>
          <span class="left">登录会员名：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请输入你的会员名"></el-input>
          </span>
        </p>
        <p>
          <span class="left">验证手机号：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请输入注册时使用的手机号码"></el-input>
          </span>
        </p>
        <p>
          <span class="left">验证码：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请输入验证码"></el-input><img src="../assets/picture/test1.png" />
          </span>
        </p>
        <p>
          <span class="left">手机验证码：</span>
          <span class="right" style="width: 460px;">
            <el-input v-model="form.phone" placeholder="请输入6位验证码" style="width:330px"></el-input>
            <el-button disabled="disabled" class="sendSMS" type="primary" size="small" style="width:110px;border-radius:25px">获取验证码</el-button>
          </span>
        </p>
        <p style="text-align:center">
          <el-button type="primary" size="small" style="width:245px;border-radius:40px;margin:20px 0;height:40px;"
            @click="next">下一步</el-button>
        </p>
      </div>
    </div>
    <div v-if="!phoneNumTest">
      <ul class="out">
        <li class="n" @click="phoneNumTest=true">
          <p>验证会员信息</p>
        </li>
        <li class="n current" @click="phoneNumTest=false">
          <p>重置登录密码</p>
        </li>
      </ul>
      <div class="form">
        <p>
          <span class="left">修改登录密码：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请输入新的登录密码"></el-input>
          </span>
        </p>
        <p>
          <span class="left" style="float: left;">确认登录密码：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请再次确认新的登录密码"></el-input>
          </span>
        </p>
        <p style="text-align:center">
          <el-button type="primary" size="small" style="width:245px;border-radius:40px;margin:20px 0;height:40px;"
            @click="editPassword">下一步</el-button>
        </p>
      </div>
    </div>
    <div class="settingDialogCom">
      <el-dialog title="密码重置成功" :visible.sync="dialogVisible" width="30%" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <p>请使用新密码进行登录</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">去登录看看</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        phone: '',
        testNum: '',
        phoneTestNum: '',
        userName: '',
        userNum: '',
        password: '',
        confirmPass: '',
        qq: ''

      },
      phoneNumTest: true
    }
  },
  methods: {
    next () {
      this.phoneNumTest = false
    },
    editPassword () {
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped lang="less">
.register {
  width: 998px;
  margin: 0 auto;
  border: 1px solid #e9e9e9;
  background: #fff;
  .title {
    text-align: center;
    line-height: 100px;
    font-weight: 700;
    font-size: 25px;
    color: #0099e5;
  }
  .n {
    display: inline-block;
    vertical-align: top;
    letter-spacing: normal;
  }
  ul {
    font-size: 0;
    margin: 0 150px;
    li {
      width: 50%;
      height: 38px;
      line-height: 40px;
      font-size: 14px;
      color: #333;
      text-align: center;
      cursor: pointer;
      p {
        border: 1px solid #0099e5;
        height: 38px;
      }
    }
    .current p {
      background: #0099e5;
      color: #fff;
    }
  }
  .form {
    margin: 40px 150px 0;
    p {
      margin-bottom: 20px;
      .left {
        display: inline-block;
        width: 210px;
        text-align: right;
        line-height: 37px;
      }
      .right {
        display: inline-block;
        margin-left: 20px;
        width: 330px;
        position: relative;
        img {
          position: absolute;
          right: -110px;
          top: 1px;
          height: 37px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
