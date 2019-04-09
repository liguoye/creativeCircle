<template>

  <div class="settingDialogCom">
    <el-dialog title="添加商品" :visible.sync="dialogShow" @close="dialogClose" width="70%" style="margin-top:20px;">
      <div class="horizontal-rule"><span>商品基本信息</span></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="掌柜号：" prop="username">
          <el-select v-model="ruleForm.username" placeholder="请选择掌柜号" style="width:100%">
            <!-- <el-option label="个人" value="1"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="商品链接：" prop="shop_name">
          <el-input v-model="ruleForm.shop_name" style="width:calc(100% - 150px) " placeholder="请在输入商品链接后点击获取详情按钮"></el-input>
          <el-button type="primary" size="mini" style="height:35px;">获取商品详情</el-button>
        </el-form-item>
        <el-form-item label="商品名称：" prop="shop_name">
          <el-input v-model="ruleForm.shop_name"></el-input>
        </el-form-item>

        <el-form-item label="商品主图：" prop="img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            multiple :on-success="upload" :file-list="fileList" list-type="picture" :on-remove="removePic">
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
        <el-form-item label="无线端商品主图：" prop="img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            multiple :on-success="upload" :file-list="fileList" list-type="picture" :on-remove="removePic">
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
        <div class="horizontal-rule"><span>商品自定义信息</span></div>
        <el-form-item label="商品简称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入2-10位中文、数字、英文，简称可以帮助你快速识别商品"></el-input>
        </el-form-item>
        <el-form-item label="商品重量：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入单件商品的重量(KG)"></el-input>
          <p class="tip red">温馨提醒：物品重量会显示在物流公司内网中，可在0.5KG至40.00KG之间自行设定</p>
        </el-form-item>
        <el-form-item label="商品类别：" prop="address">
          <el-input type="textarea" v-model="ruleForm.address" placeholder="请输入商品中文类别名称，此信息会展示在物流公司内网中"></el-input>
        </el-form-item>
        <div class="horizontal-rule"><span>商品图片信息 ( 选填 )</span></div>
        <el-form-item label="天猫展示图：" prop="img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            multiple :on-success="upload" :file-list="fileList" list-type="picture" :on-remove="removePic">
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
        <el-form-item label="直通车展示图：" prop="img">
          <el-upload class="upload-demo" :limit="1" drag action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
            multiple :on-success="upload" :file-list="fileList" list-type="picture" :on-remove="removePic">
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
      allList: [],
      saveList: [],
      provinceList: [],
      cityList: [],
      disList: [],
      dialogShow: false,
      ruleForm: {
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
      },
      rules: {
        type: [{ required: true, message: '请选择店铺类型', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入掌柜号', trigger: 'blur' }
        ],
        shop_name: [
          {
            required: true,
            message: '请输入店铺名',
            trigger: 'blur'
          }
        ],
        nature: [
          {
            required: true,
            message: '请输店铺性质',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入发货人',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入发货人手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入手机号码', trigger: 'blur' }
        ],
        province: [
          {
            required: true,
            message: '请选择省',
            trigger: 'blur'
          }
        ],
        city: [
          {
            required: true,
            message: '请选择市',
            trigger: 'blur'
          }
        ],
        area: [{ required: true, message: '请选择区', trigger: 'blur' }],
        address: [
          {
            required: true,
            message: '请填写详细地址',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.allList = json
    this.getProvince()
  },
  methods: {
    removePic () { },
    upload (data) {
      console.log(data)
      if (data.code === 1) {
        this.ruleForm.img = data.data
        this.fileList.push({
          name: 'aaa',
          url: data.data
        })
      }
    },
    dialogClose () {
      this.$emit('dialogClose', false)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit () {
      if (this.ruleForm.img === '') {
        this.$notify.error({
          title: '请上传图片'
        })
        return ''
      }
      this.$ajax
        .get('shop/add', {
          params: {
            token: this.$getToken(),
            type: this.ruleForm.type,
            username: this.ruleForm.username,
            shop_name: this.ruleForm.shop_name,
            nature: this.ruleForm.nature,
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            province: this.ruleForm.province,
            city: this.ruleForm.city,
            area: this.ruleForm.area,
            address: this.ruleForm.address,
            img: this.ruleForm.img
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
        if (list[i].name == newValue) {
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
