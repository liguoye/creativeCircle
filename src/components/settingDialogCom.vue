<template>
  <div class="settingDialogCom">
    <el-dialog title="其他筛选条件" :visible.sync="dialogShow" @close="dialogClose">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="formData.sortOrder.check">排序方式</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-select style="width:100%" v-model="formData.sortOrder.value" placeholder="请选择" :disabled="!formData.sortOrder.check">
              <el-option v-for="item in formData.sortOrder.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="formData.endPrice.check">价格区间</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="11">
                <el-input v-model="formData.beginPrice.value" placeholder="最低价" :disabled="!formData.endPrice.check"></el-input>
              </el-col>
              <el-col :span="2" style="text-align:center">～～</el-col>
              <el-col :span="11">
                <el-input v-model="formData.endPrice.value" placeholder="最高价" :disabled="!formData.endPrice.check"></el-input>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="formData.shipment.check">发货地</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-input v-model="formData.shipment.value" :disabled="!formData.shipment.check"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox v-model="formData.otherCondition.check">其他</el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-input v-model="formData.otherCondition.value" placeholder="" :disabled="!formData.otherCondition.check"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
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
    },
    settingData: {
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
    settingData (val) {
      console.log('settingData', val)
      for (let item in this.formData) {
        if (val[item]) {
          this.formData[item].value = val[item]
        } else {
          this.formData[item].value = ''
        }
      }
    }
  },
  data () {
    return {
      formData: {
        sortOrder: {
          check: false,
          value: '',
          options: [
            { label: '综合', value: '综合' },
            { label: '销量', value: '销量' },
            { label: '价格从低到高', value: '价格从低到高' },
            { label: '价格从高到低', value: '价格从高到低' }
          ]
        },
        endPrice: {
          check: false,
          value: ''
        },
        beginPrice: {
          check: false,
          value: ''
        },
        shipment: {
          check: false,
          value: ''
        },
        otherCondition: {
          check: false,
          value: ''
        }
      },
      dialogShow: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose', false)
      for (let item in this.formData) {
        // this.formData[item].value = ''
        this.formData[item].check = false
      }
    },
    dialogConfirm () {
      this.$emit('dialogConfirm', {
        sortOrder: this.formData.sortOrder.value,
        beginPrice: this.formData.beginPrice.value,
        endPrice: this.formData.endPrice.value,
        otherCondition: this.formData.otherCondition.value,
        shipment: this.formData.shipment.value
      })
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
