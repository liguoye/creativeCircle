<template>
  <div class="customerWorkOrder">
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')" class="current">新客服工单</li>
      </ul>
    </div>
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')" class="current">任务处罚列表</li>
      </ul>
    </div>

    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <span>工单状态: </span>
            <el-select v-model="formData.status.value" placeholder="请选择">
              <el-option v-for="item in formData.status.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>工单类型: </span>
            <el-select v-model="formData.work_type.value" placeholder="请选择">
              <el-option v-for="item in formData.work_type.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>问题分类: </span>
            <el-select v-model="formData.problemClass.value" placeholder="请选择">
              <el-option v-for="item in formData.problemClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive" @click="queryData('param')">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <span>订单编号: </span>
            <el-input v-model="formData.orderid" placeholder="请输入内容"></el-input>
            <span>任务编号: </span>
            <el-input v-model="formData.ordersn" placeholder="请输入内容"></el-input>
            <span>创建时间: </span>
            <el-date-picker v-model="formData.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnFFF" @click="queryData()">刷新</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
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
                      <p>买号等级：{{tableData.data[scope.$index]['shop_name']}}</p>
                      <p>店铺名称：{{tableData.data[scope.$index]['shop_name']}}</p>
                      <p>商品简称：{{tableData.data[scope.$index]['shop_name']}}</p>
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
                    <el-button type="primary" size="mini" style="border-radius:25px;;cursor:pointer">设置评价内容</el-button>
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
    </div>
  </div>
</template>
<script>
import tableCom from '@/components/tableCom.vue'
export default {
  components: {
    tableCom
  },
  data () {
    return {
      msg: 'customerWorkOrder',
      page: 1,
      total: 0,
      formData: {
        status: {
          value: '',
          options: [
            { label: '待处理', value: 1 },
            { label: '跟进中', value: 2 },
            { label: '执行中', value: 3 },
            { label: '处理完成', value: 4 },
            { label: '已撤销', value: 5 },
            { label: '拒绝处理', value: 6 }
          ]
        },
        work_type: {
          value: '',
          options: [
            { label: '其他导致买家损失的行为', value: 1 },
            { label: '退款', value: 2 },
            { label: '好评问题', value: 3 },
            { label: '任务过程出错', value: 4 }
          ]
        },
        problemClass: {
          value: '全部',
          options: [
            { label: '全部的', value: '全部的' }
          ]
        },
        createTime: '',
        ordersn: '',
        orderid: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务编号', code: 'ordersn', width: '' },
          { name: '订单编号', code: 'orderid', width: '' },
          { name: '工单类型', code: 'work_type', width: '' },
          { name: '任务状态', code: 'status', width: '' },
          { name: '处罚金额', code: 'price', width: '' },
          { name: '工单状态', code: 'task6', width: '' },
          { name: '创建时间', code: 'ct', width: '200' },
          { name: '操作', code: 'btn', width: '' }
        ]
      }
    }
  },
  methods: {
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
            orderid: this.formData.orderid,
            ordersn: this.formData.ordersn,
            work_type: this.formData.work_type.value,
            status: this.formData.status.value,
            start: this.formData.createTime[0],
            end: this.formData.createTime[1]
          }
        }
      }
      this.$ajax.get('shopmember/workindex', queryParams).then(res => {
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
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    }
  }
}
</script>
<style lang="less" scoped>
.customerWorkOrder {
  width: 1150px;
  margin: 0 auto;
  .btnGroup {
    .el-row {
      .el-col {
        margin-bottom: 5px;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
