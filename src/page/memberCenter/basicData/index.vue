<template>
  <div class="basicData">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <el-row>
          <el-col :span="14" class="accountManageLeft">
            <p>
              <span class="left">姓名：</span>
              <span class="right">{{userInfo.Username}}</span>
            </p>
            <p>
              <span class="left">会员名：</span>
              <span class="right">{{userInfo.NickName}}</span>
            </p>
            <p>
              <span class="left">总资产：</span>
              <span class="right">{{userInfo.Money}}（存款＋发布点）</span>
            </p>
            <p>
              <span class="left">登录密码：</span>
              <span class="right">已设置</span>
              <el-button class="btn" type="primary" size="mini" @click="btnClick('pass')">修改</el-button>
            </p>
            <p>
              <span class="left">支付密码：</span>
              <span class="right">已设置</span>
              <el-button
                class="btn"
                type="primary"
                size="mini"
                @click="btnClick('safepass')"
              >{{userInfo.SafePwd==''?'设置':'修改'}}</el-button>
            </p>
            <p>
              <span class="left">QQ：</span>
              <span class="right">{{userInfo.QQToken}}</span>
              <el-button
                class="btn"
                type="primary"
                size="mini"
                @click="btnClick('qq')"
              >{{userInfo.QQToken==''?'设置':'修改'}}</el-button>
            </p>
            <p>
              <span class="left">微信：</span>
              <span class="right">{{userInfo.wx}}</span>
              <el-button
                class="btn"
                type="primary"
                size="mini"
                @click="btnClick('wx')"
              >{{userInfo.wx==''?'设置':'修改'}}</el-button>
            </p>
          </el-col>
          <el-col :span="10" class="accountManageRight">
            <div class="memberAccount">
              <div class="con">
                <p>
                  帐户存款第：
                  <span class="red">{{userInfo2.days}}</span> 天
                </p>
                <p>
                  帐户存款：
                  <span class="red">{{userInfo2.Money}}</span> 元
                </p>
                <p>
                  账户发布点：
                  <span class="red">{{userInfo2.MinLi}}</span> 个
                </p>
                <p>
                  绑定店铺：
                  <span class="red">{{userInfo2.shop_num}}</span> 个
                </p>
                <p>
                  高危预警：
                  <a href="#/business/premium-task/warning" class="red">{{userInfo2.hide}}</a>
                  个
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="settingDialogCom">
      <el-dialog :title="title" :visible.sync="dialogShow" @close="dialogClose">
        <div class="content">
          <el-row v-if="setType=='pass'||setType=='safepass'">
            <el-col :span="6">
              <p>电话号码：</p>
            </el-col>
            <el-col :span="18">
              <el-input placeholder="请输入电话号码" v-model="formData.phone"></el-input>
            </el-col>
          </el-row>
          <el-row v-if="setType=='pass'||setType=='safepass'">
            <el-col :span="6">
              <p>验证码</p>
            </el-col>
            <el-col :span="18">
              <el-input placeholder="请输入图片验证码" :maxlength="4" v-model="formData.imgCode">
                <template slot="append">
                  <img class="code-img" :src="src" @click="getImg">
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row v-if="setType=='pass'||setType=='safepass'">
            <el-col :span="6">
              <p>手机验证码</p>
            </el-col>
            <el-col :span="18">
              <el-input placeholder="请输入手机验证码" :maxlength="4" v-model="formData.code">
                <span slot="append" class="count" style="color:red" v-if="showCode">{{codeCount}}S</span>
                <span slot="append" class="send" v-else @click="sendMsg">获取验证码</span>
              </el-input>
            </el-col>
          </el-row>
          <el-row v-if="setType=='pass'||setType=='safepass'">
            <el-col :span="6">
              <p>设置密码：</p>
            </el-col>
            <el-col :span="18">
              <el-input
                type="password"
                v-model="formData.setPass"
                maxlength="11"
                placeholder="请输入密码，6~11位"
              ></el-input>
            </el-col>
          </el-row>
          <el-row v-if="setType=='pass'||setType=='safepass'">
            <el-col :span="6">
              <p>确认密码：</p>
            </el-col>
            <el-col :span="18">
              <el-input
                type="password"
                v-model="formData.confirmPass"
                maxlength="11"
                placeholder="请再次输入密码"
              ></el-input>
            </el-col>
          </el-row>

          <el-row v-if="setType=='qq'">
            <el-col :span="6">
              <p>新QQ：</p>
            </el-col>
            <el-col :span="18">
              <el-input v-model="formData.qq" placeholder></el-input>
            </el-col>
          </el-row>

          <el-row v-if="setType=='wx'">
            <el-col :span="6">
              <p>新微信号：</p>
            </el-col>
            <el-col :span="18">
              <el-input v-model="formData.wx" placeholder></el-input>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import navList from "../components/treeNavList.vue";
