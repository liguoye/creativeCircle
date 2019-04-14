<template>
  <div class=" choiceProductDialog">
    <el-dialog title="选择商品" :visible.sync="dialogShow" @close="dialogClose" width="60%">
      <div class="content">
        <el-row>
          <el-col :span="3">选择店铺:</el-col>
          <el-col :span="6">
            <el-select v-model="shop_name.value" placeholder="请选择店铺">
              <el-option v-for="item in shop_name.options" :key="item.shop_name" :label="item.shop_name" :value="item.shop_name">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="title" placeholder="请输入商品名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="goodsid" placeholder="请输入商品ID"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" @click="getGoodsData">搜索</el-button>
          </el-col>
        </el-row>

        <el-table :data="data" height="250" border style="width: 100%" :highlight-current-row="true" @row-click="onRowClick" @row-dblclick="rowDbClick">
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column v-for="(item,index) in columns" :key="index" :width="item.width" :prop="item.code" :label="item.name" align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
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
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.dialogShow = val
    }
  },
  data () {
    return {
      dialogShow: false,
      pagination: {
        currentPage: 1,
        total: 100
      },
      data: [],
      columns: [
        { name: '店铺名', code: 'shop_name', width: '', com: 'input' },
        { name: '商品简称', code: 'abbreviation', width: '', com: 'input' },
        { name: '商品ID', code: 'goodsid', width: '' },
        { name: '商品标题', code: 'title', width: '' }
      ],
      shop_name: {
        value: '',
        options: [
          { label: '所有店铺', value: '所有店铺' },
          { label: 'tourmate途美利威专卖店', value: 'tourmate途美利威专卖店' },
          { label: '羽马汽车用品专营店', value: '羽马汽车用品专营店' }
        ]
      },
      title: '',
      goodsid: ''
    }
  },
  methods: {
    getShop () {
      this.$ajax('shop/index').then(res => {
        console.log('shopshop', res)
        if (res && res.data && res.data.code === 1) {
          this.shop_name.options = res.data.data.data
        }
      })
    },
    getGoodsData () {
      this.$ajax('goods/index', {
        params: {
          token: this.$getToken(),
          shopid: this.shop_name.value,
          title: this.title,
          goodsid: this.goodsid,
          page: this.pagination.currentPage
        }
      }).then(res => {
        console.log('goods', res)
        if (res && res.data && res.data.code === 1) {
          this.data = res.data.data
          this.pagination.total = res.data.total
        }
      })
    },
    onRowClick (row) {
      this.activeRow = row
    },
    rowDbClick (row) {
      this.activeRow = row
      this.dialogConfirm()
    },
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    dialogConfirm () {
      this.$emit('dialogConfirm', this.activeRow)
      this.$emit('dialogClose', false)
    }
  },
  mounted () {
    this.getShop()
  }
}
</script>
<style lang="less" scoped>
.el-dialog {
  .content {
    > .el-row {
      > .el-col {
        padding-left: 5px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        &:first-child {
          text-align: left;
        }
      }
    }
  }
}
</style>
