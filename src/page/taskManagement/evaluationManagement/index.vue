<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="evaluationManagement">

      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <el-select v-model="formData.status.value" placeholder="请选择">
              <el-option v-for="item in formData.status.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.type_find.value" placeholder="请选择">
              <el-option v-for="item in formData.type_find.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="formData.name" placeholder="请输入内容"></el-input>
            <span>支付时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive" @click="queryData('param')">查询</el-button>
            <el-button class="tablebtnFFF" @click="queryData()">刷新</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom">
        <el-table :data="tableData.data" border style="width: 100%" height="400">
          <template v-for="(item,index) in tableData.columns">
            <template v-if="item.code=='ordersn'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p>任务编号: {{tableData.data[scope.$index]['id']}}</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='goodMsg'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p>买号: {{tableData.data[scope.$index]['taobao']}}</p>
                    <!-- <span style="color:#4292b9;cursor:pointer" @click="checkBuyerMsg(scope.$index)">查看买号信息</span> -->
                    <!-- <p>买号等级：{{tableData.data[scope.$index]['shop_name']}}</p> -->
                    <p>店铺名称：{{tableData.data[scope.$index]['shop_name']}}</p>
                    <p>商品简称：{{tableData.data[scope.$index]['abbreviation']}}</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='haoping'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p v-if="tableData.data[scope.$index]['haoping']">{{tableData.data[scope.$index]['haoping']}}</p>
                    <p v-else>暂未设置好评内容</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='zhuiping'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p v-if="tableData.data[scope.$index]['zhuiping']">{{tableData.data[scope.$index]['zhuiping']}}</p>
                    <p v-else>暂未设置追评内容</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='status'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <div class="tableCellMsg">
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='0'">待接手</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='1'">进行中</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='2'">待发货</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='3'">待完成</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='4'">已完成</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='5'">隐藏中</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else-if="tableData.data[scope.$index]['status']=='6'">已取消</p>
                    <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-else>未设置评价</p>
                    <p>支付时间：{{tableData.data[scope.$index]['ct']}}</p>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.code=='btn'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" style="border-radius:25px;;cursor:pointer" @click="pingjiaPub(scope.$index)">设置评价内容</el-button>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :key="index " :width="item.width " :prop="item.code " :label="item.name " align="center ">
              </el-table-column>
            </template>
          </template>
        </el-table>
        <div class="pagination ">
          <el-pagination @current-change="handleCurrentChange " :current-page="page" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper "
            :total="total ">
          </el-pagination>
        </div>
      </div>
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
import navList from '@/components/taskManagementNavList.vue'
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    navList,
    tableCom
  },
  data () {
    return {
      currentTab: 'evaluationManagement',
      page: 1,
      total: 0,
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
      formData: {
        status: {
          value: '',
          options: [
            { label: '待评价', value: 1 },
            { label: '待审核', value: 2 },
            { label: '审核不通过', value: 3 },
            { label: '已完成', value: 4 },
            { label: '已取消', value: 6 }
          ]
        },
        type_find: {
          value: '',
          options: [
            { label: '任务编号', value: 1 },
            { label: '运单号', value: 2 },
            { label: '店铺名称', value: 3 },
            { label: '买号名称', value: 4 },
            { label: '商品编号', value: 5 },
            { label: '商品简称', value: 6 }
          ]
        },
        name: '',
        date: ''
      },
      choiceRowData: {},
      tableData: {
        data: [],
        columns: [
          { name: '任务/订单编号', code: 'ordersn', width: '' },
          { name: '买号/商品信息', code: 'goodMsg', width: '' },
          { name: '好评内容', code: 'haoping', width: '' },
          { name: '追评内容', code: 'zhuiping', width: '' },
          { name: '任务状态', code: 'status', width: '' },
          { name: '操作按钮', code: 'btn', width: '' }
        ]
      }
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    pingjiaPub (index) {
      this.choiceRowData = this.tableData.data[index]
      this.dialogShow = true
    },
    handleCurrentChange (val) {
      this.page = val
      this.queryData('param')
    },
    queryData (param) {
      let queryParams = {
        params: {
          token: this.$getToken()
        }
      }
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            page: this.page,
            status: this.formData.status.value,
            name: this.formData.name,
            type_find: this.formData.type_find.value,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        }
      }
      this.$ajax.get('shopmember/EvaluateList', queryParams).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data.data
          this.total = res.data.data.total
          this.page = 1
        }
      })
    },

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
            this.$emit('submitSuccess')
            this.$notify({
              title: '提交成功',
              type: 'success'
            })
            this.resetForm()
            this.dialogShow = false
          }
        })
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    img1 (data) {
      console.log(data)
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
      console.log(data)
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
      console.log(data)
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
      console.log(data)
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
      console.log(data)
      if (data.code === 1) {
        this.ruleForm.img5 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.evaluationManagement {
  width: 1150px;
  margin: 0 auto;
  .tableCellMsg {
    text-align: left;
    padding-left: 3px;
  }
}
</style>
