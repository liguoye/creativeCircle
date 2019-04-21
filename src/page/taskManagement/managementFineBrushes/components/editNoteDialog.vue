<template>
  <div class="settingDialogCom">
    <el-dialog title="修改任务备注" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content" style="height:100%;overflow:inherit">
        <el-row>
          <el-col :span="5" style="text-align:right">
            <p>任务编号：</p>
          </el-col>
          <el-col :span="18">
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" style="text-align:right">
            <p>任务备注：</p>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入任务,不超过80字" type="textarea" v-model="rowData.sellerRemark"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
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
      this.$ajax.get('ShopMember/sellerRemark', {
        params: {
          id: this.data['id'],
          sellerRemark: this.data['sellerRemark']
        }
      }).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: res.data.msg,
            type: 'success'
          })
        }
      })
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
          text-align: left;
        }
      }
    }
  }
}
</style>
