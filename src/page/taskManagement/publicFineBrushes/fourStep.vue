<template>
  <div class="fourStep">
    <div class="colTable">
      <div class="title">
        <el-row>
          <el-col :span="12" class="left">
            <span>快递类型:</span>
          </el-col>
          <el-col :span="12" class="right">
            <el-row>
              <el-col :span="20">
                <div class="right-container">
                  <span style="margin-right: 10px;">
                    总数:
                    <em class="red">{{gettask.totle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    PC:
                    <em class="red">{{gettask.pctotle}}</em>
                  </span>
                  <span style="margin-right: 10px;">
                    无线端:
                    <em class="red">{{gettask.apptotle}}</em>
                  </span>
                  <!-- <a class="btn btn-small">新增</a> -->
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="funTable">
        <el-row class="tableTitle">
          <el-col :span="8">快递类型</el-col>
          <el-col :span="16">说明</el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="8" class="textInput">
            <el-radio v-model="radio" label="1">平台代发</el-radio>
          </el-col>
          <el-col :span="16" class="textInput">
            <span>国内知名快递，全国发全国，自定义包裹重量。可提供底单、面单、内网物流截图。</span>
          </el-col>
        </el-row>
        <el-row class="tableContent">
          <el-col :span="8" class="textInput">
            <el-radio v-model="radio" label="0">自发空包</el-radio>
          </el-col>
          <el-col :span="16" class="textInput">
            <span>若不需要代发空包，每个任务减免2元。普通空包无法设置包裹内网重量，建议选择我们代发。</span>
          </el-col>
        </el-row>
      </div>
      <div class="totle">
        <el-row>
          <el-col :span="24" class="left">
            置顶费用:
            <el-input style="width:200px" v-model="zdfee" placeholder="请设置下单关键字"></el-input>
            <span style="color:#f00">友情提示：费用越高，任务越快被分配</span>
          </el-col>
        </el-row>
      </div>
      <div class="totle">
        <el-row>
          <el-col :span="24" class="left">
            任务备注:
            <el-input type="textarea" v-model="sellerRemark" placeholder="请设置下单关键字"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="btnGroup">
      <p @click="btnClick('back')">上一步</p>
      <p @click="btnClick('go')">提交</p>
    </div>

    <el-dialog title="支付密码" :visible.sync="dialogFormVisible">
      <el-input v-model="paypwd" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import btnGroup from "./components/btnGroup.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    btnGroup
  },
  data() {
    return {
      radio: "1",
      btnActive: 0,
      zdfee: "0",
      sellerRemark: "",
      paypwd: "",
      dialogFormVisible: false
    };
  },
  watch: {
    releasePriceList: {
      handler(newValue, oldValue) {},
      deep: true
    }
  },
  computed: {
    ...mapGetters(["gettask"]),
    ...mapGetters(["getdata"])
  },
  methods: {
    btnClick(val) {
      if (val === "back") {
        this.$emit("changeState", { state: "thirdStep" });
      } else {
        this.dialogFormVisible = true;
        this.$store.commit("update", {
          name: "expressType",
          value: this.radio
        });
        this.$store.commit("update", { name: "zdfee", value: this.zdfee });

        this.$store.commit("update", {
          name: "sellerRemark",
          value: this.sellerRemark
        });
      }
    },
    submit() {
      this.$store.commit("update", { name: "paypwd", value: this.paypwd });
      let newData = Object.assign({}, this.getdata);
      Object.keys(newData).forEach(function(key) {
        if (newData[key].constructor === Array) {
          newData[key] = JSON.stringify(newData[key]);
        }
      });
      //   return;
      this.$ajax
        .post("/ShopMember/taskRelease", newData)
        .then(res => {
          console.log(res);
          if (res.data.errcode == "0000") {
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.btnGroup {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  p {
    width: 250px;
    display: inline-block;
    cursor: pointer;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    line-height: 45px;
    color: #fff;
    background: #0099e5;
    border-radius: 25px;
    font-size: 16px;
    &:first-child {
      margin-right: 20px;
    }
  }
  .disabled {
    cursor: default;
    background-color: #ddd !important;
  }
}
.totle {
  background: #ccebfa;
  padding: 0 20px;
  .el-row {
    padding: 10px 0;
  }
}
.colTable .funTable > .el-row > .el-col {
  height: 40px;
  line-height: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.table {
  position: relative;
}
.goods-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 240px;
  height: 206px;
}
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
