<template>
  <div class="secondStep">
    <div class="content">
      <div class="colTable">
        <div class="title">
          <el-row>
            <el-col :span="12" class="left">选定商品888</el-col>
            <el-col :span="12" class="right">
              <el-button class="tablebtnActive" type="primary" @click="choiceProductDialogShow=true">选择商品</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-row>
            <el-col :span="5">商品简称</el-col>
            <el-col :span="14">{{goodsData.abbreviation}}</el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品ID</el-col>
            <el-col :span="14">{{goodsData.goodsid}}</el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">店铺名</el-col>
            <el-col :span="14">{{goodsData.shop_name}}</el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品标题</el-col>
            <el-col :span="14">{{goodsData.title}}</el-col>
            <el-col :span="5"></el-col>
          </el-row>
          <el-row>
            <el-col :span="5">商品链接</el-col>
            <el-col :span="14">{{goodsData.url}}</el-col>
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
                  <el-button class="tableBtn" type="primary" @click="addPathData">新增</el-button>
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
          <template v-for="(item,index) in pathSettingData">
            <el-row class="tableContent" :key="index">
              <el-col :span="3" class="flowEnterSelect">
                <el-select v-model="pathSettingData[index].flowid.value" placeholder="请选择">
                  <el-option v-for="list in pathSettingData[index].flowid.options" :key="list.value" :label="list.label" :value="list.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" class="textInput">
                <el-input v-model="pathSettingData[index].keyword" placeholder="请设置浏览(类目核心词,长尾词,热搜词"></el-input>
              </el-col>
              <el-col :span="4" class="textInput">
                <el-input v-model="pathSettingData[index].orderKeyword" placeholder="请设置下单关键字"></el-input>
              </el-col>
              <el-col :span="4" class="section">
                <el-input v-model="pathSettingData[index].beginPrice" placeholder="最低价"></el-input>～
                <el-input v-model="pathSettingData[index].endPrice" placeholder="最高价"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input-number size="mini" v-model="pathSettingData[index].taskNum"></el-input-number>
              </el-col>
              <el-col :span="4">
                <el-button class="tableBtn" type="primary" @click="settingClick(index)">设置</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="danger" size='mini' @click="deletePathData(index)" style="border-radius:25px">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
    <btn-group :btn-active="btnActive" @btnClick="btnClick"></btn-group>
    <setting-dialog-com :dialog-table-visible="dialogTableVisible" @dialogClose="settingDialogClose" @dialogConfirm="settingDialogConfirm"
      :setting-data="pathSettingIndexData"></setting-dialog-com>
    <choice-product-dialog @dialogClose="choiceDialogClose" @dialogConfirm="choiceDialogConfirm" :dialog-table-visible="choiceProductDialogShow"></choice-product-dialog>
    <el-dialog title="请核对填写内容" :visible.sync="dialogVisible" width="30%">
      <span>请选择一个商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import btnGroup from '../components/btnGroup.vue'
import settingDialogCom from '@/components/settingDialogCom.vue'
import choiceProductDialog from '@/components/choiceProductDialog.vue'
export default {
  components: {
    btnGroup,
    choiceProductDialog,
    settingDialogCom
  },
  data () {
    return {
      radio: '1',
      btnActive: 1,
      dialogTableVisible: false,
      choiceProductDialogShow: false,
      pathSettingIndexData: {},
      pathSetIndex: 0,
      goodsData: {},
      dialogVisible: false,
      pathSettingData: [{
        flowid: {
          value: '',
          options: [
            { label: 'APP自然搜索', value: 1 },
            { label: '淘口令', value: 2 },
            { label: '直通车', value: 3 },
            { label: '二维码', value: 4 }
          ]
        },
        keyword: '',
        taskNum: '',
        sortOrder: '', // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: 0, // 价格区间起始
        endPrice: 0, // 价格区间最大值
        shipment: '', // 发货地
        otherCondition: '' // 其他
      }]
    }
  },
  methods: {
    choiceDialogConfirm (row) {
      this.goodsData = row
    },
    settingDialogClose () {
      this.dialogTableVisible = false
    },
    choiceDialogClose () {
      this.choiceProductDialogShow = false
    },
    settingClick (index) {
      this.pathSetIndex = index
      this.pathSettingIndexData = this.pathSettingData[index]
      this.dialogTableVisible = true
    },
    settingDialogConfirm (param) {
      console.log(this.pathSettingData[this.pathSetIndex])
      console.log(this.pathSettingData)
      console.log('index', this.pathSetIndex)
      for (let item in param) {
        this.pathSettingData[this.pathSetIndex][item] = param[item]
      }
    },
    addPathData () {
      this.pathSettingData.push({
        flowid: {
          value: '',
          options: [
            { label: 'APP自然搜索', value: 1 },
            { label: '淘口令', value: 2 },
            { label: '直通车', value: 3 },
            { label: '二维码', value: 4 }
          ]
        },
        keyword: '',
        taskNum: '',
        sortOrder: '', // 排序方式(综合，销量，价格高到低，价格低到高)
        beginPrice: 0, // 价格区间起始
        endPrice: 0, // 价格区间最大值
        shipment: '', // 发货地
        otherCondition: '' // 其他
      })
    },
    deletePathData (index) {
      this.pathSettingData.splice(index, 1)
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
