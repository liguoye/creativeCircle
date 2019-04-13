<template>
  <div class="settingDialogCom">
    <el-dialog title="添加商品" :visible.sync="dialogShow" @close="dialogClose" width="60%" style="margin-top:20px;">
      <div class="horizontal-rule">
        <span>商品基本信息</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="掌柜号：" prop="shop_id">
          <el-select v-model="ruleForm.shop_id" placeholder="请选择掌柜号" style="width:100%">
            <el-option :label="item.shop_name" v-for="(item,index) in passdata" :key="index" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品链接：" prop="goods_url">
          <el-input v-model="ruleForm.goods_url" style="width:calc(100% - 110px) " placeholder="请在输入商品链接后点击获取详情按钮"></el-input>
          <el-button type="primary" @click="openGoodsDetail" size="mini" style="height:35px;">获取商品详情</el-button>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goods_name">
          <el-input v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="goods_img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadGoods"
            :file-list="goodsImgList" list-type="picture" :on-remove="removePic">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传商品主图的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="无线端商品主图：" prop="unless_img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadUnless"
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
          <el-input type="textarea" v-model="ruleForm.goods_cate" placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中"></el-input>
        </el-form-item>
        <div class="horizontal-rule">
          <span>商品图片信息 ( 选填 )</span>
        </div>
        <el-form-item label="天猫展示图：" prop="tianmao_img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadTianmao"
            :file-list="tianmaoList" list-type="picture" :on-remove="removePic">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传天猫展示的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="直通车展示图：" prop="zhitongche_img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile" multiple :on-success="uploadZhitongche"
            :file-list="zhitongcheList" list-type="picture" :on-remove="removePic">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              请上传直通车展示的图片
              <a href="http://www.baidu.com">aaaa</a>
            </div>
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
import json from '../../../../utils/province'
export default {
  props: {
    dialogTableVisible: {
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
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.dialogShow = val
    },
    'ruleForm.province' (newValue, oldValue) {
      this.getCity(newValue)
      this.ruleForm.city = ''
      this.ruleForm.area = ''
    },
    'ruleForm.city' (newValue, oldValue) {
      this.getDis(newValue)
      this.ruleForm.area = ''
    }
  },
  data () {
    return {
      fileList: [],
      dialogShow: false,
      ruleForm: {
        shop_id: '1111',
        goods_url: '',
        goods_name: '',
        shop_name: '',
        goods_img: '',
        unless_img: '',
        simple_name: '',
        goods_weight: '',
        goods_cate: '',
        tianmao_img: '',
        zhitongche_img: ''
      },
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
        goods_img: [
          { required: true, message: '请上传商品主图', trigger: 'blur' }
        ],
        unless_img: [
          { required: true, message: '无线端商品主图', trigger: 'blur' }
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
      }
    }
  },
  created () {
    this.allList = json
    this.getProvince()
  },
  methods: {
    openGoodsDetail () {
      if (!this.ruleForm.goods_url) {
        this.$notify.error({
          title: '请输入链接'
        })
        return
      }
      window.open(this.ruleForm.goods_url)
    },
    removePic () { },
    uploadGoods (data) {
      console.log('uploadGoods', data)
      if (data.code === 1) {
        this.ruleForm.goods_img = data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadUnless (data) {
      console.log('uploadUnless', data)
    },
    uploadTianmao (data) {
      console.log('uploadTianmao', data)
    },
    uploadZhitongche (data) {
      console.log('uploadZhitongche', data)
    },
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    submitForm (formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit () {
      //   if (this.ruleForm.img === "") {
      //     this.$notify.error({
      //       title: "请上传图片"
      //     });
      //     return "";
      //   }
      this.$ajax
        .get('goods/add', {
          params: {
            token: this.$getToken(),
            shopid: this.ruleForm.type,
            username: this.ruleForm.username,
            url: this.ruleForm.shop_name,
            title: this.ruleForm.nature,
            name: this.ruleForm.name,
            img: this.ruleForm.goods_img,
            mobile_img: this.ruleForm.unless_img,
            abbreviation: this.ruleForm.city,
            kg: this.ruleForm.area,
            class_name: this.ruleForm.address,
            tmall_img: this.ruleForm.tianmao_img,
            through_train_img: this.ruleForm.zhitongche_img
          }
        })
        .then(res => {
          if (res && res.data && res.data.code === 1) {
            this.$notify({
              title: '提交成功',
              type: 'success'
            })
            this.ruleForm = {
              type: '1',
              username: '',
              shop_name: '',
              nature: '1',
              name: '',
              phone: '',
              province: '',
              city: '',
              area: '',
              address: '',
              img: ''
            }
            this.dialogShow = false
          }
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 获取省
    getProvince () {
      let all = this.allList
      let proList = []
      all.forEach(item => {
        proList.push(item.name)
      })
      this.provinceList = proList
    },
    // 获取市
    getCity (newValue) {
      let list = this.provinceList
      let city = []
      for (let i in list) {
        if (list[i] === newValue) {
          city = this.allList[i].city
          this.saveList = this.allList[i]
        }
      }
      let cList = []
      city.forEach(item => {
        cList.push(item.name)
      })
      this.cityList = cList
    },
    // 获取区
    getDis (newValue) {
      let list = this.saveList.city
      let dis = []
      for (let i in list) {
        if (list[i].name === newValue) {
          console.log(list[i].name)
          dis = list[i].area
        }
      }
      this.disList = dis
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
