<template>
  <div class="pubilcFlowTask">
    <div class="taskManagementNavList">
      <ul>
        <li @click="navListClick('pubilcFlowTask')" class="current">发布流量任务</li>
        <li @click="navListClick('flowTaskManagement')">流量任务管理</li>
      </ul>

      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">选定商品</el-col>
            <el-col :span="12" class="right">
              <el-button class="tableBtn" type="primary" @click="choiceProductDialogShow=true">选择商品</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-row>
            <el-col :span="5">商品简称</el-col>
            <el-col :span="14"></el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品ID</el-col>
            <el-col :span="14"></el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">店铺名</el-col>
            <el-col :span="14"></el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品标题</el-col>
            <el-col :span="14"></el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品链接</el-col>
            <el-col :span="14"></el-col>
            <el-col :span="5"></el-col>
          </el-row>
        </div>
      </div>
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">来路设置</el-col>
            <el-col :span="12" class="right">
              <el-row>
                <el-col :span="20">
                  <div class="right-container">
                    <span style="margin-right: 10px;">当前总数:
                      <em class="red">0</em>
                    </span>
                    <span style="margin-right: 10px;">未来0天可发布总数:
                      <em class="red">0</em>
                    </span>
                    <span style="margin-right: 10px;">PC:
                      <em class="red">0</em>
                    </span>
                    <span style="margin-right: 10px;">无线端:
                      <em class="red">0</em>
                    </span>
                    <a class="btn btn-small">新增</a>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-button class="tableBtn" type="primary">新增</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="funTable">
          <el-row class="tableTitle">
            <el-col :span="4">流量入口</el-col>
            <el-col :span="10">关键字</el-col>
            <el-col :span="4">数量</el-col>
            <el-col :span="4">其他筛选条件
              <!---->
              <span>（可选）</span>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row class="tableContent">
            <el-col :span="4" class="flowEnterSelect">
              <el-select v-model="tableData.flowEnter.value" placeholder="请选择">
                <el-option v-for="item in tableData.flowEnter.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="10" class="textInput">
              <el-input v-model="tableData.orderKeyword" placeholder="请设置关键字"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input-number size="mini" v-model="tableData.account"></el-input-number>
            </el-col>
            <el-col :span="4">
              <el-button class="tableBtn" type="primary" @click="settingClick">设置</el-button>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="150px" style="margin-top:20px;">
        <el-form-item label="备注信息（选填）：">
          <el-input type="textarea" v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col :span="12" class="left">
            <span style="margin-right:10px;">发布时间</span>
            <el-radio v-model="publicTiem" label="1">立即发布</el-radio>
            <el-radio v-model="publicTiem" label="2">今天平均发布</el-radio>
            <el-radio v-model="publicTiem" label="3">多天平均发布</el-radio>
          </el-col>
          <el-col :span="12" class="right">
            <el-row>
              <el-col :span="24">
                <div class="right-container">
                  <span style="margin-right: 10px;">总数:
                    <em class="red">0</em>
                  </span>
                  <span style="margin-right: 10px;">PC:
                    <em class="red">0</em>
                  </span>
                  <span style="margin-right: 10px;">无线端:
                    <em class="red">0</em>
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="funTable">
        <el-row class="tableTitle">
          <el-col :span="6">日期（剩余可发布数)</el-col>
          <el-col :span="6">任务数（0）</el-col>
          <el-col :span="4">开始时间</el-col>
          <el-col :span="4">结束时间</el-col>
          <el-col :span="4">超时取消</el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">基础费用合计：0元</el-col>
        </el-row>
      </div>
    </div>
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col :span="24" class="left">
            <span style="margin-right:10px;">增值服务</span>
            <span style="color:red">（即日起，增值服务需要收取附加费，同时要求买手上传相应截图证明）</span>
          </el-col>
        </el-row>
      </div>
      <div class="funTable">
        <el-row class="tableTitle">
          <el-col :span="6">任务名称</el-col>
          <el-col :span="6">占比</el-col>
          <el-col :span="4">数量</el-col>
          <el-col :span="4">单价</el-col>
          <el-col :span="4">费用</el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">增值总费用：0.0元</el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <div>
        <span style="margin-top: 28px;">
          <span>任务总数：0&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="margin-top: 8px;">
            总费用
            <span style="color: rgb(136, 136, 136);">(基础总费用+增值总费用)</span>：
            <span style="font-size: 17px; color: rgb(250, 0, 0);">0.0元</span>
          </span>
        </span>
      </div>
      <div class="goet" style="text-align: right;">
        <span>支付密码：</span> <input type="password" v-model="password"></div>
      <div>
        <el-button type="primary">确认发布</el-button>
      </div>
    </div>
    <setting-dialog-com :dialog-table-visible="dialogTableVisible"></setting-dialog-com>
    <choice-product-dialog :columns="choiceProductDialogData.columns" :data="choiceProductDialogData.data" :dialog-table-visible="choiceProductDialogShow"></choice-product-dialog>
  </div>
</template>
<script>
import settingDialogCom from '@/components/settingDialogCom.vue'
import choiceProductDialog from '@/components/choiceProductDialog.vue'
export default {
  components: {
    settingDialogCom,
    choiceProductDialog
  },
  data () {
    return {
      msg: 'pubilcFlowTask',
      btnActive: 1,
      dialogTableVisible: false,
      dialogVisible: false,
      choiceProductDialogShow: false,
      choiceProductDialogData: {
        data: [],
        columns: [
          { name: '选择商品', code: 'task1', width: '' },
          { name: '店铺名', code: 'task2', width: '' },
          { name: '商品简称', code: 'task3', width: '' },
          { name: '商品ID', code: 'task4', width: '' },
          { name: '商品标题', code: 'task5', width: '' }
        ]
      },
      tableData: {
        flowEnter: {
          value: '',
          options: []
        },
        browseKeyword: '',
        orderKeyword: '',
        account: ''
      },
      form: {
        note: ''
      },
      publicTiem: '',
      password: ''
    }
  },
  methods: {
    settingClick () {
      this.dialogTableVisible = true
    },
    navListClick (val) {
      this.$router.push({ name: val, param: { tab: val } })
    }
  }
}
</script>
<style lang="less" scoped>
.pubilcFlowTask {
  width: 1150px;
  margin: 0 auto;
  padding-bottom: 50px;
  .bottom {
    text-align: right;
    margin-top: 20px;
    > div {
      margin-bottom: 10px;
    }
  }
  .tableBtn {
    background: #0099e5;
    text-align: center;
    color: #fff;
    text-align: center;
    border-radius: 25px;
    padding: 8px 20px;
    cursor: pointer;
  }
}
</style>
