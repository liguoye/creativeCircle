<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="publicFineBrushes">
      <div class="formGroup">
        <el-row>
          <el-col
            :span="12"
            style="text-align:left"
          >
            <el-select
              v-model="formData.type.value"
              placeholder="任务类型"
            >
              <el-option
                v-for="item in formData.type.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="formData.status.value"
              placeholder="任务状态"
            >
              <el-option
                v-for="item in formData.status.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="formData.type_find.value"
              placeholder="搜索类型"
            >
              <el-option
                v-for="item in formData.type_find.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="formData.name"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <!-- <el-select v-model="formData.payTime.value" placeholder="请选择">
              <el-option v-for="item in formData.payTime.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
      <div class="btnGroup">
        <el-button
          class="tablebtnActive"
          @click="queryData('param')"
        >查询</el-button>
        <el-button
          class="tablebtnFFF"
          @click="queryData()"
        >刷新</el-button>
        <!-- <el-button class="tablebtnFFF">一键取消</el-button> -->
      </div>
      <div class="tableCom">
        <el-table
          :data="tableData.data"
          border
          style="width: 100%"
          height="400"
        >
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->
          <template v-for="(item,index) in tableData.columns">
            <template v-if="item.code=='type'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p v-if="tableData.data[scope.$index]['type']==1">精刷单任务</p>
                    <p v-if="tableData.data[scope.$index]['type']==2">指定推送</p>
                    <p v-if="tableData.data[scope.$index]['type']==3">复购任务</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='ordersn'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p>任务编号: {{tableData.data[scope.$index]['id']}}</p>
                    <p class="red">(淘宝APP自然搜索)</p>
                    <p v-if="tableData.data[scope.$index]['ordersn']">订单编号：{{tableData.data[scope.$index]['ordersn']}}</p>
                    <p v-if="tableData.data[scope.$index]['express_sn']">圆通快递：{{tableData.data[scope.$index]['express_sn']}}</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='goodMsg'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p>买号: {{tableData.data[scope.$index]['taobao']}}</p>
                    <!-- <span style="color:#4292b9;cursor:pointer" @click="checkBuyerMsg(scope.$index)">查看买号信息</span> -->
                    <p>店铺名称：{{tableData.data[scope.$index]['shop_name']}}</p>
                    <span
                      style="color:#4292b9;cursor:pointer"
                      @click="checkTaskDetail(scope.$index)"
                    >查看任务详情</span>
                    <span
                      style="color:#4292b9;cursor:pointer"
                      @click="editNote(scope.$index)"
                    >修改备注</span>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='price'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p>商品单价: {{tableData.data[scope.$index]['goodPrice']}}元</p>
                    <p>任务总价：{{tableData.data[scope.$index]['goodPrice']*tableData.data[scope.$index]['goodNumber']+tableData.data[scope.$index]['courierFee']}}元</p>
                    <p>发布点：{{tableData.data[scope.$index]['MinLi']/100}}个</p>
                    <p>置顶费用：{{tableData.data[scope.$index]['zdfee']/100}}元</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='status'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='0'"
                    >待接手</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='1'"
                    >进行中</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='2'"
                    >待发货</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='3'"
                    >待完成</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='4'"
                    >已完成</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='5'"
                    >隐藏中</p>
                    <p
                      style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;"
                      v-if="tableData.data[scope.$index]['status']=='6'"
                    >已取消</p>
                    <p>发布时间：{{tableData.data[scope.$index]['ct']}}</p>
                    <p>接手时间：{{tableData.data[scope.$index]['taskfristTime']}}</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='btn'">
              <el-table-column
                :key="index"
                :width="item.width"
                :prop="item.code"
                :label="item.name"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                  v-if="tableData.data[scope.$index]['status']!=6"
                    type="primary"
                    size="mini"
                    style="border-radius:25px;;cursor:pointer"
                    @click="customerIn(scope.$index)"
                  >客服介入</el-button>
                  <el-button
                    v-if="tableData.data[scope.$index]['status']>1&&tableData.data[scope.$index]['status']!=6"
                    type="warning"
                    size="mini"
                    style="border-radius:25px;margin-left:0;margin-top:5px;;cursor:pointer"
                    @click="checkImg(scope.$index)"
                  >查看截图</el-button>
                  <el-button
                    v-if="tableData.data[scope.$index]['status']=='0'"
                    type="danger"
                    size="mini"
                    style="border-radius:25px;margin-left:0;margin-top:5px;;cursor:pointer"
                    @click="cancelTask(tableData.data[scope.$index])"
                  >取消任务</el-button>
                  <el-button
                    v-if="tableData.data[scope.$index]['status']=='4'&&tableData.data[scope.$index]['evaluate']=='0'"
                    type="success"
                    size="mini"
                    style="border-radius:25px;margin-left:0;margin-top:5px;;cursor:pointer"
                    @click="comment(tableData.data[scope.$index])"
                  >评价</el-button>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                :key="index "
                :width="item.width "
                :prop="item.code "
                :label="item.name "
                align="center "
              >
              </el-table-column>
            </template>
          </template>
        </el-table>
        <div class="pagination ">
          <el-pagination
            @current-change="handleCurrentChange "
            :current-page="page"
            :page-sizes="[20]"
            layout="total, sizes, prev, pager, next, jumper "
            :total="total "
          >
          </el-pagination>
        </div>
      </div>
      <edit-note-dialog
        @dialogClose="editDialogClose"
        @dialogConfirm="editDialogConfirm"
        :data="choiceRowData"
        :visible="editDialogShow"
      ></edit-note-dialog>
      <customer-dialog
        @dialogClose="customerDialogClose"
        @dialogConfirm="customerDialogConfirm"
        :data="choiceRowData"
        :visible="customerDialogShow"
      ></customer-dialog>
      <check-buyer-msg-dialog
        @dialogClose="checkBuyerDialogClose"
        @dialogConfirm="checkBuyerDialogConfirm"
        :data="choiceRowData"
        :visible="checkBuyerDialogShow"
      ></check-buyer-msg-dialog>
      <check-img-dialog
        @dialogClose="checkImgDialogClose"
        @dialogConfirm="checkImgDialogConfirm"
        :data="choiceRowData"
        :visible="checkImgDialogShow"
      ></check-img-dialog>
      <check-task-detail-dialog
        @dialogClose="checkTaskDialogClose"
        @dialogConfirm="checkTaskDialogConfirm"
        :data="choiceRowData"
        :visible="checkTaskDialogShow"
      ></check-task-detail-dialog>
    </div>
    <div class="settingDialogCom">
      <el-dialog title="添加商品" :visible.sync="dialogShow" width="60%" style="margin-top:20px;">
        <div>选择评价类型:
          <el-radio v-model="radio" label="1">文字好评
            <span class='red'>1.5</span>个发布点</el-radio>
          <el-radio v-model="radio" label="2">晒图好评
            <span class='red'>2.5</span>个发布点</el-radio>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
          <el-form-item label="设置评价内容" prop="sellerRemark">
            <el-input v-model="ruleForm.sellerRemark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="上传图片1" v-if="radio=='2'" prop="img1">
            <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="img1">
              <img v-if="ruleForm.img1" :src="ruleForm.img1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片2" v-if="radio=='2'" prop="img2">
            <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="img2">
              <img v-if="ruleForm.img2" :src="ruleForm.img2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片3" v-if="radio=='2'" prop="img3">
            <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="img3">
              <img v-if="ruleForm.img3" :src="ruleForm.img3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片4" v-if="radio=='2'" prop="img4">
            <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="img4">
              <img v-if="ruleForm.img4" :src="ruleForm.img4" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片5" v-if="radio=='2'" prop="img5">
            <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="img5">
              <img v-if="ruleForm.img5" :src="ruleForm.img5" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份验证" prop="paypwd">
            <el-input v-model="ruleForm.paypwd"></el-input>
          </el-form-item>
          <div style="text-align:center;margin-bottom:50px;">
            <el-button type="primary" @click="dialogShow=false">取消</el-button>
            <el-button @click="submit()">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import navList from "@/components/taskManagementNavList.vue";
