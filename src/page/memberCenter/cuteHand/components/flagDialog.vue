<template>
  <div class="settingDialogCom">
    <el-dialog
      title="标记订单"
      :visible.sync="dialogShow"
      @close="dialogClose"
    >
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>版本：</p>
          </el-col>
          <el-col :span="18">
            基础版
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>是否标记：</p>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="renewDuration">
              <el-radio :label="1">标记</el-radio>
              <el-radio :label="2">不标记</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>标记：</p>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="renewDuration">
              <el-radio :label="1"><img
                  style="width:20px"
                  src="../../../../assets/picture/black.png"
                  alt=""
                  srcset=""
                ></el-radio>
              <el-radio :label="2"><img
                  style="width:20px"
                  src="../../../../assets/picture/yellow.png"
                  alt=""
                  srcset=""
                ></el-radio>
              <el-radio :label="3"><img
                  style="width:20px"
                  src="../../../../assets/picture/green.png"
                  alt=""
                  srcset=""
                ></el-radio>
              <el-radio :label="4"><img
                  style="width:20px"
                  src="../../../../assets/picture/blue.png"
                  alt=""
                  srcset=""
                ></el-radio>
              <el-radio :label="5"><img
                  style="width:20px"
                  src="../../../../assets/picture/pink.png"
                  alt=""
                  srcset=""
                ></el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>标记信息：</p>
          </el-col>
          <el-col :span="18">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="formData.remark"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>免责声明：</p>
          </el-col>
          <el-col :span="18">
            智能助理系统的稳定性与淘宝接口和服务器相关，因此不能保证100%能够标记成功。对于标记失败的订单，会在下面进行记录和提醒，请各位用户在仓库发货之前登陆米客核对是否有订单标记失败。
          </el-col>
        </el-row>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >保存</el-button>
        <el-button @click="dialogShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    shopid: {
      type: Number,
      default: 0
    }
  },
  watch: {
    dialogTableVisible(val) {
      this.dialogShow = val;
    }
  },
  data() {
    return {
      renewDuration: 1,
      dialogShow: true,
      password: "",
      formData: {
        shopid: "",
        ordersn: "",
        remark: "",
        flag: ""
      }
    };
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClose", false);
    },
    submit() {
      this.$ajax
        .post("shopmember/buyVip", {
          shopid: this.shopid,
          type: this.renewDuration,
          paypwd: this.password
        })
        .then(res => {
          // console.log(res)
          if (res && res.data && res.data.code === 1) {
            this.$notify({
              title: "订购成功",
              type: "success"
            });
            this.dialogShow = false;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el-dialog {
  .content {
    > .el-row {
      > .el-col {
        &:first-child {
          text-align: right;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
