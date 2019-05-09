<template>
  <div class="settingDialogCom">
    <el-dialog title="修改商品" :visible.sync="dialogShow" @close="dialogClose" width="60%" style="margin-top:20px;">
      <div class="horizontal-rule">
        <span>商品基本信息</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="掌柜号：" prop="shopid">
          <el-select v-model="ruleForm.shopid" placeholder="请选择掌柜号" style="width:100%" :disabled="checkDetail">
            <el-option :label="item.shop_name" v-for="(item,index) in passdata" :key="index" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品链接：" prop="url">
          <el-input v-model="ruleForm.url" style="width:calc(100% - 110px) " placeholder="请在输入商品链接后点击获取详情按钮" :disabled="checkDetail"></el-input>
          <el-button type="primary" @click="openGoodsDetail" size="mini" style="height:35px;" :disabled="checkDetail">获取商品详情</el-button>
        </el-form-item>
        <el-form-item label="商品名称：" prop="title">
          <el-input v-model="ruleForm.title" :disabled="checkDetail"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="img">
          <img style="width200px;height:200px" :src="ruleForm.img" alt srcset>
        </el-form-item>
        <el-form-item label="无线端商品主图：" prop="mobile_img">
          <!-- <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadUnless"
            :file-list="unlessList" list-type="picture" :on-remove="removePic">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传无线端商品主图的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadUnless"
          >
            <img v-if="ruleForm.mobile_img" :src="ruleForm.mobile_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <div class="horizontal-rule">
          <span>商品自定义信息</span>
        </div>
        <el-form-item label="商品简称：" prop="abbreviation">
          <el-input v-model="ruleForm.abbreviation" placeholder="请输入2-10位中文、数字、英文，简称可以帮助你快速识别商品" :disabled="checkDetail"></el-input>
        </el-form-item>
        <el-form-item label="商品重量：" prop="kg">
          <el-input v-model="ruleForm.kg" placeholder="请输入单件商品的重量(KG)" :disabled="checkDetail"></el-input>
          <p class="tip red">温馨提醒：物品重量会显示在物流公司内网中，可在0.5KG至40.00KG之间自行设定</p>
        </el-form-item>
        <el-form-item label="商品类别：" prop="class_name">
          <el-input type="textarea" v-model="ruleForm.class_name" placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中" :disabled="checkDetail"></el-input>
        </el-form-item>
        <div class="horizontal-rule">
          <span>商品图片信息 ( 选填 )</span>
        </div>
        <el-form-item label="天猫展示图：" prop="tmall_img">
          <!-- <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadTianmao"
            :file-list="tianmaoList" list-type="picture" :on-remove="removePic" :disabled="checkDetail">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传天猫展示的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadTianmao"
          >
            <img v-if="ruleForm.tmall_img" :src="ruleForm.tmall_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="直通车展示图：" prop="through_train_img">
          <!-- <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadZhitongche"
            :file-list="zhitongcheList" list-type="picture" :on-remove="removePic" :disabled="checkDetail">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传直通车展示的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            :show-file-list="false"
            :on-success="uploadZhitongche"
          >
            <img v-if="ruleForm.through_train_img" :src="ruleForm.through_train_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="text-align:center;margin-bottom:50px;" v-if="!checkDetail">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="dialogClose">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
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
      default () {
        return false
      }
    },
    checkDetail: {
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
    checkDetail (val) {
     // console.log('check', val)
    },
    tableRowData (val) {
      //  console.log(val)
      if (val) {
        for (let item in val) {
          if (typeof val[item] !== 'undefined' && val[item] !== null && val[item] !== '') {
            this.ruleForm[item] = val[item]
          } else {
            this.ruleForm[item] = ''
          }
        }
      }
    }
  },
  data () {
    return {
      fileList: [],
      dialogShow: false,
      goodsImgList: [],
      unlessList: [],
      tianmaoList: [],
      zhitongcheList: [],
      rules: {
        type: [{ required: true, message: '请选择店铺类型', trigger: 'blur' }],
        shop_id: [{ required: true, message: '请选择掌柜号', trigger: 'blur' }],
        goods_url: [
          { required: true, message: '请输入商品链接', trigger: 'blur' }
        ],
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        simple_name: [
          { required: true, message: '请输入商品简称', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_cate: [
          { required: true, message: '请输入商品类型', trigger: 'blur' }
        ]
      },
      ruleForm: {
        shopid: '',
        url: '',
        title: '',
        img: '',
        mobile_img: '',
        abbreviation: '',
        kg: '',
        class_name: '',
        tmall_img: '',
        through_train_img: '',
        tb_goodsid:''
      }
    }
  },
  created () {
  },
  methods: {
   openGoodsDetail() {
       if (!this.ruleForm.shop_id) {
        this.$notify.error({
          title: "请选择店铺"
        });
        return;
      }
      if (!this.ruleForm.url) {
        this.$notify.error({
          title: "请输入链接"
        });
        return;
      }
       // console.log(this.ruleForm);
      let id = GetUrlParam(this.ruleForm.url, "id");
      this.ruleForm.tb_goodsid=id
      if (!id) {
        this.$notify.error({
          title: "没有检测到商品id"
        });
        return;
      }
      this.$ajax
        .post("shopmember/getTaobaoGoods", {
          shopid: this.ruleForm.shop_id,
          goodsid: id
        })
        .then(res => {
         // console.log(res);
          if (res.data.code == "1") {
            this.ruleForm.img = res.data.data.picUrl;
            this.ruleForm.title = res.data.data.title;
            // console.log(this.ruleForm.goods_img);
          }
        });
    },
    removePic () { },
    uploadGoods (data) {
      if (data.code === 1) {
        this.ruleForm.img = "http://h5om.knowsea.cn" +data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadUnless (data) {
      if (data.code === 1) {
        this.ruleForm.mobile_img = "http://h5om.knowsea.cn" +data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadTianmao (data) {
      if (data.code === 1) {
        this.ruleForm.tmall_img = "http://h5om.knowsea.cn" +data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadZhitongche (data) {
      if (data.code === 1) {
        this.ruleForm.through_train_img ="http://h5om.knowsea.cn" + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editConfirm()
        } else {
         // console.log('error edit!!')
          return false
        }
      })
    },
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    editConfirm () {
      this.$ajax
        .get('goods/upd', {
          params: {
            token: this.$getToken(),
            ...this.ruleForm
          }
        })
        .then(res => {
          if (res && res.data && res.data.code === 1) {
            this.$emit('submitSuccess')
            this.$notify({
              title: '成功修改商品',
              type: 'success'
            })
            this.dialogShow = false
            this.$emit('editConfirm', this.ruleForm)
          }
        })
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
