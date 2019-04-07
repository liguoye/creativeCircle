<template>
  <div class="register">
    <p class="title">商家注册</p>
    <div v-if="phoneNumTest">
      <ul class="out">
        <li class="n current" @click="phoneNumTest=true">
          <p>获取手机验证码</p>
        </li>
        <li class="n" @click="phoneNumTest=false">
          <p>填写会员信息</p>
        </li>
      </ul>
      <div class="form">
        <p>
          <span class="left">手机号码：</span>
          <span class="right">
            <el-input v-model="form.phone" placeholder="请输入您的手机号码"></el-input>
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
          <el-button type="primary" size="small" style="width:245px;border-radius:40px;margin:20px 0;height:40px;" @click="next">下一步</el-button>
        </p>
      </div>
    </div>
    <div v-if="!phoneNumTest">
      <ul class="out">
        <li class="n" @click="phoneNumTest=true">
          <p>获取手机验证码</p>
        </li>
        <li class="n current" @click="phoneNumTest=false">
          <p>填写会员信息</p>
        </li>
      </ul>
      <div class="form">
        <p>
          <span class="left">商家姓名：</span>
          <span class="right">
            <el-input v-model="form.userName" placeholder="请输入您的姓名"></el-input>
          </span>
        </p>
        <p>
          <span class="left" style="float: left;">商家会员帐号：</span>
          <span class="right">
            <el-input v-model="form.userNum" placeholder="请输入您希望使用的会员帐号"></el-input>
          </span>
        </p>
        <p>
          <span class="left">登录密码：</span>
          <span class="right">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </span>
        </p>
        <p>
          <span class="left">确认密码：</span>
          <span class="right">
            <el-input v-model="form.confirmPass" placeholder="请确认密码"></el-input>
          </span>
        </p>
        <p>
          <span class="left">联系QQ：</span>
          <span class="right">
            <el-input v-model="form.qq" placeholder="请输入QQ号"></el-input>
          </span>
        </p>
        <p style="text-align:center">
          <el-button type="primary" size="small" style="width:245px;border-radius:40px;margin:20px 0;height:40px;">注册</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
