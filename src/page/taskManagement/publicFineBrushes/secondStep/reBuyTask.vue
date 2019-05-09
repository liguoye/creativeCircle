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
              <a :href="getgoods.url" target="_blank">{{getgoods.url}}</a>
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
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col
              :span="12"
              class="left"
            >店铺复购（针对店铺--指定买过该店铺商品的买手接手任务）</el-col>
            <el-col
              :span="12"
              class="right"
            >
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
            <el-col :span="2">流量入口</el-col>
            <el-col :span="3">
              浏览关键字
              <span>（选填）</span>
            </el-col>
            <el-col :span="3">下单关键字</el-col>
            <el-col :span="4">
              浏览商品价格区间
              <span>（选填）</span>)
            </el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="3">复购周期</el-col>
            <el-col :span="2">潜在用户</el-col>
            <el-col :span="2">
              其他筛选条件
              <!---->
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <template v-for="(item,index) in allList.pathSettingData">
            <el-row
              class="tableContent"
              :style="allList.pathSettingData[index].flowid==4?'height:60px;line-height:60px':''"
              :key="index"
            >
              <el-col
                :span="2"
                class="flowEnterSelect"
              >
                <el-select
                  @change="change(index)"
                  v-model="allList.pathSettingData[index].flowid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="list in flowList.options"
                    :key="list.value"
                    :label="list.label"
                    :value="list.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList.pathSettingData[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="allList.pathSettingData[index].keyword1"
                    :src="allList.pathSettingData[index].keyword1"
                    class="avatar"
                    @click="beforeAvatarUpload(1,index)"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    @click="beforeAvatarUpload(1,index)"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList.pathSettingData[index].keyword1"
                  placeholder="请设置浏览(类目核心词,长尾词,热搜词"
                ></el-input>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList.pathSettingData[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                >
                  <img
                    v-if="allList.pathSettingData[index].keyword"
                    :src="allList.pathSettingData[index].keyword"
                    class="avatar"
                    @click="beforeAvatarUpload(1,index)"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    @click="beforeAvatarUpload(1,index)"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList.pathSettingData[index].keyword"
                  placeholder="请设置下单关键字"
                ></el-input>
              </el-col>
              <el-col
                :span="4"
                class="section"
              >
                <el-input
                  v-model="allList.pathSettingData[index].beginPrice"
                  placeholder="最低价"
                ></el-input>～
                <el-input
                  v-model="allList.pathSettingData[index].endPrice"
                  placeholder="最高价"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-input-number
                  size="mini"
                  :min='0'
                  v-model="allList.pathSettingData[index].taskNum"
                ></el-input-number>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="allList.pathSettingData[index].day"
                  placeholder="请选择"
                >
                  <el-option
                    label="5天以上，30天以内"
                    value="1"
                  ></el-option>
                  <el-option
                    label="30天以上，60天以内"
                    value="2"
                  ></el-option>
                  <el-option
                    label="60天以上，90天以内"
                    value="3"
                  ></el-option>
                  <el-option
                    label="90天以上"
                    value="4"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                {{allList.pathSettingData[index].roundid | member}}
              </el-col>
              <el-col :span="2">
                <el-button
                  class="tableBtn"
                  type="primary"
                  @click="settingClick(index)"
                >设置</el-button>
              </el-col>
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
      </div>
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col
              :span="12"
              class="left"
            >商品复购（针对商品--指定买过该商品的买手接手任务）</el-col>
            <el-col
              :span="12"
              class="right"
            >
              <el-row>
                <el-col :span="20">
                  <div class="right-container">
                    <span style="margin-right: 10px;">
                      总数:
                      <em class="red">{{totle2}}</em>
                    </span>
                    <span style="margin-right: 10px;">
                      PC:
                      <em class="red">{{pctotle2}}</em>
                    </span>
                    <span style="margin-right: 10px;">
                      无线端:
                      <em class="red">{{apptotle2}}</em>
                    </span>
                    <a class="btn btn-small">新增</a>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-button
                    class="tableBtn"
                    type="primary"
                    @click="addPathData2"
                  >新增</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="funTable">
          <el-row class="tableTitle">
            <el-col :span="2">流量入口</el-col>
            <el-col :span="3">
              浏览关键字
              <span>（选填）</span>
            </el-col>
            <el-col :span="3">下单关键字</el-col>
            <el-col :span="4">
              浏览商品价格区间
              <span>（选填）</span>)
            </el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="3">复购周期</el-col>
            <el-col :span="2">潜在用户</el-col>
            <el-col :span="2">
              其他筛选条件
              <!---->
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <template v-for="(item,index) in allList.pathSettingData2">
            <el-row
              class="tableContent"
              :style="allList.pathSettingData2[index].flowid==4?'height:60px;line-height:60px':''"
              :key="index"
            >
              <el-col
                :span="2"
                class="flowEnterSelect"
              >
                <el-select
                  @change="change(index)"
                  v-model="allList.pathSettingData2[index].flowid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="list in flowList.options"
                    :key="list.value"
                    :label="list.label"
                    :value="list.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList.pathSettingData2[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="allList.pathSettingData2[index].keyword1"
                    :src="allList.pathSettingData2[index].keyword1"
                    class="avatar"
                    @click="beforeAvatarUpload(2,index)"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    @click="beforeAvatarUpload(2,index)"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList.pathSettingData2[index].keyword1"
                  placeholder="请设置浏览(类目核心词,长尾词,热搜词"
                ></el-input>
              </el-col>
              <el-col
                :span="3"
                class="textInput"
              >
                <el-upload
                  v-if="allList.pathSettingData2[index].flowid==4"
                  class="avatar-uploader"
                  action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                >
                  <img
                    v-if="allList.pathSettingData2[index].keyword"
                    :src="allList.pathSettingData2[index].keyword"
                    class="avatar"
                    @click="beforeAvatarUpload(2,index)"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    @click="beforeAvatarUpload(2,index)"
                  ></i>
                </el-upload>
                <el-input
                  v-else
                  v-model="allList.pathSettingData2[index].keyword"
                  placeholder="请设置下单关键字"
                ></el-input>
              </el-col>
              <el-col
                :span="4"
                class="section"
              >
                <el-input
                  v-model="allList.pathSettingData2[index].beginPrice"
                  placeholder="最低价"
                ></el-input>～
                <el-input
                  v-model="allList.pathSettingData2[index].endPrice"
                  placeholder="最高价"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-input-number
                  size="mini"
                  :min='0'
                  v-model="allList.pathSettingData2[index].taskNum"
                ></el-input-number>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="allList.pathSettingData2[index].day"
                  placeholder="请选择"
                >
                  <el-option
                    label="5天以上，30天以内"
                    value="1"
                  ></el-option>
                  <el-option
                    label="30天以上，60天以内"
                    value="2"
                  ></el-option>
                  <el-option
                    label="60天以上，90天以内"
                    value="3"
                  ></el-option>
                  <el-option
                    label="90天以上"
                    value="4"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                {{allList.pathSettingData2[index].roundid | member}}
              </el-col>
              <el-col :span="2">
                <el-button
                  class="tableBtn"
                  type="primary"
                  @click="settingClick2(index)"
                >设置</el-button>
              </el-col>
              <el-col :span="2">
                <el-button
                  v-if="index!=0"
                  type="danger"
                  size="mini"
                  @click="deletePathData2(index)"
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
      totle2: "0",
      pctotle2: "0",
      apptotle2: "0",
      radio: "1",
      dialogTableVisible: false,
      choiceProductDialogShow: false,
      pathSettingIndexData: {},
      pathSetIndex: 0,
      goodsData: {},
      allList: {
        pathSettingData: [
          {
            day: "",
            flowid: "",
            keyword1: "",
            keyword: "",
            taskNum: "1",
            sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
            beginPrice: "", // 价格区间起始
            endPrice: "", // 价格区间最大值
            shipment: "", // 发货地
            otherCondition: "", // 其他
            repurchaseType:1
          }
        ],
        pathSettingData2: [
          {
            day: "",
            flowid: "",
            keyword1: "",
            keyword: "",
            taskNum: "1",
            sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
            beginPrice: "", // 价格区间起始
            endPrice: "", // 价格区间最大值
            shipment: "", // 发货地
            otherCondition: "", // 其他
            repurchaseType:2
          }
        ]
      },
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
      itemindex: "",
      istop:"",
      showBackBtn: "2",
      showGoBtn: "1",
      goodsInfo: {}
    };
  },
  watch: {
    allList: {
      handler(val, oldVal) {
        let totle = 0,
          pctotle = 0,
          apptotle = 0;
        let totle2 = 0,
          pctotle2 = 0,
          apptotle2 = 0;
        val.pathSettingData.forEach(item => {
            totle += item.taskNum;
          if (item.flowid == 3 || item.flowid == 5) {
            pctotle += item.taskNum;
          }
          if (item.flowid == 1 || item.flowid == 2 || item.flowid == 5) {
            apptotle += item.taskNum;
          }
          if(item.flowid==''||item.keyword==''||item.day==''){
              this.showGoBtn='1'
          }else{
              this.showGoBtn='2'
          }
        });
        this.totle=totle
        this.pctotle=pctotle
        this.apptotle=apptotle
        val.pathSettingData2.forEach(item => {
            totle2 += item.taskNum;
          if (item.flowid == 3 || item.flowid == 5) {
            pctotle2 += item.taskNum;
          }
          if (item.flowid == 1 || item.flowid == 2 || item.flowid == 5) {
            apptotle2 += item.taskNum;
          }
          if(item.flowid==''||item.keyword==''||item.day==''){
              this.showGoBtn='1'
          }else{
              this.showGoBtn='2'
          }
        });
        this.totle2=totle2
        this.pctotle2=pctotle2
        this.apptotle2=apptotle2
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
    settingClick(index) {
      this.pathSetIndex = index;
      this.pathSettingIndexData = this.allList.pathSettingData[index];
      this.dialogTableVisible = true;
    },
    settingDialogConfirm(param) {
    //   console.log(this.allList.pathSettingData[this.pathSetIndex]);
    //   console.log(this.allList.pathSettingData);
    //   console.log("index", this.pathSetIndex);
      for (let item in param) {
        this.allList.pathSettingData[this.pathSetIndex][item] = param[item];
      }
    },
    addPathData() {
      if (this.getdata.goodsid == "") {
        this.$notify.error({
          title: "请先选择产品"
        });
        return;
      }
      this.allList.pathSettingData.push({
        day: "",
        flowid: "",
        keyword: "",
        keyword1: "",
        taskNum: "1",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: "", // 价格区间起始
        endPrice: "", // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "", // 其他,
        repurchaseType:1
      });
    },
    addPathData2() {
      if (this.getdata.goodsid == "") {
        this.$notify.error({
          title: "请先选择产品"
        });
        return;
      }
      this.allList.pathSettingData2.push({
        day: "",
        flowid: "",
        keyword: "",
        keyword1: "",
        taskNum: "1",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: "", // 价格区间起始
        endPrice: "", // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "", // 其他
         repurchaseType:2
      });
    },
    deletePathData(index) {
      this.allList.pathSettingData.splice(index, 1);
    },
    deletePathData2(index) {
      this.allList.pathSettingData2.splice(index, 1);
    },
    btnClick(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "firstStep" });
      } else {
        let isval = this.getdate.code;
        if (isval == "1") {
          if (this.showGoBtn === "2") {
            if (this.getdata.goodsid == "") {
              this.$notify.error({
                title: "请先选择商品"
              });
              return;
            }
            let task = {};
            task.totle = this.totle+this.totle2;
            task.pctotle = this.pctotle+this.pctotle2;
            task.apptotle = this.apptotle+this.apptotle2;

            this.$store.commit("settask", task);
            let allList = this.allList;
            let arr = [];
            Object.keys(allList).forEach(item => {
              allList[item].forEach(item2 => {
                arr.push(item2);
              });
            });
            this.$store.commit("update", {
              name: "releaseFlowList",
              value: arr
            });
            
            this.$emit("changeState", { state: "thirdStep" });
          }
        } else {
          if (this.getdata.goodsid == "") {
            this.$notify.error({
              title: "请先选择商品"
            });
            return;
          }
          this.$notify.error({
            title: "智能助手已过期"
          });
        }
      }
    },
    btnClick2(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "firstStep" });
      } else {
        let isval = this.getdate.code;
        // console.log(isval);
        if (isval == "1") {
          if (this.showGoBtn === "2") {
            if (this.getdata.goodsid == "") {
              this.$notify.error({
                title: "请先选择商品"
              });
              return;
            }
            let task = {};
            task.totle = this.totle;
            task.pctotle = this.pctotle;
            task.apptotle = this.apptotle;

            this.$store.commit("settask", task);
            this.$emit("changeState", { state: "thirdStep" });
            this.$store.commit("update", {
              name: "releaseFlowList",
              value: this.allList.pathSettingData2
            });
          }
        } else {
          if (this.getdata.goodsid == "") {
            this.$notify.error({
              title: "请先选择商品"
            });
            return;
          }
          this.$notify.error({
            title: "智能助手已过期"
          });
        }
      }
    },
    handleAvatarSuccess(data) {
    //   console.log(data);
      let index = this.itemindex;
      let istop=this.istop
      if(istop=='1'){
        this.allList.pathSettingData[index].keyword1 =
        "http://h5om.knowsea.cn" + data.data;
      }else{
          this.allList.pathSettingData2[index].keyword1 =
        "http://h5om.knowsea.cn" + data.data;
      }
    },
    beforeAvatarUpload(top,index) {
      this.itemindex = index;
      this.istop=top
    },
    handleAvatarSuccess2(data) {
    //   console.log(data);
      let index = this.itemindex;
      let istop=this.istop
      if(istop=='1'){
        this.allList.pathSettingData[index].keyword =
        "http://h5om.knowsea.cn" + data.data;
      }else{
          this.allList.pathSettingData2[index].keyword =
        "http://h5om.knowsea.cn" + data.data;
      }
      
    },
    change(index) {
      let list = this.allList.pathSettingData;
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
