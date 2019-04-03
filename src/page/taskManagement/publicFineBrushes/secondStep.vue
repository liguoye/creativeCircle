<template>
  <div class="secondStep">
    <div class="content">
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">选定商品</el-col>
            <el-col :span="12" class="right">
              <el-button class="tableBtn" type="primary">选择商品</el-button>
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
                    <span style="margin-right: 10px;">总数:
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
            <el-col :span="3">流量入口</el-col>
            <el-col :span="4">浏览关键字
              <span>（选填）</span>
            </el-col>
            <el-col :span="4">下单关键字</el-col>
            <el-col :span="4">浏览商品价格区间
              <span>（选填）</span>)</el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="4">其他筛选条件
              <!---->
              <span>（可选）</span>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row class="tableContent">
            <el-col :span="3" class="flowEnterSelect">
              <el-select v-model="tableData.flowEnter.value" placeholder="请选择">
                <el-option v-for="item in tableData.flowEnter.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="textInput">
              <el-input v-model="tableData.browseKeyword" placeholder="请设置浏览(类目核心词,长尾词,热搜词"></el-input>
            </el-col>
            <el-col :span="4" class="textInput">
              <el-input v-model="tableData.orderKeyword" placeholder="请设置下单关键字"></el-input>
            </el-col>
            <el-col :span="4" class="section">
              <el-input v-model="tableData.orderKeyword" placeholder="最低价"></el-input>～
              <el-input v-model="tableData.orderKeyword" placeholder="最高价"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input-number size="mini" v-model="tableData.account"></el-input-number>
            </el-col>
            <el-col :span="4">
              <el-button class="tableBtn" type="primary" @click="settingClick">设置</el-button>
            </el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <btn-group :btn-active="btnActive" @btnClick="btnClick"></btn-group>
    <setting-dialog-com :dialog-table-visible="dialogTableVisible"></setting-dialog-com>
    <el-dialog title="请核对填写内容" :visible.sync="dialogVisible" width="30%">
      <span>请选择一个商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import btnGroup from './components/btnGroup.vue'
import settingDialogCom from '@/components/settingDialogCom.vue'
export default {
  components: {
    btnGroup,
    settingDialogCom
  },
  data () {
    return {
      radio: '1',
      btnActive: 1,
      dialogTableVisible: false,
      dialogVisible: false,
      tableData: {
        flowEnter: {
          value: '',
          options: []
        },
        browseKeyword: '',
        orderKeyword: '',
        account: ''
      }
    }
  },
  methods: {
    settingClick () {
      this.dialogTableVisible = true
    },
    btnClick (val) {
      if (val === 'back') {
        this.$emit('changeState', { state: 'firstStep' })
      } else {
        if (this.btnActive === 1) {
          this.dialogVisible = true
          return ''
        } else {
          this.$emit('changeState', { state: 'thirdStep' })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tableBtn {
  background: #0099e5;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  padding: 5px 10px;
  cursor: pointer;
}
// .secondStep {
//   .content {
//   }
// }
</style>
