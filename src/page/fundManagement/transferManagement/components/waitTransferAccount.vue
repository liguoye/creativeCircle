<template>
  <div class="waitTransferAccount">
    <div class="tips">
      <el-row>
        <el-col :span="16" class="tip-text">
          <p>
            <span class="red">关于转账的平台规定：</span>
          </p>
          <p>
            1、必须在每天下午
            <span class="red">15：00前</span>完成前一天的所有转账，否则任务将被隐藏；
          </p>
          <p>2、严禁使用支付宝转账，一经发现将终止合作；</p>
          <p>3、对于超时未转账的订单，买家有权申请退款；</p>
          <p>4、对于多次超时的卖家，平台有权终止合作。</p>
          <p>
            转账操作流程：导出转账信息—进行转账操作—返回平台
            <span class="red">标记转账失败订单</span>—再
            <span class="red">标记转账成功订单</span>。
          </p>
          <p>
            批量转账流程：只支持招商银行，请点击查看教程。
            <a href="#/business/funds/transfer/pending" class="router-link-exact-active router-link-active">如何使用招商银行批量转账？</a>
          </p>
        </el-col>
        <el-col :span="8" class="help-links">
          <p>
            <a href="#/business/member/noticeDetail?noticeId=31c1c7def9f1417ea31ff29c4c881ecd" class>
              <i class="el-icon-info"></i>招商银行批量转账问题汇总
            </a>
          </p>
          <p>
            <a href="#/business/member/noticeDetail?noticeId=3573fca671be4d79a16817151c2c1d9d" class>
              <i class="el-icon-info"></i>卖家转账常见问题
            </a>
          </p>
          <p>
            <a target="_blank" href="//image.chuangkquan.com/tixian/business-1.png">
              <i class="el-icon-info"></i>支付宝免费快速提现秘籍
            </a>
          </p>
          <p>
            <a target="_blank" href="//image.chuangkquan.com/tixian/business-2.png">
              <i class="el-icon-info"></i>操作按钮使用指南
            </a>
          </p>
          <p>
            <a target="_blank" href="//image.chuangkquan.com/tixian/business-3.png">
              <i class="el-icon-info"></i>转账状态说明
            </a>
          </p>
          <p>
            <a href="#/business/member/noticeDetail?noticeId=7b9976596fb541f5b0c819f444f87baf" class>
              <i class="el-icon-info"></i>浦发银行批量转账说明
            </a>
          </p>
          <p>
            <a href="#/business/member/noticeDetail?noticeId=6593f4791444469cafd2f2e4ba7bc8ca" class>
              <i class="el-icon-info"></i>浦发银行批量转账问题详解
            </a>
          </p>
        </el-col>
      </el-row>
    </div>

    <div class="evaluationManagement">
      <div class="btnGroup" v-if="user&&user.bank_number">
        <div class="defaultCard" v-if="user">
          默认转账银行卡：
          <span class="red">{{user.bank_name}}</span>
          &nbsp;尾号：{{user.bank_number}}
          <el-button class="tablebtnActive" @click="changeCard('u')">修改</el-button>
        </div>
        <div class="defaultCard" v-else>
          默认转账银行卡：
          <span class="red">请设置默认转账银行卡</span>
          &nbsp; 开户人：(请先设置默认转账银行卡)
          <el-button class="tablebtnActive" @click="changeCard('s')">设置</el-button>
        </div>

        <el-row>
          <el-col :span="19" class="formGroup" style="text-align:left !important;width:calc(100% - 160px)">
            <span>转账状态</span>
            <el-select v-model="formData.type.value" placeholder="请选择">
              <el-option v-for="item in formData.type.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>订单编号</span>
            <el-input v-model="formData.orderid" placeholder="请输入内容"></el-input>
            <span>转账截止时间</span>
            <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="5" style="line-height:40px;width:160px;">
            <el-button class="tablebtnActive" @click="getchargeList('param')">查询</el-button>
            <el-button class="tablebtnFFF" @click="getchargeList()">刷新</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:left;margin-top:10px;">
            <span>操作按钮:</span>
            <el-button class="tablebtnActive" @click="changeAccount( '1')">转账成功</el-button>
            <el-button class="tablebtnActive" @click="allTransferSuccessShow=true">全部转账成功</el-button>
            <el-button class="tablebtnActive" @click="changeAccount( '2')">转账失败</el-button>
            <el-button class="tablebtnActive" @click="handleDownload(1)">招商批量导出</el-button>
            <el-button class="tablebtnActive" @click="handleDownload(2)">浦发批量导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom">
        <el-table :data="tableData.data" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <template v-for="(item,index) in tableData.columns">
            <!-- <template v-if="item.com=='input'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <el-input v-model="tableData.data[scope.$index][item.code]"></el-input>
                </template>
              </el-table-column>
            </template> -->
            <template v-if="item.com=='status'">
              <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                <template slot-scope="scope">
                  <span v-if=" tableData.data[scope.$index]['status'] == 1 ">等待转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 2 ">已转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 3 ">转账失败</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 4 ">未转账</span>
                  <span v-else-if=" tableData.data[scope.$index]['status'] == 5 ">已退款</span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :key="index " :width="item.width " :prop="item.code " :label="item.name " align="center ">
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>
    </div>
    <div class="settingDialogCom">
      <el-dialog title="设置默认转账银行卡" :visible.sync="dialogFormVisible">
        <div class="content">
          <div class="well" v-if="user&&user.bank_number">
            <p>{{user.bank_name}}</p>
            <p>尾号：{{user.bank_number}}</p>
          </div>
          <div class="well" v-else>
            <p>原转账银行卡：请设置默认转账银行卡</p>
            <p>开户人：(请先设置默认转账银行卡)</p>
          </div>

          <p class="title">请在下方输入新的转账银行卡信息：</p>
          <el-row>
            <el-col :span="6">
              <span>转账银行：</span>
            </el-col>
            <el-col :span="18">
              <el-select v-model="sortOrder.value" style="width:100%" placeholder="请选择开户行">
                <el-option v-for="item in sortOrder.options" :key="item.id" :label="item.bank_name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>支行</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="branchBank" placeholder="请输入正确的支行"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>账户名</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="cardName" placeholder="请输入正确的账户名"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>转账银行卡号：</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="priceRange.bottom" placeholder="请输入正确的卡号"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>银行卡开户人：</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="sendGoods.val" placeholder="请输入正常开户人姓名"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>支付密码：</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="others.value" placeholder="请输入在平台设置的密码"></el-input>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bindCard" type="primary">确 定</el-button>
          <el-button @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="settingDialogCom">
      <el-dialog title="提示" :visible.sync="allTransferSuccessShow">
        <div class="content">
          <section>
            <p>
              请确保
              <span class="red">已对买家成功转账</span>后再执行【转账成功】操作！并核实转账所使用的银行卡信息是否有误。
            </p>
            <div class="well">
              <p>转账银行卡：请设置默认转账银行卡</p>
              <p>开户人：(请先设置默认转账银行卡)</p>
            </div>
            <p>
              <span class="red">温馨提示：</span>若实际转账所使用的银行卡与上方展示的信息不一致，请返回至等待转账页面对默认转账银行卡进行修改。
            </p>
          </section>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeAccount('all')">确认无误</el-button>
          <el-button @click="allTransferSuccessShow = false">我再看看</el-button>
        </div>
      </el-dialog>
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
      dialogFormVisible: false,
      allTransferSuccessShow: false,
      sortOrder: {
        check: true,
        value: '',
        options: [
          { label: '综合', value: '综合' },
          { label: '销量', value: '销量' },
          { label: '价格从低到高', value: '价格从低到高' },
          { label: '价格从高到低', value: '价格从高到低' }
        ]
      },
      priceRange: {
        check: true,
        bottom: '',
        top: ''
      },
      sendGoods: {
        check: true,
        value: ''
      },
      others: {
        check: true,
        value: ''
      },
      formData: {
        type: {
          value: '',
          options: [
            { label: '等待转账', value: '等待转账' },
            { label: '已导出', value: '已导出' }
          ]
        },
        orderid: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '订单编号', code: 'orderid', width: '180' },
          { name: '转账金额', code: 'price', width: '' },
          { name: '提现人', code: 'bank_account.card_name', width: '' },
          { name: '银行卡号', code: 'bank_account.bank_number', width: '130' },
          { name: '开户行', code: 'bank_account.bank_name', width: '' },
          { name: '支行名称', code: 'bank_account.branch', width: '' },
          { name: '转账状态', code: 'status', width: '', com: 'status' },
          { name: '转账截止时间', code: 'ut', width: '150' }
        ]
      },
      tableSelectData: [],
      bankList: null,
      user: null,
      branchBank: '',
      bankId: '',
      bankName: '',
      cardName: '',
      chargeList: null
    }
  },
  created () {
    this.getUserInfo()
    this.getBankList()
    this.getchargeList()
  },
  methods: {
    handleSelectionChange (val) {
     // console.log(val)
      this.tableSelectData = val
    },
    changeCard (type) {
      this.dialogFormVisible = true
    },
    bindCard () {
      let id = this.sortOrder.value
      let list = this.sortOrder.options
    //  console.log(list)
      list.forEach(item => {
        if (item.id === id) {
          this.bankName = item.bank_name
        }
      })
      this.$ajax
        .post('member/updBank', {
          bank_number: this.priceRange.bottom,
          bank_name: this.bankName,
          branch: this.branchBank,
          paypwd: this.others.value,
          card_name: this.cardName,
          id: this.sortOrder.value
        })
        .then(res => {
        //  console.log('结果', res)
          if (res && res.data && res.data.code === 1) {
            this.$notify({
              title: '修改成功',
              type: 'success'
            })
            this.getUserInfo()
          }
        })
    },
    getUserInfo () {
      this.$ajax.get('shopmember/index').then(res => {
       // console.log('余额', res)
        if (res && res.data && res.data.code === 1) {
          this.user = res.data.data
        }
      })
    },
    getBankList () {
      this.$ajax.get('/member/bankList').then(res => {
       // console.log('银行列表', res)
        if (res && res.data && res.data.code === 1) {
          this.sortOrder.options = res.data.data
        }
      })
    },
    changeAccount (param) {
      let id = ''
      if (param === 'all') {
        param = '1'
        this.allTransferSuccessShow = false
        for (let i in this.tableData.data) {
          if (!id) {
            id = this.tableData.data[i]['id'] + ','
          } else {
            id = id + this.tableData.data[i]['id'] + ','
          }
        }
      } else {
        for (let i in this.tableSelectData) {
          if (!id) {
            id = this.tableSelectData[i]['id'] + ','
          } else {
            id = id + this.tableSelectData[i]['id'] + ','
          }
        }
      }

      this.$ajax.get('shopmember/changeAccount', {
        params: {
          type: param,
          id: id
        }
      }).then(res => {
        if (res && res.data && res.data.code === 1) {
          this.$notify({
            title: res.data.msg,
            type: 'success'
          })
        }
      })
    },
    getchargeList (param) {
      let queryParams = {
        params: {
          token: this.$getToken()
        }
      }
      if (param) {
        queryParams = {
          params: {
            token: this.$getToken(),
            type: this.formData.type.value,
            orderid: this.formData.orderid,
            start: this.formData.date[0],
            end: this.formData.date[1]

          }
        }
      }
      this.$ajax.get('shopmember/accountsList', queryParams).then(res => {
       // console.log('转账列表', res)
        if (res && res.data && res.data.code === 1) {
          this.tableData.data = res.data.data
        }
      })
    },
    // 导出功能
    handleDownload () {
      if (this.tableData.data.length <= 0) {
        this.$notify({
          title: '没有数据可导出',
          type: 'warning'
        })
        return false
      }
      this.downloadLoading = true
      let tHeader = []
      let filterVal = [] // 字段如果有前缀要去除(bank_account.bank_name)
      for (let i = 0; i < this.tableData.columns.length; i++) {
        tHeader.push(this.tableData.columns[i]['name'])
        filterVal.push(this.tableData.columns[i]['code'])
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel.js')
        const list = this.tableData.data
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '列表excel')
        this.downloadLoading = false
      })
    },
    // 导出格式化数据
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="less" scoped>
.waitTransferAccount {
  .tips {
    border: 1px solid #ccebfa;
    border-radius: 4px;
    padding: 10px;
    margin: 20px 0;
    font-size: 13px;
    .tip-text {
      p {
        .red {
          color: red;
        }
        line-height: 22px;
        a {
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
    .help-links {
      min-width: 200px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      padding: 5px 15px;
      p {
        line-height: 22px;
      }
      a {
        color: #5e6d82;
        text-decoration: none;
        user-select: none;
        cursor: pointer;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .defaultCard {
    height: 35px;
    text-align: left;
    font-size: 13px;
    .red {
      color: red;
    }
  }
  .settingDialogCom {
    .el-row {
      .el-col {
        margin-bottom: 10px;
      }
      .el-col:first-child {
        text-align: right;
        line-height: 35px;
      }
    }
    .well {
      text-align: center;
      margin: 10px auto;
      padding: 15px;
      background-color: #eee;
      border-radius: 5px;
    }
    .title {
      font-size: 16px;
      margin: 10px 0 10px;
    }
  }
}
</style>
