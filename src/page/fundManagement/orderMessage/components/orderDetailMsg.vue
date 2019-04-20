<template>
  <div>
    <div class="red">此表格用于记录所有精刷单已支付的订单信息</div>
    <div class="evaluationManagement">
      <div class="btnGroup">
        <el-row>
          <el-col :span="12" class="formGroup" style="text-align:left !important;">
            <span>统计时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="12" style="line-height:40px;">
            <el-button class="tablebtnActive" style="margin-left:0px;" @click="queryData('param')">查询</el-button>
            <el-button class="tablebtnFFF" style="margin-left:0px;">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom">
        <el-table :data="tableData.data" border style="width: 100%" height="400">
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->
          <template v-for="(item,index) in tableData.columns">
            <template v-if="item.com=='expressType'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <p v-if="tableData.data[scope.$index][item.code]['expressType']">{{2}}</p>
                  <p v-else>0</p>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.com=='taskType'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <p>精刷单</p>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.com=='danbao'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <p v-if="tableData.data[scope.$index][item.code]['price'] > 198">198</p>
                  <p v-else>{{tableData.data[scope.$index][item.code]['price']}}</p>
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
      msg: 'orderMessage',
      page: 1,
      total: 0,
      formData: {
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务号', code: 'id', width: '' },
          { name: '订单编号', code: 'ordersn', width: '' },
          { name: '商品简称', code: 'abbreviation', width: '' },
          { name: '掌柜号', code: 'shop_name', width: '' },
          { name: '任务类型', code: 'taskType', width: '', com: 'taskType' },
          { name: '担保金额', code: 'danbao', width: '', com: 'danbao' },
          { name: '实际金额', code: 'price', width: '' },
          { name: '发布点', code: 'MinLi', width: '' },
          { name: '置顶费用', code: 'zdfee', width: '' },
          { name: '自发空包减免费用', code: 'expressType', width: '140', com: 'expressType' },
          { name: '支付时间', code: 'tasktime', width: '150' }
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
          token: this.$getToken(),
          type: 1
        }
      }
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            type: 1,
            page: this.page,
            start: this.formData.date[0],
            end: this.formData.date[1]
          }
        }
      }
      this.$ajax.get('shopmember/releaseList', queryParams).then(res => {
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
.tips {
  border: 1px solid #ccebfa;
  border-radius: 4px;
  flex-direction: row;
  padding: 10px;
  margin: 20px 0;
  font-size: 13px;
  p {
    line-height: 22px;
    .red {
      color: red;
    }
  }
}
</style>
