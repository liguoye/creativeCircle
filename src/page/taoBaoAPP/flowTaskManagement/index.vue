<template>
  <div class="flowTaskManagement">
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')">发布流量任务</li>
        <li @click="navListClick('flowTaskManagement')" class="current">流量任务管理</li>
      </ul>
    </div>

    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <el-select v-model="formData.status.value" placeholder="请选择">
              <el-option v-for="item in formData.status.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.type.value" placeholder="请选择">
              <el-option v-for="item in formData.type.options" :key="item.value" :label="item.label" :value="item.value">
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
      <div class="table">
        <div class="tableCom">
          <el-table :data="tableData.data" border style="width: 100%" :height="400">
            <template v-for="(item,index) in tableData.columns">
              <template v-if="item.com=='btn'">
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  <template slot-scope="scope">
                    <el-button class="tableCellBtn" type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button class="tableCellBtn" type="danger" size="mini" @click="lookDetailClick(scope.$index, scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.com=='taskMsg'">
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  <template slot-scope="scope">
                    <div class="tableCellMsg">
                      <p>任务编号: {{tableData.data[scope.$index]['id']}}</p>
                      <p>流量入口：{{tableData.data[scope.$index]['visitWay']}}</p>
                      <p>任务类型：{{tableData.data[scope.$index]['type']}}</p>
                      <p>佣金：
                        <span class='red'>{{tableData.data[scope.$index]['buy_MinLi']}}</span>元</p>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.com=='goodsMsg'">
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  <template slot-scope="scope">
                    <div class="tableCellMsg">
                      <p>商品简称：{{tableData.data[scope.$index]['abbreviation']}}</p>
                      <p>商品ID：{{tableData.data[scope.$index]['goodsid']}}</p>
                      <p>掌柜号：{{tableData.data[scope.$index]['shop_name']}}</p>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.com=='taskDetail'">
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  <template slot-scope="scope">
                    <div class="tableCellMsg">
                      <p>关键字：
                        <span class='red'>{{tableData.data[scope.$index]['keyword']}}</span>
                      </p>
                      <p>增值服务：
                        <span style="color:blue;font-weight:bold;cursor: pointer;" @click="checkNote(scope.$index)">查看备注>></span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.com=='status'">
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  <template slot-scope="scope">
                    <div class="tableCellMsg">
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='0'">待接手</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='1'">进行中</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='2'">商家待审核</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='3'">管理员待审核</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='4'">审核不通过</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='5'">已完成</p>
                      <p style="text-align:center;color: rgb(12, 185, 229);cursor: pointer;" v-if="tableData.data[scope.$index]['status']=='6'">已取消</p>
                      <p>发布时间：{{tableData.data[scope.$index]['ct']}}</p>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center"></el-table-column>
              </template>
            </template>
          </el-table>
          <div style="text-align:right;margin-top:10px;">
            <el-pagination @current-change="handleCurrentChange " :current-page="page" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper "
              :total="total ">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="settingDialogCom">
        <el-dialog title="修改任务备注" :visible.sync="dialogShow">
          <div class="content">
            <el-row>
              <el-col :span="6">
                <p>任务编号：</p>
              </el-col>
              <el-col :span="18">
                <p>{{choiceRowData.id}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>任务备注：</p>
              </el-col>
              <el-col :span="18">
                <el-input placeholder="请输入任务,不超过80字" type="textarea" v-model="choiceRowData.sellerRemark"></el-input>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="editNoteConfirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    tableCom
  },
  created () {
    this.queryData()
  },
  data () {
    return {
      msg: 'flowTaskManagement',
      page: 1,
      total: 0,
      dialogShow: false,
      rowIndex: 0,
      choiceRowData: {
        id: '',
        sellerRemark: ''
      },
      formData: {
        status: {
          value: '所有任务',
          options: [
            { label: '所有任务', value: '所有任务' },
            { label: '待接手', value: 0 },
            { label: '进行中', value: 1 },
            { label: '商家待审核', value: 2 },
            { label: '管理员待审核', value: 3 },
            { label: '审核不通过', value: 4 },
            { label: '已完成', value: 5 },
            { label: '已取消', value: 6 }
          ]
        },
        type: {
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
      tableData: {
        data: [],
        columns: [
          { name: '任务信息', code: 'type', width: '', com: 'taskMsg' },
          { name: '商品信息', code: 'goodsMsg', width: '', com: 'goodsMsg' },
          { name: '任务详情', code: 'MinLi', width: '', com: 'taskDetail' },
          // { name: '任务状态', code: 'status', width: '', com: 'status' },
          { name: '操作按钮', code: 'task5', width: '' }
        ]
      }
    }
  },
  methods: {
    checkNote (index) {
      this.rowIndex = index
      this.choiceRowData = JSON.parse(JSON.stringify(this.tableData.data[index]))
      this.dialogShow = true
    },
    editNoteConfirm () {
      this.$ajax.get('ShopMember/sellerRemark', {
        params: {
          id: this.choiceRowData['id'],
          sellerRemark: this.choiceRowData['sellerRemark']
        }
      }).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: res.data.msg,
            type: 'success'
          })
          this.queryData()
        }
      })
      this.dialogShow = false
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
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
            status: this.formData.type.value,
            type: this.formData.type.value,
            name: this.formData.name,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        }
      }
      this.$ajax.get('shopmember/flowList', queryParams).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: res.data.msg,
            type: 'success'
          })
          this.tableData.data = res.data.data.data
          this.total = res.data.data.total
          this.page = 1
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.flowTaskManagement {
  width: 1150px;
  margin: 0 auto;

  .tableCom {
    tbody {
      td {
        position: relative;
      }
    }
    .tableCellState {
      width: 100%;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      .stateActive {
        color: #20a0ff;
      }
      .el-row {
        height: 50%;
        position: relative;
        > .el-col {
          height: 100%;
          box-sizing: border-box;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          p {
            margin-top: 15px;
          }
          &:last-child {
            border-right: 0;
          }
        }
        &:last-child {
          .el-col {
            border-bottom: 0;
          }
        }
      }
      .btn {
        cursor: pointer;
        color: #888383;
      }
    }
    .tableCellMsg {
      font-size: 12px;
      text-align: left;
      margin-left: 3px;
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
