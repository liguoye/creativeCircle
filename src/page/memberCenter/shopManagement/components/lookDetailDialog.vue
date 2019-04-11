<template>
  <div class="settingDialogCom">
    <el-dialog title="查看详情" :visible.sync="dialogShow" @close="dialogClose" width="70%">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>店铺类型：</p>
          </el-col>
          <el-col :span="18">淘宝</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>掌柜号：</p>
          </el-col>
          <el-col :span="18">{{passdata.username}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>店铺名：</p>
          </el-col>
          <el-col :span="18">{{passdata.shop_name}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>店铺性质：</p>
          </el-col>
          <el-col :span="18" v-if="passdata.type==1">个人</el-col>
          <el-col :span="18" v-else>公司</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>发货人：</p>
          </el-col>
          <el-col :span="18">{{passdata.name}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>发货人手机号码：</p>
          </el-col>
          <el-col :span="18">{{passdata.phone}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>发货省市区：</p>
          </el-col>
          <el-col :span="18">{{passdata.province}}{{passdata.city}}{{passdata.area}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>发货详细地址：</p>
          </el-col>
          <el-col :span="18">{{passdata.address}}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <p>所在类目：</p>
          </el-col>
          <el-col :span="18"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>所在层级：</p>
          </el-col>
          <el-col :span="18"></el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span="6">
            <p>备注：</p>
          </el-col>
          <el-col :span="18"></el-col>
        </el-row> -->
        <el-row>
          <el-col :span="6">
            <p>店铺截图：</p>
          </el-col>
          <el-col :span="18">
            <img :src="passdata.img" />
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogShow = false">返回</el-button>
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
    passdata: {
      type: Object,
      default () {
        return {}
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
