<template>
  <div class="secondStep">
    <div class="content">
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">选定商品</el-col>
            <el-col :span="12" class="right">
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
          <img class="goods-img" :src="getgoods.img" alt srcset>
        </div>
      </div>
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">来路设置</el-col>
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
                    <a class="btn btn-small">新增</a>
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
            <el-col :span="3">流量入口</el-col>
            <el-col :span="4">
              浏览关键字
              <span>（选填）</span>
            </el-col>
            <el-col :span="4">下单关键字</el-col>
            <el-col :span="4">
              浏览商品价格区间
              <span>（选填）</span>)
            </el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="4">
              其他筛选条件
              <!---->
              <span>（可选）</span>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <template v-for="(item,index) in pathSettingData">
            <el-row
              class="tableContent"
              :style="pathSettingData[index].flowid==4?'height:60px;line-height:60px':''"
              :key="index"
            >
              <el-col :span="3" class="flowEnterSelect">
                <el-select
                  @change="change(index)"
                  v-model="pathSettingData[index].flowid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="list in pathSettingData[index].flowList.options"
                    :key="list.value"
                    :label="list.label"
                    :value="list.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" class="textInput">
                <el-upload
                  v-if="pathSettingData[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload(index)"
                >
                  <img
                    v-if="pathSettingData[index].keyword1"
                    :src="pathSettingData[index].keyword1"
                    class="avatar"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="pathSettingData[index].keyword1"
                  placeholder="请设置浏览(类目核心词,长尾词,热搜词"
                ></el-input>
              </el-col>
              <el-col :span="4" class="textInput">
                <el-upload
                  v-if="pathSettingData[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload(index)"
                >
                  <img
                    v-if="pathSettingData[index].keyword"
                    :src="pathSettingData[index].keyword"
                    class="avatar"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-input v-else v-model="pathSettingData[index].keyword" placeholder="请设置下单关键字"></el-input>
              </el-col>
              <el-col :span="4" class="section">
                <el-input v-model="pathSettingData[index].beginPrice" placeholder="最低价"></el-input>～
                <el-input v-model="pathSettingData[index].endPrice" placeholder="最高价"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input-number size="mini" :min='0' v-model="pathSettingData[index].taskNum"></el-input-number>
              </el-col>
              <el-col :span="4">
                <el-button class="tableBtn" type="primary" @click="settingClick(index)">设置</el-button>
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
    </div>
    <btn-group :show-back-btn="showBackBtn" :show-go-btn="showGoBtn" @btnClick="btnClick"></btn-group>
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
      pathSetIndex: 0,
      goodsData: {},
      pathSettingData: [
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
          otherCondition: "" // 其他
        }
      ],
      itemindex: "",
      showBackBtn: "2",
      showGoBtn: "1",
      goodsInfo:{}
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
        if(this.totle<1){
            this.showGoBtn = "1";
        }
      },
      deep: true
    },
   
  },
  computed: {
    ...mapGetters(["getgoods"]),
    ...mapGetters(["getdata"]),
    ...mapGetters(["getdate"])
  },
  created() {
    this.pathSettingData = this.getdata.releaseFlowList;
    this.goodsInfo=this.getgoods
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
    settingClick(index) {
      this.pathSetIndex = index;
      this.pathSettingIndexData = this.pathSettingData[index];
      this.dialogTableVisible = true;
    },
    settingDialogConfirm(param) {
      console.log(this.pathSettingData[this.pathSetIndex]);
      console.log(this.pathSettingData);
      console.log("index", this.pathSetIndex);
      for (let item in param) {
        this.pathSettingData[this.pathSetIndex][item] = param[item];
      }
    },
    addPathData() {
      if (this.getdata.goodsid == "") {
        this.$notify.error({
          title: "请先选择产品"
        });
        return;
      }
      this.pathSettingData.push({
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
        taskNum: "1",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: "", // 价格区间起始
        endPrice: "", // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "" // 其他
      });
    },
    deletePathData(index) {
      this.pathSettingData.splice(index, 1);
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
        console.log(isval)
        if (isval == "1") {
          if (this.showGoBtn === "2") {
              let task={}
              task.totle=this.totle
              task.pctotle=this.pctotle
              task.apptotle=this.apptotle

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
      this.pathSettingData[index].keyword1 =
        "http://h5om.knowsea.cn" + data.data;
    },
    beforeAvatarUpload(index) {
      this.itemindex = index;
    },
    handleAvatarSuccess2(data) {
      console.log(data);
      let index = this.itemindex;
      this.pathSettingData[index].keyword =
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
