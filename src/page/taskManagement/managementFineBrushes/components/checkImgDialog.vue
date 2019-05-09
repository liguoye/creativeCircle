<template>
  <div class="settingDialogCom">
    <el-dialog title="查看截图" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <img :src="rowData.divKeyImg" />
        <img :src="rowData.evaluateImg" />
        <img :src="rowData.footImg" />
        <img :src="rowData.goodscollerImg" />
        <img :src="rowData.shopImg" />
        <img :src="rowData.cartImg" />
        <img :src="rowData.askImg" />
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
