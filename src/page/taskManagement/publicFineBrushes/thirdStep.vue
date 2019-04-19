<template>
  <div class="thirdStep">
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col :span="12" class="left">
            <span>定价类型:</span>
            <el-radio-group v-model="priceType">
              <el-radio :label="1">单型号价格</el-radio>
              <el-radio :label="2">多型号价格</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12" class="right">
            <el-row>
              <el-col :span="20">
                <div class="right-container">
                  <span style="margin-right: 10px;">
                    总数:
                    <em class="red">{{totle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    PC:
                    <em class="red">{{pctotle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    无线端:
                    <em class="red">{{apptotle}}</em>
                  </span>
                  <!-- <a class="btn btn-small">新增</a> -->
                </div>
              </el-col>
              <el-col :span="4">
                <el-button class="tableBtn" type="primary" @click="addPathData">新增</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="funTable">
        <el-row class="tableTitle">
          <el-col :span="3">商品单价</el-col>
          <el-col :span="2">
            快递费
            <span>(选填)</span>
          </el-col>
          <el-col :span="3">指定型号</el-col>
          <el-col :span="2">拍下件数</el-col>
          <el-col :span="3">任务数量(1)</el-col>
          <el-col :span="3">单任务成交金额</el-col>
          <el-col :span="2">单任务佣金</el-col>
          <el-col :span="2">单任务快递费</el-col>
          <el-col :span="2">合计</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <template v-for="(item,index) in releasePriceList">
          <el-row class="tableContent" :key="index">
            <el-col :span="3" class="flowEnterSelect">
              <el-input
                v-model="releasePriceList[index].keyword1"
                placeholder="商品单价"
              ></el-input>
            </el-col>
            <el-col :span="2" class="textInput">
              <el-input
                v-model="releasePriceList[index].keyword1"
                placeholder="快递费"
              ></el-input>
            </el-col>
            <el-col :span="3" class="textInput">
              <el-input v-model="releasePriceList[index].keyword" placeholder="指定型号"></el-input>
            </el-col>
            <el-col :span="2" class="section">
              <el-input v-model="releasePriceList[index].beginPrice" placeholder="拍下件数"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input-number size="mini" v-model="releasePriceList[index].taskNum"></el-input-number>
            </el-col>
            <el-col :span="3">
              20
            </el-col>
            <el-col :span="2">
              20
            </el-col>
            <el-col :span="2">
              20
            </el-col>
            <el-col :span="2">
              20
            </el-col>
            <el-col :span="2">
              <el-button
                type="danger"
                size="mini"
                @click="deletePathData(index)"
                style="border-radius:25px"
              >删除</el-button>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <btn-group :btn-active="btnActive" @btnClick="btnClick"></btn-group>
  </div>
</template>
<script>
import btnGroup from "./components/btnGroup.vue";
export default {
  components: {
    btnGroup
  },
  data() {
    return {
      totle: "0",
      pctotle: "0",
      apptotle: "0",
      radio: "1",
      btnActive: 0,
      priceType: 1,
      releasePriceList: [
        {
          flowList: {
            value: "",
            options: [
              { label: "APP自然搜索", value: 1 },
              { label: "APP淘口令", value: 2 },
              { label: "PC直通车", value: 3 },
              { label: "APP二维码", value: 4 },
              { label: "PC自然搜索", value: 5 },
              { label: "APP直通车", value: 6 }
            ]
          },
          flowid: "",
          keyword1: "",
          keyword: "",
          taskNum: "",
          sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
          beginPrice: "", // 价格区间起始
          endPrice: "", // 价格区间最大值
          shipment: "", // 发货地
          otherCondition: "" // 其他
        }
      ]
    };
  },
  methods: {
    btnClick(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "secondStep" });
      } else {
        this.$emit("changeState", { state: "fourStep" });
      }
    },
    deletePathData(index) {
      this.releasePriceList.splice(index, 1);
    },
    addPathData() {
      this.releasePriceList.push({
        flowList: {
          value: "",
          options: [
            { label: "APP自然搜索", value: 1 },
            { label: "APP淘口令", value: 2 },
            { label: "PC直通车", value: 3 },
            { label: "APP二维码", value: 4 },
            { label: "PC自然搜索", value: 5 },
            { label: "APP直通车", value: 6 }
          ]
        },
        flowid: "",
        keyword: "",
        keyword1: "",
        taskNum: "",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: "", // 价格区间起始
        endPrice: "", // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "" // 其他
      });
    }
  }
};
</script>
<style lang="less" scoped>
.colTable .funTable > .el-row > .el-col {
  height: 40px;
  line-height: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.table {
  position: relative;
}
.goods-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 240px;
  height: 206px;
}
.tableBtn {
  background: #0099e5;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  padding: 5px 10px;
  cursor: pointer;
}
// .secondStep {
//   .content {
//   }
// }
</style>
