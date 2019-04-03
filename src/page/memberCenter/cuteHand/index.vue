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
                <div><img src="../../../assets/picture/dg_icon.png"></div>
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
                <div><img src="../../../assets/picture/sq_icon.png"></div>
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
                <div><img src="../../../assets/picture/xf_icon.png"></div>
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
                <div><img src="../../../assets/picture/cg_icon.png"></div>
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
                <div><img src="../../../assets/picture/bz_icon.png" />></div>
                <div style="color: rgb(0, 153, 229); margin-top: 9px;">备注设置</div>
              </div>
            </div>
          </div>
          <p class="title">二、已绑定店铺信息
            <span class="red">（为保证能正常发布任务，当智能助手有效期≤3天时，请及时联系顾问进行续费）</span>
          </p>

          <div class="tableCom">
            <el-table :data="shopMsgData.data" border style="width: 100%" :height="shopMsgData.tableHeight">
              <template v-for="(item,index) in shopMsgData.columns">
                <template v-if="item.com=='btn'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <el-button class="tableCellBtn" type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                          <span>订购</span>
                          <span @click="powerDialogShow=true">授权</span>
                        </p>
                        <p v-if="item.code=='smartValid'">
                          <span @click="renewDialogShow=true">续费</span>
                        </p>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="item.com=='state'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <div class="tableCellState">
                        <el-row>
                          <el-col :span="12">
                            <p>淘宝</p>
                          </el-col>
                          <el-col class="btn" :span="12" @click="shopStateChange(scope.$index, scope.row)">
                            <p>已关闭</p>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <p>农村淘宝</p>
                          </el-col>
                          <el-col class="btn" :span="12" @click="shopStateChange(scope.$index, scope.row)">
                            <p class="stateActive">已开启</p>
                          </el-col>
                        </el-row>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                  </el-table-column>
                </template>
              </template>
            </el-table>
          </div>
          <div class="btnGroup">
            <p class="title">三、订单标记反馈</p>
            <el-row>
              <el-col :span="20" class="formGroup" style="text-align:left !important;width:calc(100% - 130px)">
                <el-select v-model="formData.taskClass.value" placeholder="请选择">
                  <el-option v-for="item in formData.taskClass.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="formData.keyWord" placeholder="请输入内容"></el-input>
                <span> 标记反馈状态</span>
                <el-select v-model="formData.taskNum.value" placeholder="请选择">
                  <el-option v-for="item in formData.taskNum.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span>支付时间</span>
                <el-date-picker v-model="formData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="4" style="line-height:40px;width:130px;">
                <el-button class="tablebtnActive">查询</el-button>
                <el-button class="tablebtnFFF">刷新</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table">
            <table-com :columns="tableData.columns"></table-com>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="settingDialogCom">
      <el-dialog title="提示" :visible.sync="powerDialogShow" width="30%" :before-close="handleClose">
        <span>您是否授权成功？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="powerDialogShow = false">授权遇到问题</el-button>
          <el-button type="primary" @click="powerDialogShow = false">授权成功</el-button>
        </span>
      </el-dialog>
    </div>
    <renew-dialog @dialogClose="dialogClose" :dialog-table-visible="renewDialogShow"></renew-dialog>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
import tableCom from '@/components/tableCom.vue'
import renewDialog from './components/renewDialog.vue'
export default {
  components: {
    navList,
    renewDialog,
    tableCom
  },
  props: {
  },
  data () {
    return {
      currentTab: 'cuteHand',
      renewDialogShow: false,
      powerDialogShow: false,
      shopMsgData: {
        data: [
          {
            'smartid': '6f6aaf45f4484dfab36dcf3341309d22',
            'shopid': '6431542847a44562addc125481db64ef',
            'type': '1',
            'status': '-1',
            'smartValid': '2017-10-11 17:02:58',
            'interfaceValid': '2017-10-11 17:02:58',
            'uid': null,
            'ukey': null,
            'smartShopid': '淘宝',
            'tradeFlag': null,
            'tradeMemo': null,
            'sellerid': null,
            'name': 'tourmate途美利威专卖店',
            'tradeStatus': '0'
          },
          {
            'smartid': 'e267f525b14841469a97406c4a746934',
            'shopid': 'e3dcc753f77b44b7bacc8ab7d6a64991',
            'type': '1',
            'status': '-1',
            'smartValid': '2017-10-09 17:23:10',
            'interfaceValid': '2017-10-09 17:23:10',
            'uid': null,
            'ukey': null,
            'smartShopid': '淘宝',
            'tradeFlag': null,
            'tradeMemo': null,
            'sellerid': null,
            'name': '羽马汽车用品专营店',
            'tradeStatus': '0'
          }
        ],
        columns: [
          { name: '平台', code: 'smartShopid', width: '120' },
          { name: '店铺名称', code: 'name', width: '190' },
          { name: '状态', code: 'status', width: '80' },
          { name: '智能助手有效期', code: 'smartValid', width: '200', com: 'date' },
          { name: '淘宝服务接口有效期', code: 'interfaceValid', width: '200', com: 'date' },
          { name: '操作', code: 'handle', width: '', com: 'btn' }
        ],
        tableHeight: 300
      },

      formData: {
        taskClass: {
          value: '',
          options: [
            { label: '任务编号', value: '任务编号' },
            { label: '淘宝订单编号', value: '淘宝订单编号' },
            { label: '店铺名称', value: '店铺名称' },
            { label: '买号名称', value: '买号名称' }
          ]
        },
        taskNum: {
          value: '',
          options: [
            { label: '未标记', value: '未标记' },
            { label: '标记成功', value: '标记成功' }
          ]
        },
        keyWord: '',
        date: ''
      },
      tableData: {
        data: [],
        columns: [
          { name: '任务编号', code: 'task1', width: '' },
          { name: '店铺名称', code: 'task2', width: '' },
          { name: '买号名称', code: 'task3', width: '' },
          { name: '订单编号', code: 'task4', width: '' },
          { name: '标记反馈状态', code: 'task5', width: '' },
          { name: '下单支付时间', code: 'task6', width: '' },
          { name: '操作', code: 'task7', width: '' }
        ]
      }
    }
  },
  methods: {
    dialogClose (val) {
      this.renewDialogShow = val
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    }
  }
}
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
