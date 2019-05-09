<template>
  <div class="thirdStep">
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col
            :span="12"
            class="left"
          >
            <span>定价类型:</span>
            <el-radio-group v-model="priceType">
              <el-radio :label="1">单型号价格</el-radio>
              <el-radio :label="2">多型号价格</el-radio>
            </el-radio-group>
          </el-col>
          <el-col
            :span="12"
            class="right"
          >
            <el-row>
              <el-col :span="20">
                <div class="right-container">
                  <span style="margin-right: 10px;">
                    总数:
                    <em class="red">{{gettask.totle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    PC:
                    <em class="red">{{gettask.pctotle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    无线端:
                    <em class="red">{{gettask.apptotle}}</em>
                  </span>
                  <!-- <a class="btn btn-small">新增</a> -->
                </div>
              </el-col>
              <el-col :span="4">
                <el-button
                  class="tableBtn"
                  type="primary"
                  @click="addPathData"
                >新增</el-button>
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
          <el-col :span="2">指定型号</el-col>
          <el-col :span="3">拍下件数</el-col>
          <el-col :span="3">任务数量</el-col>
          <el-col :span="3">单任务成交金额</el-col>
          <el-col :span="2">单任务佣金</el-col>
          <el-col :span="2">单任务快递费</el-col>
          <el-col :span="2">合计</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <template v-for="(item,index) in releasePriceList">
          <el-row
            class="tableContent"
            :key="index"
          >
            <el-col
              :span="3"
              class="flowEnterSelect"
            >
              <!-- <el-input-number :min="0" size="mini" v-model="releasePriceList[index].goodPrice"></el-input-number> -->
              <el-input
                min="0"
                type="number"
                v-model="releasePriceList[index].goodPrice"
              ></el-input>
            </el-col>
            <el-col
              :span="2"
              class="textInput"
            >
              <el-input
                :min="0"
                type="number"
                v-model="releasePriceList[index].courierFee"
                placeholder="快递费"
              ></el-input>
            </el-col>
            <el-col
              :span="2"
              class="textInput"
            >
              <el-input
                v-model="releasePriceList[index].goodSize"
                :disabled="priceType==1"
                placeholder="指定型号"
              ></el-input>
            </el-col>
            <el-col
              :span="3"
              class
            >
              <el-input-number
                :min="1"
                size="mini"
                v-model="releasePriceList[index].goodNumber"
              ></el-input-number>
              <!-- <el-input v-model="releasePriceList[index].goodNumber" placeholder="拍下件数"></el-input> -->
            </el-col>
            <el-col :span="3">
              <el-input-number
                :min="1"
                size="mini"
                v-model="releasePriceList[index].taskNum"
              ></el-input-number>
            </el-col>
            <el-col :span="3">{{releasePriceList[index].goodPrice*releasePriceList[index].goodNumber |percent}}</el-col>
            <el-col :span="2">{{releasePriceList[index].commission}}</el-col>
            <el-col :span="2">{{releasePriceList[index].courierFee}}</el-col>
            <el-col :span="2">{{releasePriceList[index].totlePrice}}</el-col>
            <el-col :span="2">
              <el-button
                v-if="index!=0"
                type="danger"
                size="mini"
                @click="deletePathData(index)"
                style="border-radius:25px"
              >删除</el-button>
            </el-col>
          </el-row>
        </template>
      </div>
      <div class="totle">
        <el-row>
          <el-col
            :span="6"
            class="left"
          >成交总金额: {{alltotle.totalAmount}}元</el-col>
          <el-col
            :span="6"
            class="right"
          >佣金总金额: {{alltotle.commissionAmount}}元</el-col>
          <el-col
            :span="6"
            class="right"
          >其中快递费总金额: {{alltotle.feeAmount}}元</el-col>
          <el-col
            :span="6"
            class="right"
          >合计: {{alltotle.all}}</el-col>
        </el-row>
      </div>

      <time-com></time-com>

    </div>
    <btn-group
      :btn-active="btnActive"
      show-go-btn="0"
      @btnClick="btnClick"
    ></btn-group>
  </div>
</template>
<script>
import btnGroup from "./components/btnGroup.vue";
import timeCom from "./components/timecom.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    btnGroup,
    timeCom
  },
  data() {
    return {
      totle: "0",
      pctotle: "0",
      apptotle: "0",
      btnActive: 0,
      priceType: 1,
      releasePriceList: [
        {
          goodPrice: "0", //商品价格
          courierFee: "0", //快递费
          goodSize: "", // 商品规格
          goodNumber: "1", // 拍下数量
          taskNum: "1", //任务数量
          turnover: "0", //单任务成交金额
          commission: "0", //单任务佣金
          fee: "0", //单任务快递费
          totlePrice: "0" //合计,
        }
      ],
      alltotle: {
        totalAmount: 0,
        commissionAmount: 0,
        feeAmount: 0,
        all: 0
      }
    };
  },
  watch: {
    releasePriceList: {
      handler(newValue, oldValue) {
        let totalAmount = 0,
          commissionAmount = 0,
          feeAmount = 0,
          all = 0;
        newValue.forEach(item => {
          let num = item.goodPrice;
          if (num <= 200) {
            item.commission = 18;
          } else if (num > 200 && num <= 400) {
            item.commission = 20;
          } else if (num > 400 && num <= 600) {
            item.commission = 22;
          } else if (num > 600 && num <= 800) {
            item.commission = 24;
          } else if (num > 800 && num <= 1000) {
            item.commission = 26;
          } else {
            item.commission = 26;
          }
          // 计算单项总金额
          item.totlePrice =
            (parseFloat(item.goodPrice) * parseFloat(item.goodNumber) +
              parseFloat(item.courierFee)) *
              parseFloat(item.taskNum) +
            parseFloat(item.taskNum) * parseFloat(item.commission);
          // 计算全部成交金额
          totalAmount +=
            (parseFloat(item.goodPrice) * parseFloat(item.goodNumber) +
              parseFloat(item.courierFee)) *
            parseFloat(item.taskNum);
          // 佣金金额
          commissionAmount +=
            parseFloat(item.taskNum) * parseFloat(item.commission);
          // 快递费
          feeAmount += parseFloat(item.courierFee) * parseFloat(item.taskNum);
          // 总金额
          all += item.totlePrice;
          if (item.goodPrice > 100) {
            this.$notify.error({
              title: "该任务风险较大，平台只能尽量匹配安全系数高的账号，但平台不承担相应风险，建议商家使用隐藏优惠券"
            });
          }
        });
        this.alltotle.totalAmount = totalAmount.toFixed(2);
        this.alltotle.commissionAmount = commissionAmount;
        this.alltotle.feeAmount = feeAmount;
        this.alltotle.all = all.toFixed(2);
        let taskTotle = 0;
        this.releasePriceList.forEach(item => {
          taskTotle += item.taskNum;
        });
        this.alltask = taskTotle;
        if (taskTotle > this.gettask.totle) {
          this.$notify.error({
            title: "任务数超过上一步骤"
          });
        }
        this.$store.commit("update", {
          name: "releasePriceList",
          value: newValue
        });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["gettask"])
  },
  methods: {
    btnClick(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "secondStep" });
      } else {
        if (this.alltask != this.gettask.totle) {
          this.$notify.error({
            title: "请确认任务数一致"
          });
          return;
        }
        let list = this.releasePriceList;
        let flag = false;
        list.forEach(item => {
          if (item.goodPrice <= 0) {
            flag = true;
          }
        });
        if (flag) {
          this.$notify.error({
            title: "商品价格不能为0"
          });
          return;
        }

        this.$emit("changeState", { state: "fourStep" });
      }
    },
    deletePathData(index) {
      this.releasePriceList.splice(index, 1);
    },
    addPathData() {
      this.releasePriceList.push({
        goodPrice: "0", //商品价格
        courierFee: "0", //快递费
        goodSize: "", // 商品规格
        goodNumber: "1", // 拍下数量
        taskNum: "1", //任务数量
        turnover: "0", //单任务成交金额
        commission: "0", //单任务佣金
        fee: "0", //单任务快递费
        totlePrice: "0" //合计,
      });
    }
  }
};
</script>
<style lang="less" scoped>
.totle {
  background: #ccebfa;
  padding: 0 20px;
  .el-row {
    padding: 10px 0;
  }
}
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
