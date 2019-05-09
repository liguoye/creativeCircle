<template>
  <div class="settingDialogCom">
    <el-dialog title="续费智能助手" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>续费时长：</p>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="renewDuration">
              <el-radio :label="1">1个月</el-radio>
              <el-radio :label="2">12个月</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <p>费用：</p>
          </el-col>
          <el-col :span="18">请先选择计划</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>有效期至：</p>
          </el-col>
          <el-col :span="18">请先选择计划</el-col>
        </el-row>-->
        <el-row>
          <el-col :span="6">
            <p>支付密码：</p>
          </el-col>
          <el-col :span="18">
            <el-input type="password" v-model="password" maxlength="12" placeholder="若未设置支付密码,则支付密码与登录密码一致"></el-input>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <p>开通流程：</p>
          </el-col>
          <el-col :span="18">请先选择计划</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>免责声明：</p>
          </el-col>
          <el-col :span="18">请先选择计划</el-col>
        </el-row>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确认</el-button>
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
      default () {
        return false
      }
    },
    shopid: {
      type: Number,
      default: 0
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.dialogShow = val
    }
  },
  data () {
    return {
      renewDuration: 1,
      dialogShow: false,
      password: ''
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    submit () {
      this.$ajax.post('shopmember/buyVip', {
        shopid: this.shopid,
        type: this.renewDuration,
        paypwd: this.password
      }).then(res => {
       // console.log(res)
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: '订购成功',
            type: 'success'
          })
          this.dialogShow = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-dialog {
  .content {
    > .el-row {
      > .el-col {
        height: 40px;
        line-height: 40px;
        &:first-child {
          text-align: right;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
