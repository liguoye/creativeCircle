<template>
  <div class="pubilcFlowTask">
    <div class="taskManagementNavList">
      <ul>
        <li
          @click="navListClick('pubilcFlowTask')"
          class="current"
        >发布流量任务</li>
        <li @click="navListClick('flowTaskManagement')">流量任务管理</li>
      </ul>
    </div>

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
          <el-col :span="14">{{goodsData.abbreviation}}</el-col>
          <el-col :span="5"></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品ID</el-col>
          <el-col :span="14">{{goodsData.goodsid}}</el-col>
          <el-col :span="5"></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">店铺名</el-col>
          <el-col :span="14">{{goodsData.shop_name}}</el-col>
          <el-col :span="5"></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品标题</el-col>
          <el-col :span="14">{{goodsData.title}}</el-col>
          <el-col :span="5"></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品链接</el-col>
          <el-col :span="14">{{goodsData.url}}</el-col>
          <el-col :span="5"></el-col>
        </el-row>
      </div>
    </div>
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col
            :span="12"
            class="left"
          >来路设置</el-col>
          <el-col
            :span="12"
            class="right"
          >
            <el-row>
              <el-col :span="20">
                <div class="right-container">
                  <span style="margin-right: 10px;">当前总数:
                    <em class="red">0</em>
                  </span>
                  <span style="margin-right: 10px;">未来0天可发布总数:
                    <em class="red">0</em>
                  </span>
                  <span style="margin-right: 10px;">PC:
                    <em class="red">0</em>
                  </span>
                  <span style="margin-right: 10px;">无线端:
                    <em class="red">0</em>
                  </span>
                  <a class="btn btn-small">新增</a>
                </div>
              </el-col>
              <el-col :span="4">
                <el-button
                  class="tablebtnActive"
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
          <el-col :span="4">流量入口</el-col>
          <el-col :span="10">关键字</el-col>
          <el-col :span="4">数量</el-col>
          <el-col :span="4">其他筛选条件
            <!---->
            <span>（可选）</span>
          </el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <template v-for="(item,index) in pathSettingData">
          <el-row
            class="tableContent"
            :key="index"
          >
            <el-col
              :span="4"
              class="flowEnterSelect"
            >
              <el-select
                v-model="pathSettingData[index].flowid.value"
                placeholder="请选择"
              >
                <el-option
                  v-for="list in pathSettingData[index].flowid.options"
                  :key="list.value"
                  :label="list.label"
                  :value="list.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col
              :span="10"
              class="textInput"
            >
              <el-input
                v-model="pathSettingData[index].keyword"
                placeholder="请设置关键字"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input-number
                size="mini"
                v-model="pathSettingData[index].taskNum"
              ></el-input-number>
            </el-col>
            <el-col :span="4">
              <el-button
                class="tablebtnActive"
                type="primary"
                @click="settingClick(index)"
              >设置</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="danger"
                size='mini'
                @click="deletePathData(index)"
                style="border-radius:25px"
              >删除</el-button>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="margin-top:20px;"
    >
      <el-form-item label="备注信息（选填）：">
        <el-input
          type="textarea"
          v-model="form.sellerRemark"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="funTable">
        <time-com></time-com>
    </div>
    
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col
            :span="24"
            class="left"
          >
            <span style="margin-right:10px;">增值服务</span>
            <span style="color:red">（即日起，增值服务需要收取附加费，同时要求买手上传相应截图证明）</span>
          </el-col>
        </el-row>
      </div>
      <div class="funTable">
        <el-row class="tableTitle">
          <el-col :span="6">任务名称</el-col>
          <el-col :span="6">占比</el-col>
          <el-col :span="4">数量</el-col>
          <el-col :span="4">单价</el-col>
          <el-col :span="4">费用</el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">增值总费用：0.0元</el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <div>
        <span style="margin-top: 28px;">
          <span>任务总数：0&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="margin-top: 8px;">
            总费用
            <span style="color: rgb(136, 136, 136);">(基础总费用+增值总费用)</span>：
            <span style="font-size: 17px; color: rgb(250, 0, 0);">0.0元</span>
          </span>
        </span>
      </div>
      <div
        class="goet"
        style="text-align: right;"
      >
        <span>支付密码：</span>
        <el-input
          v-model="password"
          size="mini"
          style="width:160px;"
        ></el-input>
      </div>
      <div>
        <el-button type="primary">确认发布</el-button>
      </div>
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
import settingDialogCom from "@/components/settingDialogCom.vue";
import choiceProductDialog from "@/components/choiceProductDialog.vue";
import timeCom from "../../taskManagement/publicFineBrushes/components/timecom";
export default {
  components: {
    settingDialogCom,
    choiceProductDialog,
    timeCom
  },
  data() {
    return {
      msg: "pubilcFlowTask",
      btnActive: 1,
      dialogTableVisible: false,
      dialogVisible: false,
      choiceProductDialogShow: false,
      pathSettingIndexData: {},
      goodsData: {},
      pathSettingIndex: 0,
      pathSettingData: [
        {
          flowid: {
            value: "",
            options: [
              { label: "APP自然搜索", value: 1 },
              { label: "淘口令", value: 2 },
              { label: "直通车", value: 3 },
              { label: "二维码", value: 4 }
            ]
          },
          keyword: "",
          taskNum: "",
          sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
          beginPrice: 0, // 价格区间起始
          endPrice: 0, // 价格区间最大值
          shipment: "", // 发货地
          otherCondition: "" // 其他
        }
      ],
      timeData: [
        {
          taskNum: 0,
          beginTime: "",
          endTime: "",
          tiemout: "",
          releaseDay: ""
        }
      ],
      form: {
        sellerRemark: ""
      },
      publicTiem: "",
      password: ""
    };
  },
  methods: {
    choiceDialogConfirm(row) {
      this.goodsData = row;
    },
    choiceDialogClose() {
      this.choiceProductDialogShow = false;
    },
    settingDialogClose() {
      this.dialogTableVisible = false;
    },
    settingDialogConfirm(param) {
      console.log(param);
      for (let item in param) {
        this.pathSettingData[this.pathSettingIndex][item] = param[item];
      }
    },
    addPathData() {
      this.pathSettingData.push({
        flowid: {
          value: "",
          options: [
            { label: "APP自然搜索", value: 1 },
            { label: "淘口令", value: 2 },
            { label: "直通车", value: 3 },
            { label: "二维码", value: 4 }
          ]
        },
        keyword: "",
        taskNum: "",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: 0, // 价格区间起始
        endPrice: 0, // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "" // 其他
      });
    },
    addTimeData() {
      this.timeData.push({
        taskNum: 0,
        beginTime: "",
        endTime: "",
        tiemout: "",
        releaseDay: ""
      });
    },
    deletePathData(index) {
      this.pathSettingData.splice(index, 1);
    },
    settingClick(index) {
      this.pathSettingIndex = index;
      this.pathSettingIndexData = this.pathSettingData[index];
      this.dialogTableVisible = true;
    },
    navListClick(val) {
      this.$router.push({ name: val, param: { tab: val } });
    }
  }
};
</script>
<style lang="less" scoped>
.pubilcFlowTask {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 50px;
  .bottom {
    text-align: right;
    margin-top: 20px;
    > div {
      margin-bottom: 10px;
    }
  }
}

</style>
