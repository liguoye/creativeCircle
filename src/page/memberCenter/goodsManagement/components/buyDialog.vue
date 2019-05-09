<template>
  <div class="settingDialogCom">
    <el-dialog
      title="购买行为设置"
      :visible.sync="dialogShow"
      @close="dialogClose"
      width="60%"
      style="margin-top:20px;"
    >
      <div class="horizontal-rule">
        <span>购买行为设置</span>
      </div>
      <div class="content">
        <!-- 收藏店铺 -->
        <el-row>
          <el-col :span="4">收藏店铺：</el-col>
          <el-col :span="6">
            <el-input-number
              v-model="tableData.shop"
              size="small"
              :min="0"
              :max="100"
              label="%"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 收藏商品 -->
        <el-row>
          <el-col :span="4">收藏商品：</el-col>
          <el-col :span="6">
            <el-input-number
              v-model="tableData.goods"
              size="small"
              :min="0"
              :max="100"
              label="%"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 拍前聊 -->
        <el-row>
          <el-col :span="4">拍前聊：</el-col>
          <el-col :span="6">
            <el-input-number
              v-model="tableData.chat"
              size="small"
              :min="0"
              :max="100"
              label="%"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 货比N家 -->
        <el-row>
          <el-col :span="3">货比N家：</el-col>
          <el-col :span="5">
            不比货 <el-input-number
              v-model="tableData.bi.one"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            货比一家<el-input-number
              v-model="tableData.bi.two"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            货比两家 <el-input-number
              v-model="tableData.bi.three"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            货比三家 <el-input-number
              v-model="tableData.bi.four"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 复购周期 -->
        <el-row>
          <el-col :span="3">复购周期：</el-col>
          <el-col :span="5">
            不限制 <el-input-number
              v-model="tableData.fu.one"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            一个月<el-input-number
              v-model="tableData.fu.two"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            三个月 <el-input-number
              v-model="tableData.fu.three"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 浏览深度 -->
        <el-row>
          <el-col :span="3">浏览深度：</el-col>
          <el-col :span="5">
            不浏览 <el-input-number
              v-model="tableData.liu.one"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            店内一款<el-input-number
              v-model="tableData.liu.two"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            店内两款 <el-input-number
              v-model="tableData.liu.three"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            店内三款 <el-input-number
              v-model="tableData.liu.four"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 停留时间 -->
        <el-row>
          <el-col :span="3">停留时间：</el-col>
          <el-col :span="5">
            不限制 <el-input-number
              v-model="tableData.ting.one"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            五分钟<el-input-number
              v-model="tableData.ting.two"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
          <el-col :span="5">
            十分钟 <el-input-number
              v-model="tableData.ting.three"
              size="small"
              :min="0"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogShow = false"
        >保存</el-button>
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
    "tableData.bi.one"(n, o) {
      this.tableData.bi.two =
        100 - n - this.tableData.bi.three - this.tableData.bi.four;
    },
    "tableData.bi.two"(n, o) {
      this.tableData.bi.one =
        100 - n - this.tableData.bi.three - this.tableData.bi.four;
    },
    "tableData.bi.three"(n, o) {
      this.tableData.bi.two =
        100 - n - this.tableData.bi.three - this.tableData.bi.four;
    },
    "tableData.bi.four"(n, o) {
      this.tableData.bi.three =
        100 - n - this.tableData.bi.one - this.tableData.bi.two;
    },
    // 复购
     "tableData.fu.one"(n, o) {
      this.tableData.fu.two =
        100 - n - this.tableData.fu.three 
    },
    "tableData.fu.two"(n, o) {
      this.tableData.fu.one =
        100 - n - this.tableData.fu.three 
    },
    "tableData.fu.three"(n, o) {
      this.tableData.fu.two =
        100 - n - this.tableData.fu.three
    },
    // 停留
     "tableData.ting.one"(n, o) {
      this.tableData.ting.two =
        100 - n - this.tableData.ting.three 
    },
    "tableData.ting.two"(n, o) {
      this.tableData.ting.one =
        100 - n - this.tableData.ting.three 
    },
    "tableData.ting.three"(n, o) {
      this.tableData.ting.two =
        100 - n - this.tableData.ting.three
    },
    // 浏览
    "tableData.liu.one"(n, o) {
      this.tableData.liu.two =
        100 - n - this.tableData.liu.three - this.tableData.liu.four;
    },
    "tableData.liu.two"(n, o) {
      this.tableData.liu.one =
        100 - n - this.tableData.liu.three - this.tableData.liu.four;
    },
    "tableData.liu.three"(n, o) {
      this.tableData.liu.two =
        100 - n - this.tableData.liu.three - this.tableData.liu.four;
    },
    "tableData.liu.four"(n, o) {
      this.tableData.liu.three =
        100 - n - this.tableData.liu.one - this.tableData.liu.two;
    }
  },
  data() {
    return {
      dialogShow: false,
      tableData: {
        shop: 50,
        goods: 50,
        chat: 50,
        bi: {
          one: 25,
          two: 25,
          three: 25,
          four: 25
        },
        fu: {
          one: 30,
          two: 35,
          three: 35
        },
        liu: {
          one: 25,
          two: 25,
          three: 25,
          four: 25
        },
        ting: {
          one: 30,
          two: 35,
          three: 35
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
.el-row {
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