import tableCom from "@/components/tableCom.vue";
import editNoteDialog from "./components/editNoteDialog.vue";
import customerDialog from "./components/customerDialog.vue";
import checkTaskDetailDialog from "./components/checkTaskDetailDialog.vue";
import checkImgDialog from "./components/checkImgDialog.vue";
import checkBuyerMsgDialog from "./components/checkBuyerMsgDialog.vue";
export default {
  components: {
    navList,
    tableCom,
    editNoteDialog,
    customerDialog,
    checkTaskDetailDialog,
    checkImgDialog,
    checkBuyerMsgDialog
  },
  created() {
    this.queryData();
  },
  data() {
    return {
      currentTab: "managementFineBrushes",
      page: 1,
      total: 0,
      rowIndex: 0,
      choiceRowData: {},
      editDialogShow: false,
      customerDialogShow: false,
      checkBuyerDialogShow: false,
      checkImgDialogShow: false,
      checkTaskDialogShow: false,
      formData: {
        type: {
          value: "",
          options: [
            { label: "精刷单任务", value: 1 },
            { label: "指定推送", value: 2 },
            { label: "复购任务", value: 3 }
          ]
        },
        status: {
          value: "",
          options: [
            { label: "待接手", value: 0 },
            { label: "进行中", value: 1 },
            { label: "待发货", value: 2 },
            { label: "待完成", value: 3 },
            { label: "已完成", value: 4 },
            { label: "隐藏中", value: 5 },
            { label: "已取消", value: 6 }
          ]
        },
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
        payTime: {
          value: "支付时间",
          options: [
            { label: "支付时间", value: "支付时间" },
            { label: "接手时间", value: "接手时间" },
            { label: "发布时间", value: "发布时间" },
            { label: "完成时间", value: "完成时间" }
          ]
        },
        name: "",
        date: ""
      },
      tableData: {
        data: [],
        columns: [
          { name: "任务分类", code: "type", width: "150" },
          { name: "任务/订单编号", code: "ordersn", width: "220" },
          { name: "买号/商品信息", code: "goodMsg", width: "" },
          { name: "商品价格/发布点", code: "price", width: "" },
          { name: "任务状态", code: "status", width: "220" },
          { name: "操作按钮", code: "btn", width: "100" }
        ]
      },
      radio: '1',
      dialogShow: false,
      rules: {
        sellerRemark: [{ required: true, message: '请选择店铺类型', trigger: 'blur' }],
        paypwd: [{ required: true, message: '请选择掌柜号', trigger: 'blur' }]
      },
      ruleForm: {
        sellerRemark: '',
        paypwd: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: ''
      },
    };
  },
  methods: {
    //   发送评论
      submit () {
      let params = {
        token: this.$getToken(),
        orderid: this.choiceRowData['id'],
        type: this.choiceRowData['type'],
        sellerRemark: this.ruleForm.sellerRemark,
        paypwd: this.ruleForm.paypwd
      }
      if (this.radio === '2') {
        params.img = this.ruleForm.img1 + ',' + this.ruleForm.img2 + ',' + this.ruleForm.img3 + ',' + this.ruleForm.img4 + ',' + this.ruleForm.img5
      }
      this.$ajax
        .get('shopmember/releaseEvaluate', {
          params: params
        })
        .then(res => {
          if (res && res.data && res.data.code === 1) {
            this.$notify({
              title: '提交成功',
              type: 'success'
            })
            this.resetForm()
            this.dialogShow = false
          }
        })
    },
    img1 (data) {
    //   console.log(data)
      if (data.code === 1) {
        this.ruleForm.img1 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    img2 (data) {
    //   console.log(data)
      if (data.code === 1) {
        this.ruleForm.img2 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    img3 (data) {
    //   console.log(data)
      if (data.code === 1) {
        this.ruleForm.img3 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    img4 (data) {
    //   console.log(data)
      if (data.code === 1) {
        this.ruleForm.img4 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    img5 (data) {
    //   console.log(data)
      if (data.code === 1) {
        this.ruleForm.img5 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    // 评论
    comment(index) {
      this.choiceRowData = index;
      this.dialogShow=true
    },
    // 修改备注
    editNote(index) {
      this.rowIndex = index;
      this.choiceRowData = this.tableData.data[index];
      this.editDialogShow = true;
    },
    editDialogClose() {
      this.editDialogShow = false;
    },
    editDialogConfirm(val) {
      this.editDialogShow = false;
      this.choiceRowData["sellerRemark"] = val["sellerRemark"];
    },
    // 客服介入
    customerIn(index) {
      this.rowIndex = index;
      this.choiceRowData = this.tableData.data[index];
      this.customerDialogShow = true;
    },
    customerDialogClose() {
      this.customerDialogShow = false;
    },
    customerDialogConfirm(val) {
      this.customerDialogShow = false;
    },
    // 查看买号信息
    checkBuyerMsg(index) {
      this.rowIndex = index;
      this.choiceRowData = this.tableData.data[index];
      this.checkBuyerDialogShow = true;
    },
    checkBuyerDialogClose() {
      this.checkBuyerDialogShow = false;
    },
    checkBuyerDialogConfirm(val) {
      this.checkBuyerDialogShow = false;
    },
    // 已查看截图
    checkImg(index) {
      this.rowIndex = index;
      this.choiceRowData = this.tableData.data[index];
      this.checkImgDialogShow = true;
    },
    checkImgDialogClose() {
      this.checkImgDialogShow = false;
    },
    checkImgDialogConfirm(val) {
      this.checkImgDialogShow = false;
    },
    // 查看任务详情
    checkTaskDetail(index) {
      this.rowIndex = index;
      this.choiceRowData = this.tableData.data[index];
      this.checkTaskDialogShow = true;
    },
    checkTaskDialogClose() {
      this.checkTaskDialogShow = false;
    },
    checkTaskDialogConfirm(val) {
      this.checkTaskDialogShow = false;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.queryData("param");
    },
    queryData(param) {
      let queryParams = {
        params: {
          token: this.$getToken()
        }
      };
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            page: this.page,
            type: this.formData.type.value,
            status: this.formData.status.value,
            type_find: this.formData.type_find.value,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        };
      }
      this.$ajax.get("shopmember/releaseList", queryParams).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    cancelTask(index) {
      this.$confirm("确认取消？")
        .then(_ => {
          this.$ajax.get("shopmember/canceRelease?id=" + index.id).then(res => {
            if (res && res.data && res.data.code === 1) {
              this.queryData();
              this.$notify({
                title: "取消成功",
                type: "success"
              });
            }
          });
        })
        .catch(_ => {});
    //   console.log(index);
    }
  }
};
</script>
<style lang="less" scoped>
.publicFineBrushes {
  width: 1150px;
  margin: 0 auto;
  .formGroup {
    margin-top: 20px;
  }
  .tableCellMsg {
    text-align: left;
  }
}
</style>
