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
          <el-col :span="3" class="first-col">
            <i v-if="item.isadd" class="el-icon-circle-plus-outline"></i>
            <i v-else class="el-icon-remove-outline"></i>
            {{}}
          </el-col>
          <el-col :span="3">
            <el-input-number :min="1" size="mini" v-model="releasePriceList[index].goodNumber"></el-input-number>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              v-model="value2"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              v-model="value2"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-col>
          <el-col :span="6">
            <el-time-picker
              v-model="value2"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="任意时间点"
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
          isadd: true,
          taskNum: 1, //任务数量
          beginTime: "19:53", //开始时间
          endTime: "23:59", //结束时间
          tiemout: "23:59", //超时取消
          releaseDay: "2019-04-04" //发布日期
        }
      ],

      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
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
.funTable .el-input__inner {
  height: 40px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 285px;
}
.el-icon-circle-plus-outline,
.el-icon-remove-outline {
  font-size: 30px;
  font-weight: 600;
  color: #67c23a;
  position: relative;
  top: 4px;
  left: 4px;
  cursor: pointer;
}
.el-icon-remove-outline {
  color: #f00;
}
.first-col {
  line-height: 40px !important;
  text-align: left !important;
}
</style>