<template>
  <el-dialog title="绑定新店铺" :visible.sync="dialogShow" @close="dialogClose" width="50%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">淘宝</el-radio>
          <!-- <el-radio label="2">京东</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="掌柜号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="shop_name">
        <el-input v-model="ruleForm.shop_name"></el-input>
      </el-form-item>
      <el-form-item label="店铺性质" prop="nature">
        <el-select v-model="ruleForm.nature" placeholder="店铺性质">
          <el-option label="个人" value="1"></el-option>
          <el-option label="公司" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="发货城市区" required>
        <el-row>
          <el-col :span="8" style="padding-right:5px;">
            <el-select style="width:100%" v-model="ruleForm.province" placeholder="请选择省份">
              <el-option v-for="item in provinceList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" style="padding-right:5px;">
            <el-select style="width:100%" v-model="ruleForm.city" placeholder="请选择市区">
              <el-option v-for="item in cityList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select style="width:100%" v-model="ruleForm.area" placeholder="请选择地区">
              <el-option v-for="item in disList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="详细地址" prop="address">
        <el-input type="textarea" v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="上传截图" prop="img">
        <el-upload
          class="upload-demo"
          :limit="1"
          drag
          action="http://h5om.knowsea.cn/shop/Upload/uploadFile"
          multiple
          :on-success="upload"
          :file-list="fileList"
          list-type="picture"
          :on-remove="removePic"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            请上传生意参谋的图片
            <a href="http://www.baidu.com">aaaa</a>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import json from "../../../../utils/province";
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default() {
        return true;
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
    "ruleForm.city"(newValue, oldValue) {
      this.getDis(newValue);
      this.ruleForm.area = "";
    }
  },
  data() {
    return {
      fileList: [],
      allList: [],
      saveList: [],
      provinceList: [],
      cityList: [],
      disList: [],
      dialogShow: false,
      ruleForm: {
        type: "1",
        username: "",
        shop_name: "",
        nature: "1",
        name: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        address: "",
        img: ""
      },
      rules: {
        type: [{ required: true, message: "请选择店铺类型", trigger: "blur" }],
        username: [
          { required: true, message: "请输入掌柜号", trigger: "blur" }
        ],
        shop_name: [
          {
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ],
        nature: [
          {
            required: true,
            message: "请输店铺性质",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入发货人",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入发货人手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入手机号码", trigger: "blur" }
        ],
        province: [
          {
            required: true,
            message: "请选择省",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请选择市",
            trigger: "blur"
          }
        ],
        area: [{ required: true, message: "请选择区", trigger: "blur" }],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.allList = json;
    this.getProvince();
  },
  methods: {
    removePic() {},
    upload(data) {
     // console.log(data);
      if (data.code == 1) {
        this.ruleForm.img = data.data;
        this.fileList.push({
          name: "aaa",
          url: data.data
        });
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
      if (this.ruleForm.img == "") {
        this.$notify.error({
          title: "请上传图片"
        });
        return;
      }
      this.$ajax
        .get("shop/add", {
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
          if (res && res.data && res.data.code == 1) {
            this.$notify({
              title: "提交成功",
              type: "success"
            });
            this.ruleForm = {
              type: "1",
              username: "",
              shop_name: "",
              nature: "1",
              name: "",
              phone: "",
              province: "",
              city: "",
              area: "",
              address: "",
              img: ""
            };
            this.dialogShow=false
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
        if (list[i] == newValue) {
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
        if (list[i].name == newValue) {
        //  console.log(list[i].name);
          dis = list[i].area;
        }
      }
      this.disList = dis;
    }
  }
};
</script>