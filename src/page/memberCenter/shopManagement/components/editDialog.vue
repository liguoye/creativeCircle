<template>
  <div class="settingDialogCom">
    <el-dialog title="编辑发货人信息" :visible.sync="dialogShow" @close="dialogClose" width="50%">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>掌柜号：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="sendGoods.val" placeholder="tourmate途美利威专卖店" diisabled></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货人：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="others.value" placeholder=""></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货人手机号：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="others.value" placeholder=""></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货省市区：</p>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="8" style="padding-right:5px;">
                <el-select style="width:100%" v-model="sortOrder.value" placeholder="请选择">
                  <el-option v-for="item in sortOrder.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-select style="width:100%" v-model="sortOrder.value" placeholder="请选择">
                  <el-option v-for="item in sortOrder.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select style="width:100%" v-model="sortOrder.value" placeholder="请选择">
                  <el-option v-for="item in sortOrder.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货详细地址：</p>
          </el-col>
          <el-col :span="18">
            <el-input type="textarea" v-model="sortOrder.value"></el-input>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:30px;">温馨提示：发货人信息会显示在快递单上，所以请如实填写</div>
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
          text-align: right;
        }
      }
    }
  }
}
</style>
