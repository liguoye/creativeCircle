<template>
  <div class="settingDialogCom">
    <el-dialog
      title="添加商品"
      :visible.sync="dialogShow"
      @close="dialogClose"
      width="60%"
      style="margin-top:20px;"
    >
      <div class="horizontal-rule">
        <span>商品基本信息</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="掌柜号：" prop="shop_id">
          <el-select v-model="ruleForm.shop_id" placeholder="请选择掌柜号" style="width:100%">
            <el-option
              :label="item.shop_name"
              v-for="(item,index) in passdata"
              :key="index"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品链接：" prop="goods_url">
          <el-input
            v-model="ruleForm.goods_url"
            style="width:calc(100% - 110px) "
            placeholder="请在输入商品链接后点击获取详情按钮"
          ></el-input>
          <el-button type="primary" @click="openGoodsDetail" size="mini" style="height:35px;">获取商品详情</el-button>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goods_name">
          <el-input v-model="ruleForm.goods_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="goods_img">
          <img style="width200px;height:200px" :src="ruleForm.goods_img" alt srcset>
        </el-form-item>
        <el-form-item label="无线端商品主图：" prop="unless_img">
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadUnless"
          >
            <img v-if="ruleForm.unless_img" :src="ruleForm.unless_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="horizontal-rule">
          <span>商品自定义信息</span>
        </div>
        <el-form-item label="商品简称：" prop="simple_name">
          <el-input v-model="ruleForm.simple_name" placeholder="请输入2-10位中文、数字、英文，简称可以帮助你快速识别商品"></el-input>
        </el-form-item>
        <el-form-item label="商品重量：" prop="goods_weight">
          <el-input v-model="ruleForm.goods_weight" placeholder="请输入单件商品的重量(KG)"></el-input>
          <p class="tip red">温馨提醒：物品重量会显示在物流公司内网中，可在0.5KG至40.00KG之间自行设定</p>
        </el-form-item>
        <el-form-item label="商品类别：" prop="goods_cate">
          <el-input
            type="textarea"
            v-model="ruleForm.goods_cate"
            placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中"
          ></el-input>
        </el-form-item>
        <div class="horizontal-rule">
          <span>商品图片信息 ( 选填 )</span>
        </div>
        <el-form-item label="天猫展示图：" prop="tianmao_img">
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadTianmao"
          >
            <img v-if="ruleForm.tianmao_img" :src="ruleForm.tianmao_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="直通车展示图：" prop="zhitongche_img">
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadZhitongche"
          >
            <img v-if="ruleForm.zhitongche_img" :src="ruleForm.zhitongche_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="text-align:center;margin-bottom:50px;">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import json from "../../../../utils/province";

