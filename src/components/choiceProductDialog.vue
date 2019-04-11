<template>
  <div class=" choiceProductDialog">
    <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
      <div class="content">
        <el-row>
          <el-col :span="3">选择店铺:</el-col>
          <el-col :span="4">
            <el-select v-model="web.value" placeholder="请选择">
              <el-option v-for="item in web.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="shop.value" placeholder="请选择">
              <el-option v-for="item in shop.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="goodsName.value" placeholder="请选择">
              <el-option v-for="item in goodsName.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="keyWord" placeholder=""></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini">搜索</el-button>
          </el-col>
        </el-row>

        <el-table :data="data" height="250" border style="width: 100%">
          <el-table-column v-for="(item,index) in columns" :key="index" :width="item.width" :prop="item.code" :label="item.name"
            align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default () {
        return [
        ]
      }
    },
    data: {
      type: Array,
      default () {
        return [
        ]
      }
    },

    dialogTableVisible: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      web: {
        value: '淘宝',
        options: [
          { label: '淘宝', value: '淘宝' }
        ]
      },
      shop: {
        value: '',
        options: [
          { label: '所有店铺', value: '所有店铺' },
          { label: 'tourmate途美利威专卖店', value: 'tourmate途美利威专卖店' },
          { label: '羽马汽车用品专营店', value: '羽马汽车用品专营店' }
        ]
      },
      goodsName: {
        value: '',
        options: [
          { label: '商品名称', value: '商品名称' },
          { label: '商品ID', value: '商品ID' }
        ]
      },
      keyWord: ''
    }
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
