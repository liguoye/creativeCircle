<template>
  <div class="settingDialogCom">
    <el-dialog title="添加商品" :visible.sync="dialogShow" @close="dialogClose" width="60%" style="margin-top:20px;">
      <div class="horizontal-rule">
        <span>商品基本信息</span>
      </div>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">掌柜号：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-select v-model="rowData.shopid" placeholder="请选择掌柜号" style="width:100%">
            <el-option :label="item.shop_name" v-for="(item,index) in passdata" :key="index" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">商品链接：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-input v-model="rowData.url" style="width:calc(100% - 110px) " placeholder="请在输入商品链接后点击获取详情按钮"></el-input>
          <el-button type="primary" @click="openGoodsDetail" size="mini" style="height:35px;">获取商品详情</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">商品名称：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-input v-model="rowData.title"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">商品简称：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-input v-model="rowData.abbreviation" placeholder="请输入2-10位中文、数字、英文，简称可以帮助你快速识别商品"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">商品重量：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-input v-model="rowData.kg" placeholder="请输入单件商品的重量(KG)"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;">商品类别：</el-col>
        <el-col :span="20" style="width:calc(100% - 140px)">
          <el-input type="textarea" v-model="rowData.class_name" placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="width:120px;text-align:right;line-height:35px;;text-align:right;line-height:35px;"></el-col>
        <el-col :span="20" style="width:calc(100% - 140px)"></el-col>
      </el-row>
      <div style="text-align:center;margin-bottom:50px;">
        <el-button type="primary" @click="editConfirm()">保存</el-button>
        <el-button @click="dialogShow=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default () {
        return false
      }
    },
    passdata: {
      type: Array,
      default () {
        return []
      }
    },
    tableRowData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.dialogShow = val
    },
    tableRowData (val) {
      if (val) {
        for (let item in val) {
          if (typeof val[item] !== 'undefined' && val[item] !== null && val[item] !== '') {
            this.rowData[item] = val[item]
          } else {
            this.rowData[item] = ''
          }
        }
      }
    }
  },
  data () {
    return {
      fileList: [],
      dialogShow: false,
      rowData: {
        shopid: '',
        url: '',
        title: '',
        img: '',
        mobile_img: '',
        abbreviation: '',
        kg: '',
        class_name: '',
        tmall_img: '',
        through_train_img: ''
      }
    }
  },
  created () {
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    editConfirm () {
      this.$emit('editConfirm', this.rowData)
    },
    openGoodsDetail () {
    }
  }
}
</script>
<style lang="less" scoped>
.horizontal-rule {
  color: #aaa;
  font-size: 15px;
  text-align: center;
  position: relative;
  margin-bottom: 15px;
  span {
    padding: 0 5px;
    position: relative;
    background-color: #fff;
  }
}
.el-col {
  margin-bottom: 10px;
}
.horizontal-rule::before {
  content: '';
  width: 88%;
  position: absolute;
  left: 6%;
  top: 50%;
  border-bottom: 1px dashed;
}
.el-dialog {
  margin-top: 20px;
}
</style>
