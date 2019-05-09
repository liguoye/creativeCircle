<template>
  <div class="settingDialogCom">
    <el-dialog
      title="目标客户设置"
      :visible.sync="dialogShow"
      @close="dialogClose"
      width="60%"
      style="margin-top:20px;"
    >
      <div class="horizontal-rule">
        <span>目标客户设置</span>
      </div>
      <div class="content">
        <el-row>
          <el-col :span="4">性别：</el-col>
          <el-col :span="6">
            男 <el-input-number
              v-model="tableData.sex.mail"
              size="small"
              :min="0"
              :max="100"
              label="%"
            ></el-input-number>
          </el-col>
          <el-col :span="6">
            女 <el-input-number
              v-model="tableData.sex.femail"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">年龄：</el-col>
          <el-col :span="7">
              (18-24) <el-input-number
              v-model="tableData.age.one"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="7">
 (25-34) <el-input-number
              v-model="tableData.age.two"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="7">
 (35-40) <el-input-number
              v-model="tableData.age.three"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
      </div>
       <span slot="footer" class="dialog-footer">
    <el-button @click="dialogShow = false">取 消</el-button>
    <el-button type="primary" @click="dialogShow = false">保存</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    passdata: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    dialogTableVisible(val) {
      this.dialogShow = val;
    },
    'tableData.sex.mail'(n,o){
        this.tableData.sex.femail=100-n
    },
    'tableData.sex.femail'(n,o){
        this.tableData.sex.mail=100-n
    },
    'tableData.age.one'(n,o){
        this.tableData.age.two=100-n- this.tableData.age.three
    },
    'tableData.age.two'(n,o){
        this.tableData.age.three=100-n- this.tableData.age.one
    },
    'tableData.age.three'(n,o){
        this.tableData.age.two=100-n- this.tableData.age.one
    },
  },
  data() {
    return {
      dialogShow: false,
      tableData: {
        sex: {
          mail: 70,
          femail:30
        },
        age: {
          one: 24,
          two:42,
          
          three: 34
        }
      }
    };
  },
  created() {},
  methods: {
    dialogClose() {
      this.$emit("dialogClose", false);
    }
  }
};
</script>
<style lang="less" scoped>
.el-row{
    margin-top: 20px;
}
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
.horizontal-rule::before {
  content: "";
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
