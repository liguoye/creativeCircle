<template>
  <div class="settingDialogCom">
    <el-dialog
      title="查看任务详情"
      :visible.sync="dialogShow"
      @close="dialogClose"
      width="60%"
    >
      <div class="content">
        <h5>任务基本信息</h5>
        <el-row>
          <el-col :span="12">
            <p>任务分类:</p>
            <p v-if="rowData.type==1">精刷单</p>
            <p v-if="rowData.type==2">指定推送</p>
            <p v-if="rowData.type==3">复购</p>
          </el-col>
          <el-col :span="12">
            <p>订单编号:</p>
            <p>{{rowData.orderid}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>任务编号:</p>
            <p>{{rowData.ordersn}}</p>
          </el-col>
          <el-col :span="12">
            <p>任务平台:</p>
            <p>{{rowData.id}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>任务类型:</p>
            <p>{{rowData.type}}</p>
          </el-col>
          <el-col :span="12">
            <p>产品价格:</p>
            <p>{{rowData.goodPrice}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>拍下件数:</p>
            <p>{{rowData.goodNumber}}</p>
          </el-col>
          <el-col :span="12">
            <p>型号:</p>
            <p>{{rowData.goodSize}}</p>
          </el-col>
        </el-row>
        <h5>搜索关键字</h5>
        <el-row>
          <el-col :span="12">
            <p>关键字（下单）:</p>
            <p>{{rowData.keyword}}</p>
          </el-col>
          <el-col :span="12">
            <p>关键字（浏览）:</p>
            <p>{{rowData.keyword1}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>浏览商品价格区间:</p>
            <p>{{rowData.id}}</p>
          </el-col>
          <el-col :span="12">
            <p>搜索来路:</p>
            <p>{{rowData.visitWay}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>发货城市:</p>
            <p>{{rowData.shipment}}</p>
          </el-col>
          <el-col :span="12">
            <p>价格区间:</p>
            <p>{{rowData.beginPrice}}--{{rowData.endPrice}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>排序方式:</p>
            <p>{{rowData.sortOrder}}</p>
          </el-col>
          <el-col :span="12">
            <p>其他搜索:</p>
            <p>{{rowData.otherCondition}}</p>
          </el-col>
        </el-row>
        <h5>任务要求</h5>
        <el-row>
          <el-col :span="12">
            <p>任务备注:</p>
            <p>{{rowData.sellerRemark}}</p>
          </el-col>
        </el-row>
        <h5>快递信息</h5>
        <el-row>
          <el-col :span="12">
            <p>运单编号:</p>
            <p>{{rowData.express_sn}}</p>
          </el-col>
          <el-col :span="12">
            <p>物流公司:</p>
            <p>圆通</p>
          </el-col>
        </el-row>
        <h5>商品信息</h5>
        <el-row>
          <el-col :span="24">
            <p>商品全称</p>
            <p>{{rowData.title}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>商品链接:</p>
            <p>{{rowData.url}}</p>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <p>商品展现图:</p>
            <p><img :src="rowData.img" /></p>
          </el-col>
        </el-row> -->
        <div style="margin-top:30px">
          <span>
            商品展现图:
          </span>
          <img style="width:60%;" :src="rowData.img" />
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogShow = val;
    },
    data(val) {
      this.rowData = JSON.parse(JSON.stringify(val));
    }
  },
  data() {
    return {
      rowData: {},
      dialogShow: false
    };
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClose", false);
      for (let item in this.formData) {
        this.formData[item].check = false;
      }
    },
    dialogConfirm() {
      this.$emit("dialogConfirm", {
        id: this.rowData.id,
        sellerRemark: this.rowData.sellerRemark
      });
      this.$emit("dialogClose", false);
    }
  }
};
</script>
<style lang="less" scoped>
.el-dialog {
  .content {
    h5 {
      font-weight: 700;
      font-size: 15px;
      border-bottom: 1px solid #888;
      margin-bottom: 5px;
    }
    > .el-row {
      > .el-col {
        height: 40px;
        line-height: 40px;
        > p {
          display: inline-block;
          &:first-child {
            width: 80px;
            line-height: 14px;
            text-align: right;
            padding-right: 3px;
          }
          &:nth-child(2) {
            width: calc(100% - 88px);
          }
        }
      }
    }
  }
}
</style>
