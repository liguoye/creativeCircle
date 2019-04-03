<template>
  <div class="shopManagement">
    <el-row>
      <el-col :span="4" class="navList">
        <nav-list :current-tab="currentTab"></nav-list>
      </el-col>
      <el-col :span="18" class="accountManage">
        <div class="evaluationManagement">
          <div class="btnGroup">
            <div class="defaultCard" style="text-align:left">
              淘宝店铺：
              <span class="red">2 </span>个 &nbsp;
              <el-button class="tablebtnActive">绑定新店铺</el-button>
            </div>
            <el-row>
              <el-col :span="24" class="formGroup" style="text-align:left ">
                <span style="display:inline-block;width: 5px; height: 18px;background-color: rgb(0, 153, 229);position:relative;top:4px;margin-right:3px;"></span>
                <span style="font-size:16px;font-weight:bold">淘宝店铺</span>
                <span class="red">（对店铺开启推广标记，可减少90%以上的淘宝客或者农村淘宝佣金损失和纠纷，如有需要请联系商家顾问操作）</span>
              </el-col>
            </el-row>
          </div>
          <div class="tableCom">
            <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
              <template v-for="(item,index) in columns">
                <template v-if="item.com=='btn'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <el-button class="tableCellBtn" type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      <el-button class="tableCellBtn" type="danger" size="mini" @click="lookDetailClick(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="item.com=='msg'">
                  <el-table-column :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center">
                    <template slot-scope="scope">
                      <div class="tableCellMsg">
                        <p>姓名：{{tableData[scope.$index]['shipper']}}</p>
                        <p>电话：{{tableData[scope.$index]['tel']}} </p>
                        <p>发货地址：{{tableData[scope.$index]['address']}}</p>
                        <p @click="editClick">编辑</p>
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
        </div>
      </el-col>
    </el-row>
    <edit-dialog @dialogClose="editDialogClose" :dialog-table-visible="editDialogShow"></edit-dialog>
    <look-detail-dialog @dialogClose="lookDetailDialogClose" :dialog-table-visible="lookDetailDialogShow"></look-detail-dialog>
  </div>
</template>
<script>
import navList from '../components/treeNavList.vue'
import editDialog from './components/editDialog.vue'
import lookDetailDialog from './components/lookDetailDialog.vue'
export default {
  components: {
    navList,
    editDialog,
    lookDetailDialog
  },
  props: {
  },
  data () {
    return {
      currentTab: 'shopManagement',
      settingDialogShow: false,
      editDialogShow: false,
      lookDetailDialogShow: false,
      columns: [
        { name: '店铺名称', code: 'name', width: '190' },
        { name: '所属平台', code: 'childType', width: '80' },
        { name: '状态', code: 'status', width: '80' },
        { name: '发货人信息', code: 'sendMsg', width: '350', com: 'msg' },
        { name: '店铺推广状态', code: 'shopState', width: '', com: 'state' },
        { name: '操作', code: 'handle', width: '100', com: 'btn' }
      ],
      tableData: [
        {
          'sendMsg': '',
          'shopState': '',
          'handle': '',
          'shopid': '6431542847a44562addc125481db64ef',
          'sellerid': '3c7b977fc6084911b56bb935ca770d9a',
          'type': '1',
          'childType': '天猫',
          'taskNum': null,
          'browseNum': null,
          'kepper': 'tourmate途美利威专卖店',
          'name': 'tourmate途美利威专卖店',
          'nature': '2',
          'shipper': '冷先生',
          'tel': '17665265388',
          'province': '440000',
          'city': '440300',
          'district': '440307',
          'address': '坂田街道大发路29号金豪毅工业园B栋2层（途美）',
          'remark': '',
          'status': '1',
          'registerTime': '2017-10-11 17:02:58',
          'auditTime': null,
          'deleteTime': null,
          'picture': 'http://mayiquan-document.b0.upaiyun.com/seller/20171011/ca850a9228654be5affa953d77f75919.png',
          'isNongcunTaobao': '0',
          'isTaobaoSpreader': '0',
          'provinceName': '广东省',
          'cityName': '深圳市',
          'districtName': '龙岗区'
        },
        {
          'sendMsg': '',
          'shopState': '',
          'handle': '',
          'shopid': 'e3dcc753f77b44b7bacc8ab7d6a64991',
          'sellerid': '3c7b977fc6084911b56bb935ca770d9a',
          'type': '1',
          'childType': '天猫',
          'taskNum': null,
          'browseNum': null,
          'kepper': '羽马汽车用品专营店',
          'name': '羽马汽车用品专营店',
          'nature': '2',
          'shipper': '李长龙',
          'tel': '15867178157',
          'province': '440000',
          'city': '440300',
          'district': '440306',
          'address': '西乡街道华源科技创新园118',
          'remark': '',
          'status': '1',
          'registerTime': '2017-10-09 17:23:10',
          'auditTime': '2017-10-11 16:38:32',
          'deleteTime': null,
          'picture': 'http://mayiquan-document.b0.upaiyun.com/seller/20171009/58a8e2e77e9d4dd9bf0e07378badf7cf.png',
          'isNongcunTaobao': '0',
          'isTaobaoSpreader': '0',
          'provinceName': '广东省',
          'cityName': '深圳市',
          'districtName': '宝安区'
        }
      ],
      tableHeight: 500
    }
  },
  methods: {
    editDialogClose (val) {
      this.editDialogShow = val
    },
    lookDetailDialogClose (val) {
      this.lookDetailDialogShow = val
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    },
    lookDetailClick (index, row) {
      console.log(index, row)
      this.lookDetailDialogShow = true
    },
    editClick (index, row) {
      console.log(index, row)
      this.editDialogShow = true
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    shopStateChange (index, row) {
      console.log(index, row)
    }
  },
  mounted () {
    // setTimeout(function () {
    //   let tableCellStateArr = document.getElementsByClassName('tableCellState')
    //   console.log(tableCellStateArr)
    //   for (let i = 0; i < tableCellStateArr.length; i++) {
    //     tableCellStateArr[i].parentNode.parentNode.style.cssText = 'padding:0 !important'
    //     console.log(tableCellStateArr[i].parentNode)
    //     console.log(tableCellStateArr[i].parentNode.parentNode)
    //   }
    // })
  }
}
</script>
<style lang="less" scoped>
.shopManagement {
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
        p {
          font-size: 12px;
        }
        p:last-child {
          text-align: right;
          margin-right: 20px;
          color: rgb(0, 153, 229);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
