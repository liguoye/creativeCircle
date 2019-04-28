<template>
  <div class="time-box">
    <div class="title">
      <el-row>
        <el-col
          :span="12"
          class="left"
        >
          <span>发布时间:</span>
          <el-radio-group v-model="priceType">
            <el-radio :label="1">立刻发布</el-radio>
            <el-radio :label="2">今日平均发布</el-radio>
            <el-radio :label="3">多天平均发布</el-radio>
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
      <template v-for="(item,index) in releaseDateList">
        <el-row
          class="tableContent"
          :key="index"
        >
          <el-col
            :span="3"
            class="first-col"
          >
            <span v-if="priceType!=1">
              <i
                v-if="releaseDateList[index].isadd"
                class="el-icon-circle-plus-outline"
                @click="addPathData(index)"
              ></i>
              <i
                v-else
                class="el-icon-remove-outline"
                @click="reduceData(index)"
              ></i>
            </span>
            <span style="color:#333">
              <span>{{releaseDateList[index].releaseDay}}</span>
            </span>
          </el-col>
          <el-col :span="3">
            <el-input-number
              :min="0"
              size="mini"
              v-model="releaseDateList[index].taskNum"
            ></el-input-number>
          </el-col>
          <el-col :span="6">
            <el-time-select
              placeholder="起始时间"
              :disabled="priceType==1"
              v-model="releaseDateList[index].beginTime"
              :picker-options="{
      start: nowtime,
      step: '00:05',
      end: '23:59'
    }"
            ></el-time-select>
          </el-col>
          <el-col :span="6">
            <el-time-select
              :disabled="priceType==1"
              placeholder="结束时间"
              v-model="releaseDateList[index].endTime"
              :picker-options="{
      start: nowtime,
      step: '00:05',
      end: '23:59'
    }"
            ></el-time-select>
          </el-col>
          <el-col :span="6">
            <el-time-select
              placeholder="超时时间"
              v-model="releaseDateList[index].tiemout"
              :picker-options="{
      start: nowtime,
      step: '00:05',
      end: '23:59'
    }"
            ></el-time-select>
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
      releaseDateList: [
        {
          isadd: true,
          taskNum: 0, //任务数量
          beginTime: "", //开始时间
          endTime: "", //结束时间
          tiemout: "", //超时取消
          releaseDay: "" //发布日期
        }
      ],
      dateList: []
    };
  },
  computed: {
    ...mapGetters(["getdate"]),
    ...mapGetters(["gettask"]),
    nowtime() {
      var myDate = new Date(); //实例一个时间对象；
      let min = myDate.getHours(); //获取系统时，
      let sec = myDate.getMinutes(); //分
      console.log(min + "" + sec);
      return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    }
  },
  watch: {
    priceType(newValue, oldValue) {
      let list = this.releaseDateList;
      let arr = [];
      arr.push(list[0]);
      console.log(arr);
      switch (newValue) {
        case 1:
          this.releaseDateList = arr;
          this.releaseDateList[0].releaseDay = this.dateList[0];
          this.releaseDateList[0].taskNum = this.gettask.totle;
          break;
        case 2:
          let blist = this.dateList;
          if (blist.length == 0) {
            return;
          }
          this.releaseDateList = arr;
          this.releaseDateList[0].isadd = true;
          this.releaseDateList[0].releaseDay = this.dateList[0];
          this.releaseDateList[0].taskNum = 1;
          break;
        case 3:
          let dlist = this.dateList;
          if (dlist.length == 0) {
            return;
          }
          let lpList = [];
          for (let i in dlist) {
            lpList.push({
              isadd: true,
              taskNum: 0, //任务数量
              beginTime: "", //开始时间
              endTime: "", //结束时间
              tiemout: "", //超时取消
              releaseDay: dlist[i] //发布日期
            });
          }
          this.releaseDateList = lpList;

          break;

        default:
          break;
      }
    },
    releaseDateList: {
      handler(val, oldVal) {
          
        let num = 0;
        val.forEach(item => {
          num += item.taskNum;
        });
        // alert(num)
        if (num > this.gettask.totle) {
          this.$notify.error({
            title: "超过上一步任务数"
          });
        }
        this.$store.commit("update", { name: "releaseDateList", value: val });
      },
      deep: true
    },
    getdate(n, o) {
      this.formatTime();
    }
  },
  created() {
    this.formatTime();
  },
  methods: {
    formatTime() {
      let time = this.getdate.data;
      let list = [];
      console.log(time);
      if (time) {
        Object.keys(time).forEach(function(key) {
          console.log(key, time[key]);
          list.push(key);
        });
        this.dateList = list;
        console.log(list);
        this.releaseDateList[0].taskNum = this.gettask.totle;
        this.releaseDateList[0].releaseDay = this.dateList[0];
      }
      
    },
    btnClick(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "secondStep" });
      } else {
        this.$emit("changeState", { state: "fourStep" });
      }
    },
    deletePathData(index) {
      this.releaseDateList.splice(index, 1);
    },
    addPathData(index) {
      let jon = this.releaseDateList[index];
      let njson = Object.assign({}, jon);
      njson.isadd = false;
      this.releaseDateList.splice(index + 1, 0, njson);
    },
    reduceData(index) {
      let len = this.releaseDateList.length;
      console.log(index, len);
      this.releaseDateList.splice(index, 1);
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
.totle {
  background: #ccebfa;
  padding: 0 20px;
  .el-row {
    padding: 10px 0;
  }
}
</style>