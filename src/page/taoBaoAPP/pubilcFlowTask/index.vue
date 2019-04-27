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
                    <em class="red">{{count.current}}</em>
                  </span>
                  <span style="margin-right: 10px;">未来0天可发布总数:
                    <em class="red">{{totleTask}}</em>
                  </span>
                  <span style="margin-right: 10px;">PC:
                    <em class="red">{{count.pc}}</em>
                  </span>
                  <span style="margin-right: 10px;">无线端:
                    <em class="red">{{count.app}}</em>
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
                v-model="pathSettingData[index].flowid"
                placeholder="请选择"
              >
                <el-option
                  v-for="list in pathSettingData[index].options"
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
                :disabled="pathSettingData[index].flowid==4"
                v-model="pathSettingData[index].keyword"
                placeholder="请设置关键字"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input-number
                :min='1'
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
    <div class="colTable">
      <timeCom></timeCom>

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
        <el-row
          class="tableContent"
          v-for="(item,index) in releaseValueAddList"
          :key="index"
        >
          <el-col :span="6">
            {{item.title}}
          </el-col>
          <el-col :span="6">
            <el-select
              style="width:100px"
              v-model="item.percent"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>%
          </el-col>
          <el-col :span="4">
            {{item.taskNum}}
          </el-col>
          <el-col :span="4">
            {{item.fee}}
          </el-col>
          <el-col :span="4">
            {{item.price}}
          </el-col>
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
          <el-col :span="4">增值总费用：{{totle}}元</el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <div>
        <span style="margin-top: 28px;">
          <span>任务总数：{{count.current}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="margin-top: 8px;">
            总费用
            <span style="color: rgb(136, 136, 136);">(基础总费用+增值总费用)</span>：
            <span style="font-size: 17px; color: rgb(250, 0, 0);">{{totle}}元</span>
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
        <el-button
          type="primary"
          @click="submit"
        >确认发布</el-button>
      </div>
    </div>
    <div>
      <div
        class="item"
        v-for="(item,index) in getall"
        :key="index"
      >
        <div
          v-for="(item2,index2) in item.goods"
          :key="index2"
        >
          <div>{{index2}}:</div>
          <div>{{item2}}:</div>
        </div>
        <div>{{index}}:</div>
        <div>{{item}}</div>
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
import timeCom from "./timecom";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    settingDialogCom,
    choiceProductDialog,
    timeCom
  },
  data() {
    return {
        
      count: {
        current: 0,
        value: 0,
        pc: 0,
        app: 0
      },
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
          flowid: "",
          options: [
            {
              label: "APP自然搜索",
              value: 1
            },
            {
              label: "淘口令",
              value: 2
            },
            {
              label: "直通车",
              value: 3
            },
            {
              label: "二维码",
              value: 4
            }
          ],
          keyword: "",
          taskNum: "",
          sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
          beginPrice: 0, // 价格区间起始
          endPrice: 0, // 价格区间最大值
          shipment: "", // 发货地
          otherCondition: "" // 其他
        }
      ],
      form: {
        sellerRemark: ""
      },
      publicTiem: "",
      password: "",
      releaseValueAddList: [
        {
          title: "收藏商品",
          ba01Id: 3,
          taskNum: 1,
          price: 0,
          percent: 0,
          fee: 0.2
        },
        {
          title: "收藏店铺",
          ba01Id: 4,
          taskNum: 0,
          price: 0,
          fee: 0.2,
          percent: 0
        },
        {
          title: "加入购物车",
          ba01Id: 5,
          taskNum: 1,
          price: 0,
          fee: 0.2,
          percent: 0
        },
        {
          title: "问大家提问",
          ba01Id: 6,
          taskNum: 0,
          price: 0,
          fee: 0.5,
          percent: 0
        },
        {
          title: "旺旺咨询",
          ba01Id: 7,
          taskNum: 0,
          price: 0,
          fee: 0.5,
          percent: 0
        },
        {
          title: "领优惠券",
          ba01Id: 8,
          taskNum: 0,
          price: 0,
          fee: 0.2,
          percent: 0
        }
      ],
      totle: "",
      options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };
  },
  watch: {
    pathSettingData: {
      handler(n, o) {
        let totle = 0;
        let pc = 0;
        let app = 0;
        n.forEach(item => {
          totle += item.taskNum;
          if (item.flowid.value == 1) {
            app += item.taskNum;
          } else {
            pc += item.taskNum;
          }
        });
        this.count.current = totle;
        this.count.pc = pc;
        this.count.app = app;
      },
      deep: true
    },
    releaseValueAddList: {
      handler(n, o) {
        let pricetotle = 0;
        n.forEach(item => {
          if (item.percet == 0) {
            item.taskNum = 0;
          } else {
            item.taskNum = Math.round(
              (this.count.current * item.percent) / 100
            );
          }
          pricetotle += item.price;
          item.price = item.taskNum * item.fee;
        });

        this.totle = pricetotle;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["getall"]),
    ...mapGetters(["getgoods"]),
    ...mapGetters(["getdata"]),
    ...mapGetters(["getdate"])
  },

  methods: {
    taskTotle() {
      let date = this.getdate;
      console.log(date);
    },
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
        flowid: "",
        options: [
          {
            label: "APP自然搜索",
            value: 1
          },
          {
            label: "淘口令",
            value: 2
          },
          {
            label: "直通车",
            value: 3
          },
          {
            label: "二维码",
            value: 4
          }
        ],
        keyword: "",
        taskNum: "",
        sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: 0, // 价格区间起始
        endPrice: 0, // 价格区间最大值
        shipment: "", // 发货地
        otherCondition: "" // 其他
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
      this.$router.push({
        name: val,
        param: {
          tab: val
        }
      });
    },
    submit() {
      this.$store.commit("update", {
        name: "releaseFlowList",
        value: this.pathSettingData
      });
      this.$store.commit("update", { name: "paypwd", value: this.password });
      let newData = Object.assign({}, this.getdata);
      newData["sellerRemark"] = this.form.sellerRemark;
      newData["releaseValueAddList"] = this.releaseValueAddList;
      Object.keys(newData).forEach(function(key) {
        if (newData[key].constructor === Array) {
          newData[key] = JSON.stringify(newData[key]);
        }
      });
      //   return;
      this.$ajax
        .post("/ShopMember/sendFlow", newData)
        .then(res => {
          console.log(res);
          if (res.data.code == "1") {
              this.$alert('发布成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/flowTaskManagement')
          }
        });
          }
        })
        .catch(err => {});
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