function GetUrlParam(url, paraName) {
  var curl = url.toString();
  var arrObj = curl.split("?");

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}
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
    "ruleForm.province"(newValue, oldValue) {
      this.getCity(newValue);
      this.ruleForm.city = "";
      this.ruleForm.area = "";
    },
    "ruleForm.shop_id"(newValue, oldValue) {
    //   alert(newValue);
    },
    "ruleForm.city"(newValue, oldValue) {
      this.getDis(newValue);
      this.ruleForm.area = "";
    }
  },
  data() {
    return {
      fileList: [],
      dialogShow: false,
      ruleForm: {
        shop_id: "",
        goods_url: "",
        goods_name: "",
        goods_img: "",
        unless_img: "",
        simple_name: "",
        goods_weight: "",
        goods_cate: "",
        tianmao_img: "",
        zhitongche_img: "",
        tb_goodsid:''
      },
      goodsImgList: [],
      unlessList: [],
      tianmaoList: [],
      zhitongcheList: [],
      rules: {
        type: [{ required: true, message: "请选择店铺类型", trigger: "blur" }],
        shop_id: [{ required: true, message: "请选择掌柜号", trigger: "blur" }],
        goods_url: [
          { required: true, message: "请输入商品链接", trigger: "blur" }
        ],
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        simple_name: [
          { required: true, message: "请输入商品简称", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_cate: [
          { required: true, message: "请输入商品类型", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.allList = json;
    this.getProvince();
  },
  methods: {
    openGoodsDetail() {
      if (!this.ruleForm.shop_id) {
        this.$notify.error({
          title: "请选择店铺"
        });
        return;
      }
      if (!this.ruleForm.goods_url) {
        this.$notify.error({
          title: "请输入链接"
        });
        return;
      }
       // console.log(this.ruleForm);
      let id = GetUrlParam(this.ruleForm.goods_url, "id");
      this.ruleForm.tb_goodsid=id
      if (!id) {
        this.$notify.error({
          title: "没有检测到商品id"
        });
        return;
      }
     // console.log(this.ruleForm.shop_id);
      this.$ajax
        .post("shopmember/getTaobaoGoods", {
          shopid: this.ruleForm.shop_id,
          goodsid: id
        })
        .then(res => {
        //  console.log(res);
          if (res.data.code == "1") {
            this.ruleForm.goods_img = res.data.data.picUrl;
            this.ruleForm.goods_name = res.data.data.title;
           // console.log(this.ruleForm.goods_img);
          }
        });
    },
    removePic() {},
    uploadGoods(data) {
      if (data.code === 1) {
        this.ruleForm.goods_img = data.data;
      } else {
        this.$notify.error({
          title: "上传图片失败"
        });
        this.goodsImgList = [];
      }
    },
    uploadUnless(data) {
     // console.log(data);
      if (data.code === 1) {
        this.ruleForm.unless_img = "http://h5om.knowsea.cn" + data.data;
      } else {
        this.$notify.error({
          title: "上传图片失败"
        });
        this.goodsImgList = [];
      }
    },
    uploadTianmao(data) {
      if (data.code === 1) {
        this.ruleForm.tianmao_img =  "http://h5om.knowsea.cn" +data.data;
      } else {
        this.$notify.error({
          title: "上传图片失败"
        });
        this.goodsImgList = [];
      }
    },
    uploadZhitongche(data) {
      if (data.code === 1) {
        this.ruleForm.zhitongche_img = "http://h5om.knowsea.cn" + data.data;
      } else {
        this.$notify.error({
          title: "上传图片失败"
        });
        this.goodsImgList = [];
      }
    },
    dialogClose() {
      this.$emit("dialogClose", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
        //  console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
        if(this.ruleForm.shop_id==''){
            this.$notify({
              title: "请选择商铺",
              type: "error"
            });

            return
        }
        if(this.ruleForm.goods_url==''){
            this.$notify({
              title: "请选择淘宝商品",
              type: "error"
            });
             return
        }
        if(this.ruleForm.goods_name==''){
            this.$notify({
              title: "请输入商品名称",
              type: "error"
            });
             return
        }
        if(this.ruleForm.unless_img==''){
            this.$notify({
              title: "请上传无线图片",
              type: "error"
            });
             return
        }
        if(this.ruleForm.tianmao_img==''){
            this.$notify({
              title: "请上传天猫图片",
              type: "error"
            });
             return
        }
        if(this.ruleForm.zhitongche_img==''){
            this.$notify({
              title: "请上传直通车图片",
              type: "error"
            });
             return
        }
      this.$ajax
        .get("goods/add", {
          params: {
            token: this.$getToken(),
            shopid: this.ruleForm.shop_id,
            url: this.ruleForm.goods_url,
            title: this.ruleForm.goods_name,
            img: this.ruleForm.goods_img,
            mobile_img: this.ruleForm.unless_img,
            abbreviation: this.ruleForm.simple_name,
            kg: this.ruleForm.goods_weight,
            class_name: this.ruleForm.goods_cate,
            tmall_img: this.ruleForm.tianmao_img,
            through_train_img: this.ruleForm.zhitongche_img,
            tb_goodsid:this.ruleForm.tb_goodsid,
            
          }
        })
        .then(res => {
          if (res && res.data && res.data.code === 1) {
            this.$emit("submitSuccess");
            this.$notify({
              title: "提交成功",
              type: "success"
            });
            this.ruleForm = {
              shop_id: "",
              goods_url: "",
              goods_name: "",
              goods_img: "",
              unless_img: "",
              simple_name: "",
              goods_weight: "",
              goods_cate: "",
              tianmao_img: "",
              zhitongche_img: ""
            };
            this.dialogShow = false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取省
    getProvince() {
      let all = this.allList;
      let proList = [];
      all.forEach(item => {
        proList.push(item.name);
      });
      this.provinceList = proList;
    },
    // 获取市
    getCity(newValue) {
      let list = this.provinceList;
      let city = [];
      for (let i in list) {
        if (list[i] === newValue) {
          city = this.allList[i].city;
          this.saveList = this.allList[i];
        }
      }
      let cList = [];
      city.forEach(item => {
        cList.push(item.name);
      });
      this.cityList = cList;
    },
    // 获取区
    getDis(newValue) {
      let list = this.saveList.city;
      let dis = [];
      for (let i in list) {
        if (list[i].name === newValue) {
         // console.log(list[i].name);
          dis = list[i].area;
        }
      }
      this.disList = dis;
    }
  }
};
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
