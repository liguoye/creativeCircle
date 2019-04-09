<template>
  <div class="settingDialogCom">
    <el-dialog title="编辑发货人信息" :visible.sync="dialogShow" @close="dialogClose" width="50%">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <p>掌柜号：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="passdata.shop_name" :placeholder="passdata.shop_name" diisabled></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货人：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="name" placeholder></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货人手机号：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="others.value" placeholder></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p class="must">发货省市区：</p>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="8" style="padding-right:5px;">
                <el-select style="width:100%" v-model="province" placeholder="请选择省份">
                  <el-option v-for="item in provinceList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" style="padding-right:5px;">
                <el-select style="width:100%" v-model="city" placeholder="请选择市区">
                  <el-option v-for="item in cityList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select style="width:100%" v-model="area" placeholder="请选择地区">
                  <el-option v-for="item in disList" :key="item" :label="item" :value="item"></el-option>
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
            <el-input type="textarea" v-model="address"></el-input>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:30px;">温馨提示：发货人信息会显示在快递单上，所以请如实填写</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import json from "../../../../utils/province";
import { setTimeout } from 'timers';
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    passdata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    dialogTableVisible(val) {
      this.dialogShow = val;
      this.start=true
    },
    passdata(newData) {
      this.name = newData.name;
      this.others.value = newData.phone;
      this.address = newData.address;
      this.province = newData.province;
      this.city = newData.city;
      this.area = newData.area;
    },
    province(newValue, oldValue) {
      this.getCity(newValue);
      if (!this.start) {
        this.city = "";
        this.area = "";
      }
    },
    city(newValue, oldValue) {
      this.getDis(newValue);
      if (!this.start) {
        this.area = "";
      }
    }
  },
  data() {
    return {
      allList: [],
      sortOrder: {
        check: true,
        value: "",
        options: [
          { label: "综合", value: "综合" },
          { label: "销量", value: "销量" },
          { label: "价格从低到高", value: "价格从低到高" },
          { label: "价格从高到低", value: "价格从高到低" }
        ]
      },
      name: "",
      others: {
        check: true,
        value: this.passdata.phone
      },
      dialogShow: false,
      address: "",
      province: "",
      city: "",
      area: "",
      allList: [],
      saveList: [],
      provinceList: [],
      cityList: [],
      disList: [],
      start: true
    };
  },
  mounted() {
    this.allList = json;
    this.getProvince();
    setTimeout(()=>{
        this.start=false
    },1000)
  },
  methods: {
      submit(){
          this.$ajax.get('shop/upd',{params:{
              shopid:this.shopid,
              name:this.name,
              phone:this.others,
              province:this.province,
              city:this.city,
              area:this.area,
              address:this.address,
          }}).then(res=>{
              console.log(res)
          })
      },
    dialogClose() {
      this.$emit("dialogClose", false);
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
        //   console.log(list[i].name);
          dis = list[i].area;
        }
      }
      this.disList = dis;
    }
  }
};
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
