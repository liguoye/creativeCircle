<template>
  <div class="cuteHand">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div style="overflow: hidden;">
          <p class="title">一、开通智能助手流程:</p>
          <div style="overflow: hidden; padding-left: 34px; margin-bottom: 35px; margin-top: 20px;">
            <div class="float_pent">
              <div>
                <div>
                  <img src="../../../assets/picture/dg_icon.png">
                </div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">点击订购</div>
              </div>
              <div style="position: absolute; top: 0px; right: 0px; width: 70%;">
                <div style="color: rgb(193, 193, 193); margin-bottom: 8px;">【根据相关链接购买服务】</div>
                <div style="position: relative;">
                  <div style="width: 91%; border-bottom: 3px dashed rgb(193, 193, 193);"></div>
                </div>
              </div>
            </div>
            <div class="float_pent">
              <div>
                <div>
                  <img src="../../../assets/picture/sq_icon.png">
                </div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">点击授权</div>
              </div>
              <div style="position: absolute; top: 0px; right: 0px; width: 58%;">
                <div style="color: rgb(193, 193, 193); margin-bottom: 8px;">【登入店铺用淘宝主账号授权】</div>
                <div style="position: relative;">
                  <div style="width: 91%; border-bottom: 3px dashed rgb(193, 193, 193);"></div>
                </div>
              </div>
            </div>
            <div class="float_pent" style="width: 233px;">
              <div>
                <div>
                  <img src="../../../assets/picture/xf_icon.png">
                </div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">点击续费</div>
              </div>
              <div style="position: absolute; top: 0px; right: 0px; width: 73%;">
                <div style="color: rgb(193, 193, 193); margin-bottom: 8px;">【选择开通时长，平台扣费，完成扣费联系顾问对接】</div>
                <div style="position: relative;">
                  <div style="width: 91%; border-bottom: 3px dashed rgb(193, 193, 193);"></div>
                </div>
              </div>
            </div>
            <div class="float_pent">
              <div>
                <div>
                  <img src="../../../assets/picture/cg_icon.png">
                </div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">开通成功</div>
              </div>
              <div style="position: absolute; top: 0px; right: 0px; width: 58%;">
                <div style="color: rgb(193, 193, 193); margin-bottom: 8px;">【对智能助手设置标记备注】</div>
                <div style="position: relative;">
                  <div style="width: 91%; border-bottom: 3px dashed rgb(193, 193, 193);"></div>
                </div>
              </div>
            </div>
            <div class="float_pent" style="width: 70px; text-align: center;">
              <div>
                <div>
                  <img src="../../../assets/picture/bz_icon.png">>
                </div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">备注设置</div>
              </div>
            </div>
          </div>
          <p class="title">
            二、已绑定店铺信息
            <span class="red">（为保证能正常发布任务，当智能助手有效期≤3天时，请及时联系顾问进行续费）</span>
          </p>

          <div class="tableCom">
            <el-table :data="shopMsgData.data" border style="width: 100%" :height="shopMsgData.tableHeight">
              <template v-for="(item,index) in shopMsgData.columns">
                <template v-if="item.com=='btn'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <!-- <el-button
                        class="tableCellBtn"
                        type="primary"
                        size="mini"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>-->
                      <el-button class="tableCellBtn" type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="item.com=='date'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <div class="tableCellDate">
                        <p>{{shopMsgData.data[scope.$index][item.code]}}</p>
                        <p v-if="item.code=='interfaceValid'">
                          <span v-if="shopMsgData.data[scope.$index].taobao_endtime!=null">{{shopMsgData.data[scope.$index].taobao_endtime
                            }}</span>
                          <span @click="openDinggou(shopMsgData.data[scope.$index].id)">订购</span>
                          <span>
                            <a style="text-decoration: none;" target="_blank" href="http://top.mishion.com/api/top/bind/8022">授权</a>
                          </span>
                        </p>
                        <p v-if="item.code=='smartValid'">
                          <span style="color:#666">{{shopMsgData.data[scope.$index].endtime| format}}</span>
                          <span @click="openDinggou(shopMsgData.data[scope.$index].id)">续费</span>
                        </p>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="item.com=='flag'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <div class="plate">
                        <p v-if="shopMsgData.data[scope.$index]['status']==0">未审核</p>
                        <p v-else-if="shopMsgData.data[scope.$index]['status']==1">审核不通过</p>
                        <p v-else-if="shopMsgData.data[scope.$index]['status']==2">审核通过</p>
                        <p v-else>其他</p>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center"></el-table-column>
                </template>
              </template>
            </el-table>
          </div>
          <div class="btnGroup">
            <p class="title">三、订单标记反馈</p>
            <el-row>
              <el-col :span="20" class="formGroup" style="text-align:left !important;width:calc(100% - 130px)">
                <el-select v-model="formData.type_find.value" placeholder="请选择">
                  <el-option v-for="item in formData.type_find.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
                <span>标记反馈状态</span>
                <el-select v-model="formData.notic.value" placeholder="请选择">
                  <el-option v-for="item in formData.notic.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span>支付时间</span>
                <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期"></el-date-picker>
              </el-col>
              <el-col :span="4" style="line-height:40px;width:130px;">
                <el-button class="tablebtnActive" @click="getOrderList('param')">查询</el-button>
                <el-button class="tablebtnFFF" @click="getOrderList()">刷新</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table">
            <table-com :data="tableData.data" :columns="tableData.columns" :total='totle' edit @handleCurrentChange='currentChange'>

            </table-com>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="settingDialogCom">
      <el-dialog title="提示" :visible.sync="powerDialogShow" width="30%">
        <span>您是否授权成功？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="powerDialogShow = false">授权遇到问题</el-button>
          <el-button type="primary" @click="powerDialogShow = false">授权成功</el-button>
        </span>
      </el-dialog>
    </div>
    <renew-dialog :shopid="shopid" @dialogClose="dialogClose" :dialog-table-visible="renewDialogShow"></renew-dialog>
    <look-detail-dialog @dialogClose="lookDetailDialogClose" :dialog-table-visible="lookDetailDialogShow" :passdata="editData"></look-detail-dialog>
    <flag-dialog :shopid="shopid" @dialogClose="dialogClose" :dialog-table-visible="renewDialogShow"></flag-dialog>
  </div>
