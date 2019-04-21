<template>
  <div class="settingDialogCom">
    <el-dialog title="查看买号信息" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <el-row>
          <el-col :span="5">
            <p>淘宝会员名：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>性别：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>平台注册时间：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>淘宝等级：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>天猫等级：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>购物评级：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p>淘宝成长值：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default () {
        return false
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogShow = val
    },
    data (val) {
      this.rowData = JSON.parse(JSON.stringify(val))
    }
  },
  data () {
    return {
      rowData: {},
      dialogShow: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
      for (let item in this.formData) {
        this.formData[item].check = false
      }
    },
    dialogConfirm () {
      this.$emit('dialogConfirm', {
        id: this.rowData.id,
        sellerRemark: this.rowData.sellerRemark
      })
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
        }
      }
    }
  }
}
</style>
