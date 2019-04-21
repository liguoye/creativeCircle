<template>
  <div class="taskManagement">
    <nav-list :current-tab="currentTab"></nav-list>
    <div class="evaluationManagement">

      <div class="btnGroup">
        <el-row>
          <el-col :span="18" class="formGroup" style="text-align:left !important">
            <el-select v-model="formData.taskClass.value" placeholder="请选择">
              <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="formData.taskNum.value" placeholder="请选择">
              <el-option v-for="item in formData.taskNum.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
            <span>支付时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height:40px">
            <el-button class="tablebtnActive" @click="queryData(param)">查询</el-button>
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
      formData: {
        taskClass: {
          value: '所有任务',
          options: [
            { label: '所有任务', value: '所有任务' },
            { label: '未设置评价', value: '未设置评价' },
            { label: '完成评价', value: '完成评价' },
            { label: '等待评价', value: '等待评价' },
            { label: '等待追评', value: '等待追评' },
            { label: '完成追评', value: '完成追评' },
            { label: '已取消评价', value: '已取消评价' }
          ]
        },
        taskNum: {
          value: '任务编号',
          options: [
            { label: '任务编号', value: '任务编号' },
            { label: '订单编号', value: '订单编号' },
            { label: '运单号', value: '运单号' },
            { label: '店铺名称', value: '店铺名称' },
            { label: '买号名称', value: '买号名称' },
            { label: '商品编号', value: '商品编号' }
          ]
        },
        keyWord: '',
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
  methods: {
    pingjiaPub (index) {
      this.choiceRowData = this.tableData.data[index]
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
            type: this.formData.type.value,
            status: this.formData.status.value,
            type_find: this.formData.type_find.value,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        }
      }
      this.$ajax.get('shopmember/EvaluateList', queryParams).then(res => {
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
.evaluationManagement {
  width: 1150px;
  margin: 0 auto;
  .tableCellMsg {
    text-align: left;
    padding-left: 3px;
  }
}
</style>
