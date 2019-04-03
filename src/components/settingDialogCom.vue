<template>
  <div class="settingDialogCom">
    <el-dialog title="其他筛选条件" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="sortOrder.check">排序方式</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-select style="width:100%" v-model="sortOrder.value" placeholder="请选择">
              <el-option v-for="item in sortOrder.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="priceRange.check">价格区间</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="11">
                <el-input v-model="priceRange.bottom" placeholder="最低价"></el-input>
              </el-col>
              <el-col :span="2" style="text-align:center">～～</el-col>
              <el-col :span="11">
                <el-input v-model="priceRange.top" placeholder="最高价"></el-input>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="sendGoods.check">发货地</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-input v-model="sendGoods.val" placeholder=""></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="others.check">其他</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-input v-model="others.value" placeholder=""></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false">确 定</el-button>
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
      dialogShow: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
    }
  }
}
</script>
<style lang="less" scoped>
.el-dialog {
  .content {
    > .el-row {
      > .el-col {
        height: 40px;
        line-height: 40px;
        &:first-child {
          text-align: left;
        }
      }
    }
  }
}
</style>
