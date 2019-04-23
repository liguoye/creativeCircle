<template>
  <div class="time-box">
    <div class="title">
      <el-row>
        <el-col :span="12" class="left">
          <span>发布时间:</span>
          <el-radio-group v-model="priceType">
            <el-radio :label="1">立刻发布</el-radio>
            <el-radio :label="2">今日平均发布</el-radio>
            <el-radio :label="2">多天平均发布</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="right">
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
              <el-button class="tableBtn" type="primary" @click="addPathData">新增</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="funTable">
      <el-row class="tableTitle">
        <el-col :span="3">日期（剩余发布数）</el-col>
        <el-col :span="3">任务数</el-col>
        <el-col :span="6">开始时间</el-col>
        <el-col :span="6">结束时间</el-col>
        <el-col :span="6">超时取消</el-col>
      </el-row>
      <template v-for="(item,index) in releasePriceList">
        <el-row class="tableContent" :key="index">
          <el-col :span="3">{{}}</el-col>
          <el-col :span="3">
            <el-input-number :min="1" size="mini" v-model="releasePriceList[index].goodNumber"></el-input-number>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              size="40"
            ></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
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
      },
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
  computed: {
    ...mapGetters(["gettask"])
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
.funTable .el-input__inner{
    height: 40px;
}
</style>