</template>
<script>
import navList from "../components/treeNavList.vue";
import tableCom from "@/components/tableCom.vue";
import renewDialog from "./components/renewDialog.vue";
import lookDetailDialog from "../shopManagement/components/lookDetailDialog";
import flagDialog from "./components/flagDialog";
export default {
  components: {
    navList,
    renewDialog,
    tableCom,
    lookDetailDialog,
    flagDialog
  },
  props: {},
  data () {
    return {
      lookDetailDialogShow: false,
      editData: {},
      currentTab: "cuteHand",
      renewDialogShow: false,
      powerDialogShow: false,
      shopMsgData: {
        data: [],
        columns: [
          { name: "平台", code: "type", width: "120" },
          { name: "店铺名称", code: "shop_name", width: "190" },
          { name: "状态", code: "status", width: "80", com: "flag" },
          {
            name: "智能助手有效期",
            code: "smartValid",
            width: "200",
            com: "date"
          },
          {
            name: "淘宝服务接口有效期",
            code: "interfaceValid",
            width: "200",
            com: "date"
          },
          { name: "操作", code: "handle", width: "", com: "btn" }
        ],
        tableHeight: 300
      },

      formData: {
        type_find: {
          value: "",
          options: [
            { label: "任务编号", value: 1 },
            { label: "运单号", value: 2 },
            { label: "店铺名称", value: 3 },
            { label: "买号名称", value: 4 },
            { label: "商品编号", value: 5 },
            { label: "商品简称", value: 6 }
          ]
        },
        notic: {
          value: "",
          options: [
            { label: "未标记", value: "未标记" },
            { label: "标记成功", value: "标记成功" }
          ]
        },
        name: "",
        date: ""
      },
      tableData: {
        data: [],
        columns: [
          { name: "任务编号", code: "id", width: "130" },
          { name: "店铺名称", code: "shop_name", width: "" },
          { name: "买号名称", code: "taobao", width: "" },
          { name: "订单编号", code: "ordersn", width: "180" },
          { name: "标记反馈状态", code: "flag", width: "", com: 'hongqi' },
          { name: "下单支付时间", code: "ct", width: "220" },
          { name: "操作", code: "btn", width: "", com: 'btn' }
        ]
      },
      shopid: 0,
      totle: 0,
      currentPage: 1
    };
  },
  created () {
    this.getShopList();
    this.getOrderList();
  },
  methods: {
    currentChange (page) {
      this.currentPage = page;
      this.getOrderList("param");
    },
    lookDetailDialogClose (val) {
      this.lookDetailDialogShow = val;
    },
    handleEdit (a, b) {
      this.editData = b;
      this.lookDetailDialogShow = true;
    },
    openDinggou (id) {
      this.shopid = id;
      this.renewDialogShow = true;
    },
    getShopList () {
      this.$ajax.get("shop/index").then(res => {
        // console.log("店铺列表", res);
        if (res && res.data && res.data.code === 1) {
          //   let list = res.data.data;
          // list.forEach(item => {
          //     if(item.status==1){
          //         item.status='已审核'
          //     }
          // });
          this.shopMsgData.data = res.data.data.data;
        }
      });
    },
    getOrderList (param) {
      let queryParams = {
        params: {
          token: this.$getToken()
        }
      };
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            page: this.currentPage,
            type_find: this.formData.type_find.value,
            notic: this.formData.notic.value,
            name: this.name,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        };
      }
      this.$ajax.get("shopmember/releaseList", queryParams).then(res => {
        //  console.log("订单列表", res);
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data.data;
          this.totle = parseFloat(res.data.data.total);
          //  console.log(this.totle)
        }
      });
    },
    dialogClose (val) {
      this.renewDialogShow = val;
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } });
    }
  }
};
</script>
<style lang="less" scoped>
.cuteHand {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;

  .submitBtn {
    border-radius: 15px;
    margin-left: 10px;
  }
  .el-row {
    width: 100%;
  }
  .navList {
    width: 170px;
  }
  .accountManage {
    padding: 0 40px;
    width: calc(100% - 170px) !important;
    box-sizing: border-box;
    border-left: 1px solid #dfe6ec;
    .btnGroup {
      margin-top: 0;
    }
    .title {
      line-height: 45px;
      font-size: 16px;
      text-align: left;
    }
    .float_pent {
      width: 159px;
      float: left;
      position: relative;
      margin-left: 18px;
      img {
        width: 46px;
        height: 46px;
      }
    }
  }
  .tableCellDate {
    p {
      span {
        background-color: white;
        color: rgb(0, 153, 229);
        cursor: pointer;
      }
    }
  }
}
</style>
