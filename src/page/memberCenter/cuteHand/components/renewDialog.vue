<template>
  <div class="settingDialogCom">
    <el-dialog title="续费智能助手" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>续费时长：</p>
          </el-col>
          <el-col :span="18">
            <el-radio v-model="renewDuration" label="1"> 一个月</el-radio>
            <el-radio v-model="renewDuration" label="2">十二个月(买十个月送两个月)</el-radio>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>费用：</p>
          </el-col>
          <el-col :span="18">
            请先选择计划
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>有效期至：</p>
          </el-col>
          <el-col :span="18">
            请先选择计划
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>支付密码：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="password" placeholder="若未设置支付密码,则支付密码与登录密码一致"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>开通流程：</p>
          </el-col>
          <el-col :span="18">
            请先选择计划
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>免责声明：</p>
          </el-col>
          <el-col :span="18">
            请先选择计划
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogShow = false">确认续费</el-button>
        <el-button @click="dialogShow = false">返回取消</el-button>
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
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.dialogShow = val
    }
  },
  data () {
    return {
      renewDuration: '',
      dialogShow: false,
      password: ''
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
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
