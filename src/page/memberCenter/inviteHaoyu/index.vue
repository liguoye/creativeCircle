<template>
  <div class="inviteHaoyu">
    <el-row>
      <el-col
        :span="4"
        class="navList"
      >
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col
        :span="18"
        class="accountManage"
      >
        <p>
          <span>被邀请人：</span>
          <el-input
            style="width:300px"
            label="被邀请人"
            v-model="mobile"
            placeholder="被邀请人手机号码"
          ></el-input>
        </p>
        <p>
          <span>安全密码：</span>
          <el-input
            style="width:300px"
            label="安全密码"
            type="password"
            v-model="password"
            placeholder="请输入安全密码"
          ></el-input>
        </p>
        <p>
          <el-button
            type="warning"
            @click="submit"
          >生成专有邀请链接</el-button>
        </p>
        <p v-if="url">
            <span>{{url}}</span>
            <el-button
            type="success"
            round
            v-clipboard:copy="url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制</el-button>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navList from "../components/treeNavList.vue";
export default {
  components: {
    navList
  },
  props: {},
  data() {
    return {
      currentTab: "inviteHaoyu",
      mobile: "",
      password: "",
      url:''
    };
  },
  methods: {
      onCopy: function(e) {
       this.$notify({
          title: '复制成功',
          type: 'success'
        });
    },
    onError: function(e) {
      this.$notify({
          title: '复制失败',
          type: 'error'
        });
    },
    navListClick(val) {
      this.$router.push({ name: val, param: { tab: val } });
    },
    submit() {
      if (this.mobile == "") {
        this.$notify.error({
          title: "请输入被邀请人手机号码"
        });
        return;
      }
      if (this.password == "") {
        this.$notify.error({
          title: "请输入密码"
        });
        return;
      }
      
      this.$ajax
        .post("ShopMember/qrCode", {
          phone: this.mobile,
          pwd: this.password
        })
        .then(res => {
          if (res && res.data && res.data.code == "1") {
            this.$notify({
              title: "绑定成功",
              type: "success"
            });
            let url=window.location.host+'/#/register?code='+res.data.data.qrCode
            this.url=url
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin-top: 50px;
}
.inviteHaoyu {
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
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .tabContent {
      margin-top: 20px;
      p {
        font-size: 13px;
        line-height: 30px;
        span:first-child {
          display: inline-block;
          width: 210px;
          text-align: right;
        }
      }
    }
  }
}
</style>
