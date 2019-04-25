<template>
  <div class="secondStep">
    <div class="content">
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col
              :span="12"
              class="left"
            >选定商品</el-col>
            <el-col
              :span="12"
              class="right"
            >
              <el-button
                class="tablebtnActive"
                type="primary"
                @click="choiceProductDialogShow=true"
              >选择商品</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-row>
            <el-col :span="5">商品简称</el-col>
            <el-col :span="14">{{getgoods.abbreviation}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品ID</el-col>
            <el-col :span="14">{{getgoods.goodsid}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">店铺名</el-col>
            <el-col :span="14">{{getgoods.shop_name}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品标题</el-col>
            <el-col :span="14">{{getgoods.title}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品链接</el-col>
            <el-col
              :span="14"
              style="text-align:center;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
            >
              <span>{{getgoods.url}}</span>
            </el-col>
          </el-row>
          <img
            class="goods-img"
            :src="getgoods.img"
            alt
            srcset
          >
        </div>
      </div>
      <div
        class="colTable"
        v-for="(item2,key2,index2) in allList"
        :key="index2"
      >
        <div class="title">
          <el-row>
            <el-col
              :span="12"
              class="left"
            >{{item2.title}}</el-col>
            <el-col
              :span="12"
              class="right"
            >
              <el-row>
                <el-col :span="20">
                  <div class="right-container">
                    <span style="margin-right: 10px;">
                      总数:
                      <em class="red">{{item2.totle}}</em>
                    </span>
                    <span style="margin-right: 10px;">
                      PC:
                      <em class="red">{{item2.pctotle}}</em>
                    </span>
                    <span style="margin-right: 10px;">
                      无线端:
                      <em class="red">{{item2.app}}</em>
                    </span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-button
                    class="tableBtn"
                    type="primary"
                    @click="addPathData(key2,'1')"
                  >新增</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="funTable">
          <el-row class="tableTitle">
            <el-col :span="3">流量入口</el-col>
            <el-col :span="3">
              浏览关键字
              <span>（选填）</span>
            </el-col>
            <el-col :span="3">下单关键字</el-col>
            <el-col :span="5">
              浏览商品价格区间
              <span>（选填）</span>)
            </el-col>
            <el-col :span="3">天数</el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="2">
              其他筛选条件
              <span>（可选）</span>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <template v-for="(item,index) in item2.list">
            <el-row
              class="tableContent"
              :style="allList[key2].list[index].flowid==4?'height:60px;line-height:60px':''"
              :key="index"
            >
              <el-col
                :span="3"
                class="flowEnterSelect"
              >
                <el-select
                  @change="change(key2,index)"
                  v-model="allList[key2].list[index].flowid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="clist in allList[key2].list[index].flowList.options"
                    :key="clist.value"
                    :label="clist.label"
                    :value="clist.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList[key2].list[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload(key2,index)"
                >
                  <img
                    v-if="allList[key2].list[index].keyword1"
                    :src="allList[key2].list[index].keyword1"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList[key2].list[index].keyword1"
                  placeholder="请设置浏览(类目核心词,长尾词,热搜词"
                ></el-input>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList[key2].list[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload(key2,index)"
                >
                  <img
                    v-if="allList[key2].list[index].keyword"
                    :src="allList[key2].list[index].keyword"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList[key2].list[index].keyword"
                  placeholder="请设置下单关键字"
                ></el-input>
              </el-col>
              <el-col
                :span="5"
                class="section"
              >
                <el-input
                  v-model="allList[key2].list[index].beginPrice"
                  placeholder="最低价"
                ></el-input>～
                <el-input
                  v-model="allList[key2].list[index].endPrice"
                  placeholder="最高价"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-input-number
                  size="mini"
                  :min='0'
                  v-model="allList[key2].list[index].appointmentDays"
                ></el-input-number>
              </el-col>
              <el-col :span="3">
                <el-input-number
                  size="mini"
                  :min='0'
                  v-model="allList[key2].list[index].taskNum"
                ></el-input-number>
              </el-col>
              <el-col :span="2">
                <el-button
                  class="tableBtn"
                  type="primary"
                  @click="settingClick(key2,index)"
                >设置</el-button>
              </el-col>
              <el-col :span="2">
                <el-button
                  v-if="index!=0"
                  type="danger"
                  size="mini"
                  @click="deletePathData(key2,index)"
                  style="border-radius:25px"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
    <btn-group
      :show-back-btn="showBackBtn"
      :show-go-btn="showGoBtn"
      @btnClick="btnClick"
    ></btn-group>

    <div
      v-for="(item,key,index) in allList"
      :key="index"
    >
      {{key}}:<br />{{item}}
    </div>
    <setting-dialog-com
      :dialog-table-visible="dialogTableVisible"
      @dialogClose="settingDialogClose"
      @dialogConfirm="settingDialogConfirm"
      :setting-data="pathSettingIndexData"
    ></setting-dialog-com>
    <choice-product-dialog
      @dialogClose="choiceDialogClose"
      @dialogConfirm="choiceDialogConfirm"
      :dialog-table-visible="choiceProductDialogShow"
    ></choice-product-dialog>
  </div>
</template>
<script>
import btnGroup from "../components/btnGroup.vue";
import settingDialogCom from "@/components/settingDialogCom2.vue";
import choiceProductDialog from "@/components/choiceProductDialog.vue";

import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    btnGroup,
    choiceProductDialog,
    settingDialogCom
  },
  data() {
    return {
      totle: "0",
      pctotle: "0",
      apptotle: "0",
      radio: "1",
      dialogTableVisible: false,
      choiceProductDialogShow: false,
      pathSettingIndexData: {},
      pathSetIndex2: 0,
      pathSetIndex: 0,
      goodsData: {},
      allList: {
        zuji: {
          title: "足迹",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "111111111111111111", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "1", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        },
        gouwuche: {
          title: "加入购物车",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "2", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        },
        shoucang: {
          title: "收藏商品",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "3", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        },
        weitao: {
          title: "微淘",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "4", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        },
        xihuan: {
          title: "猜你喜欢",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "5", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        },
        guanjianzi: {
          title: "收索关键字",
          totle: "0",
          pctotle: "0",
          apptotle: "0",
          list: [
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
              taskNum: "1",
              sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
              beginPrice: "", // 价格区间起始
              endPrice: "", // 价格区间最大值
              shipment: "", // 发货地
              otherCondition: "", // 其他
              appointmentType: "6", //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
              appointmentDays: "", //预约天数
              repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
            }
          ]
        }
      },
      itemindex: "",
      showBackBtn: "2",
      showGoBtn: "1",
      goodsInfo: {}
    };
  },
  watch: {
    pathSettingData: {
      handler(val, oldVal) {
        let totle = 0,
          pctotle = 0,
          apptotle = 0;
        val.forEach(item => {
          totle += item.taskNum;
          if (item.flowid == 3 || item.flowid == 5) {
            pctotle += item.taskNum;
          }
          if (item.flowid == 1 || item.flowid == 2 || item.flowid == 5) {
            apptotle += item.taskNum;
          }
          if (item.flowid == "" || item.keyword == "") {
            this.showGoBtn = "1";
          } else if (parseFloat(item.beginPrice) >= parseFloat(item.endPrice)) {
            this.showGoBtn = "1";
          } else {
            this.showGoBtn = "2";
          }
          if (item.beginPrice == "" || item.endPrice == "") {
            this.showGoBtn = "1";
          }
        });
        this.totle = totle;
        this.pctotle = pctotle;
        this.apptotle = apptotle;
        if (this.totle < 1) {
          this.showGoBtn = "1";
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["getgoods"]),
    ...mapGetters(["getdata"]),
    ...mapGetters(["getdate"])
  },
  created() {
    this.pathSettingData = this.getdata.releaseFlowList;
    this.goodsInfo = this.getgoods;
  },
  methods: {
    choiceDialogConfirm(row) {
      this.goodsData = row;
    },
    settingDialogClose() {
      this.dialogTableVisible = false;
    },
    choiceDialogClose() {
      this.choiceProductDialogShow = false;
    },
    settingClick(index2, index) {
      this.pathSetIndex2 = index2;
      this.pathSetIndex = index;
      this.pathSettingIndexData = this.allList[index2].list[index];
      this.dialogTableVisible = true;
    },
    settingDialogConfirm(param) {
      let index2 = this.pathSetIndex2;
      let index = this.pathSetIndex;
      let list = this.allList[index2].list;
      for (let item in param) {
        this.allList[index2].list[index][item] = param[item];
      }
    },
    addPathData(key2) {
      console.log(key2);
      //   if (this.getdata.goodsid == "") {
      //     this.$notify.error({
      //       title: "请先选择产品"
      //     });
      //     return;
      //   }
      let type = "";
      switch (key2) {
        case "zuji":
          type = 1;
          break;
        case "gouwuche":
          type = 2;
          break;
        case "shoucang":
          type = 3;
          break;
        case "weitao":
          type = 4;
          break;
        case "xihuan":
          type = 5;
          break;
        case "guanjianzi":
          type = 3;
          break;

        default:
          break;
      }
      this.allList[key2].list.push({
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
        taskNum: "1",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: "", // 价格区间起始
        endPrice: "", // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "", // 其他
        appointmentType: type, //预约任务必填，预约类型1足      迹，2加购物车，3收藏商品，4微淘，5猜你喜欢
        appointmentDays: "", //预约天数
        repurchaseType: "" //复购任务类型，1店铺复购，2商品复购
      });
    },
    deletePathData(key2,index) {
        let type = "";
      switch (key2) {
        case "zuji":
          type = 1;
          break;
        case "gouwuche":
          type = 2;
          break;
        case "shoucang":
          type = 3;
          break;
        case "weitao":
          type = 4;
          break;
        case "xihuan":
          type = 5;
          break;
        case "guanjianzi":
          type = 3;
          break;

        default:
          break;
      }
      this.allList[key2].list.splice(index, 1);
    },
    btnClick(val) {
      if (this.getdata.goodsid == "") {
        this.$notify.error({
          title: "请先选择商品"
        });
        return;
      }

      if (val === "back") {
        this.$emit("changeState", { state: "firstStep" });
      } else {
        let isval = this.getdate.code;
        console.log(isval);
        if (isval == "1") {
          if (this.showGoBtn === "2") {
            let task = {};
            task.totle = this.totle;
            task.pctotle = this.pctotle;
            task.apptotle = this.apptotle;

            this.$store.commit("settask", task);
            this.$emit("changeState", { state: "thirdStep" });
            this.$store.commit("update", {
              name: "releaseFlowList",
              value: this.pathSettingData
            });
          }
        } else {
          this.$notify.error({
            title: "智能助手已过期"
          });
        }
      }
    },
    handleAvatarSuccess(data) {
      console.log(data);
      let index = this.itemindex;
       this.allList[this.pathSetIndex2].list[this.pathSetIndex].keyword1 =
        "http://h5om.knowsea.cn" + data.data;
    },
    beforeAvatarUpload(key2,index) {
      this.pathSetIndex2= key2
      this.pathSetIndex= index
      console.log(key2,index)
    },
    handleAvatarSuccess2(data) {
      console.log(data);
      let index = this.itemindex;
       this.allList[this.pathSetIndex2].list[this.pathSetIndex].keyword =
        "http://h5om.knowsea.cn" + data.data;
    },
    change(index) {
      let list = this.pathSettingData;
      for (let i in list) {
        if (i == index) {
          list[i].keyword = "";
          list[i].keyword1 = "";
        }
      }
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
