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
            <el-input v-model="form.imgcode" :maxlength="4" placeholder="请输入验证码"></el-input>
            <img :src="src" @click="getImg">
          </span>
        </p>
        <p>
          <span class="left">手机验证码：</span>
          <span class="right" style="width: 460px;">
            <el-input v-model="form.code" placeholder="请输入6位验证码" style="width:330px"></el-input>
            <span class="sendSMS">
              <span class="count" v-if="showCode">{{codeCount}}S</span>
              <span class="send" v-else @click="sendMsg">获取验证码</span>
            </span>
          </span>
        </p>
        <p style="text-align:center">
          <el-button
            type="primary"
            size="small"
            style="width:245px;border-radius:40px;margin:20px 0;height:40px;"
            @click="next"
          >下一步</el-button>
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
            <el-input type="password" :maxlength="20" v-model="form.password" placeholder="请输入密码"></el-input>
          </span>
        </p>
        <p>
          <span class="left">确认密码：</span>
          <span class="right">
            <el-input type="password" :maxlength="20" v-model="form.confirmPass" placeholder="请确认密码"></el-input>
          </span>
        </p>
        <p>
          <span class="left">联系QQ：</span>
          <span class="right">
            <el-input v-model="form.qq" placeholder="请输入QQ号"></el-input>
          </span>
        </p>
        <p style="text-align:center">
          <el-button
            type="primary"
            size="small"
            @click="register"
            style="width:245px;border-radius:40px;margin:20px 0;height:40px;"
          >注册</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
let phoneReg = /^1[345678]\d{9}$/;
export default {
  data() {
    return {
      src: "",
      form: {
        phone: "",
        imgcode: "",
        code: "",
        testNum: "",
        phoneTestNum: "",
        userName: "",
        userNum: "",
        password: "",
        confirmPass: "",
        qq: ""
      },
      phoneNumTest: true,
      codeCount: 60,
      tt: null,
      showCode: false,
      sign: ""
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    //   注册
    register() {
      if (!this.form.phone || !phoneReg.test(this.form.phone)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      if (!this.form.imgcode) {
        this.$message.error("请输入图片验证码");
        return;
      }
      if (!this.form.code) {
        this.$message.error("请输入短信验证码");
        return;
      }
      if (!this.form.userName) {
        this.$message.error("请输入商家姓名");
        return;
      }
      if (!this.form.userNum) {
        this.$message.error("请输入会员账号");
        return;
      }
      if (!this.form.password) {
        this.$message.error("请输入密码");
        return;
      }
      if (!this.form.confirmPass) {
        this.$message.error("请确认密码");
        return;
      }
      if (!this.form.qq) {
        this.$message.error("请确认QQ号码");
        return;
      }
      if (this.form.confirmPass!=this.form.confirmPass) {
        this.$message.error("两次密码不一致");
        return;
      }

      
      this.$ajax
        .post("login/register", {
          phone: this.form.phone,
          pwd: this.form.password,
          Username: this.sign,
          NickName: this.form.userName,
          QQToken: this.form.qq,
          code: this.form.code,
          
        })
        .then(res => {
            if(res&&res.code=='1'){
                this.$notify({
              title: "注册成功",
              type: "success"
            });
            this.$router.push('/login')
            }
            
        });
    },
    // 发送短信
    sendMsg() {
      if (!this.form.phone || !phoneReg.test(this.form.phone)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      if (!this.form.imgcode) {
        this.$message.error("请输入图片验证码");
        return;
      }
      this.showCode = true;
      this.codeCount = 60;
      this.tt = setInterval(() => {
        this.codeCount = this.codeCount - 1;
        if (this.codeCount <= 0) {
          this.showCode = false;
          clearInterval(this.tt);
        }
      }, 1000);
      this.$ajax
        .post("login/sendSms", {
          phone: this.form.phone,
          code: this.form.imgcode,
          sign: this.sign
        })
        .then(res => {
          //     if(res){
          //     }
          //   this.$notify({
          //     title: "发送成功",
          //     type: "success"
          //   });
        });
    },
    next() {
      if (!this.form.phone || !phoneReg.test(this.form.phone)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      if (!this.form.imgcode) {
        this.$message.error("请输入图片验证码");
        return;
      }
      if (!this.form.code) {
        this.$message.error("请输入短信验证码");
        return;
      }
      this.phoneNumTest = false;
    },
    getImg() {
      let data = Date.now();
      var charactors = "1234567890";
      var value = "",
        i;
      for (let j = 1; j <= 4; j++) {
        i = parseInt(10 * Math.random());
        value = value + charactors.charAt(i);
      }
      let sign = data + value;
      this.sign = sign;
      this.src = "http://h5om.knowsea.cn/shop/login/Verify?sign=" + sign;
    }
  }
};
</script>
<style scoped lang="less">
.sendSMS {
  width: 95px;
  border-radius: 25px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  span {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
  .send {
    background: #409eff;
    color: #fff;
  }
  .count {
    background: #fff;
    color: red;
  }
}

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
          height: 40px;
          cursor: pointer;
          display: block;
        }
      }
    }
  }
}
</style>