let phoneReg = /^1[345678]\d{9}$/;
export default {
  components: {
    navList
  },
  props: {},
  data() {
    return {
      title: "",
      currentTab: "basicData",
      setType: "pass",
      formData: {
        phone: "",
        imgCode: "",
        code: "",
        setPass: "",
        confirmPass: "",
        qq: "",
        wx: ""
      },
      dialogShow: false,
      userInfo: {},
      userInfo2: {},
      src: "",
      codeCount: 60,
      tt: null,
      showCode: false,
      modalType: "",
      sign: ""
    };
  },
  created() {
    this.getImg();
    this.getUserInfo();
    this.getHome();
  },
  methods: {
    submit() {
      let val = this.modalType;
      switch (val) {
        case "pass":
          this.changePassword();
          break;
        case "safepass":
          this.setSafePassword();
          break;
        case "qq":
          this.setqq();
          break;
        case "wx":
          this.setqq();
          break;
        default:
          break;
      }
    },

    // 修改登陆密码
    changePassword() {
      if (this.formData.setPass !== this.formData.confirmPass) {
        this.$notify.error({
          title: "两次密码不一致"
        });
        return;
      }
      this.$ajax
        .post("/login/forget", {
          phone: this.formData.phone,
          code: this.formData.code,
          pwd: this.formData.setPass,
          Username: this.userInfo.Username
        })
        .then(res => {
          if (res && res.data && res.data.code == 1) {
            console.log(res);
            this.formData = {
              phone: "",
              imgCode: "",
              code: "",
              setPass: "",
              confirmPass: "",
              qq: "",
              wx: ""
            };
            this.$notify.success({
              title: "修改成功"
            });
            this.dialogShow = false;
          }
        });
    },
    // 设置交易密码
    setSafePassword() {
      if (this.formData.setPass !== this.formData.confirmPass) {
        this.$notify.error({
          title: "两次密码不一致"
        });
        return;
      }
      this.$ajax
        .post("/shopmember/safePwd", {
          code: this.formData.code,
          pwd: this.formData.setPass,
          phone: this.userInfo.phone,
          sign: this.sign
        })
        .then(res => {
          if (res && res.data && res.data.code == 1) {
            console.log(res);
            this.formData = {
              phone: "",
              imgCode: "",
              code: "",
              setPass: "",
              confirmPass: "",
              qq: "",
              wx: ""
            };
            this.$notify.success({
              title: "修改成功"
            });
            this.dialogShow = false;
          }
        });
    },
    // 修改微信qq
    setqq() {
      this.$ajax
        .post("/ShopMember/upd", {
          qq: this.formData.qq,
          weixin: this.formData.wx
        })
        .then(res => {
          if (res && res.data && res.data.code == 1) {
            console.log(res);
            this.formData = {
              phone: "",
              imgCode: "",
              code: "",
              setPass: "",
              confirmPass: "",
              qq: "",
              wx: ""
            };
            this.$notify.success({
              title: "设置成功"
            });
            this.dialogShow = false;
            this.getUserInfo();
          }
        });
    },

    // 发送短信
    sendMsg() {
      if (!this.formData.phone || !phoneReg.test(this.formData.phone)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      if (!this.formData.imgCode) {
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
          phone: this.formData.phone,
          code: this.formData.imgCode,
          sign: this.sign
        })
        .then(res => {
          //     if(res){
          //     }
          if (rrs.data.code == 1) {
            this.$notify({
              title: "发送成功",
              type: "success"
            });
          }
        });
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
    },
    getUserInfo() {
      this.$ajax.get("/shopmember/memberInfo").then(res => {
        if (res && res.data && res.data.code == 1) {
          console.log(res);
          this.userInfo = res.data.data;
          this.formData.qq = res.data.data.QQToken;
          this.formData.wx = res.data.data.wx;
        }
      });
    },
    getHome() {
      this.$ajax.get("/shopmember/index").then(res => {
        if (res && res.data && res.data.code == 1) {
          this.userInfo2 = res.data.data;
        }
      });
    },
    navListClick(val) {
      this.$router.push({ name: val, param: { tab: val } });
    },
    btnClick(val) {
      this.dialogShow = true;
      this.setType = val;
      this.modalType = val;
      switch (val) {
        case "pass":
          this.title = "修改登陆密码";
          break;
        case "safepass":
          this.title = "设置交易密码";
          break;
        case "qq":
          this.title = "设置qq";
          break;
        case "pass":
          this.title = "设置微信";
          break;
        default:
          break;
      }
    },
    dialogClose() {
      this.$emit("dialogClose", false);
    }
  }
};
</script>
<style lang="less" scoped>
.basicData {
  .code-img {
    display: inline-block;
    position: relative;
    top: 2px;
  }
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
    padding-bottom: 50px;
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .accountManageLeft {
      p {
        line-height: 45px;
        font-size: 12px;
        .btn {
          color: #fff;
          text-align: center;
          border-radius: 25px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .right {
          display: inline-block;
          width: 270px;
        }
        .left {
          display: inline-block;
          width: 145px;
          text-align: right;
        }
      }
    }
    .accountManageRight {
      .memberAccount {
        position: absolute;
        right: 135px;
        top: 0;
        background: #ccebfa;
        border-radius: 8px;
        width: 265px;
        .con {
          background: #fff;
          margin: 10px;
          border-radius: 8px;
          padding: 15px 0;
          line-height: 40px;
          padding-left: 30px;
          font-size: 12px;
          p {
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
