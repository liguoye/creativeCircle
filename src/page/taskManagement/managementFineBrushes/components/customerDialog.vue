<template>
  <div class="settingDialogCom">
    <el-dialog title="创建客服介入工单" :visible.sync="dialogShow" @close="dialogClose" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-bottom:20px;">
        <el-form-item label="任务编号" prop="id">
          <el-input v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="工单类型" prop="username">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option label="精刷" value="1"></el-option>
            <el-option label="流量" value="2"></el-option>
            <el-option label="评价" value="3"></el-option>
            <el-option label="问问" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题分类" prop="work_type">
          <el-select v-model="ruleForm.work_type" placeholder="请选择">
            <el-option label="其他导致卖家损失行为" value="1"></el-option>
            <el-option label="退款" value="2"></el-option>
            <el-option label="好评问题" value="3"></el-option>
            <el-option label="任务过程出错" value="4"></el-option>
          </el-select>
        </el-form-item>
        <div style="padding-left:25px;margin-bottom:10px;">
          <label class="el-form-item__label">友情提醒：</label>
          <div class="el-form-item__content">
            <span>请点击【工单处理标准】查看。</span>
          </div>
          <p>
            <span class="red">温馨提示：</span>可上传1~5张图片，图片的大小请控制在3M以内。</p>
        </div>
        <el-form-item label="图片凭证1" prop="img1">
          <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="uploadImg1">
            <img v-if="ruleForm.img1" :src="ruleForm.img1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片凭证2" prop="img1">
          <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="uploadImg2">
            <img v-if="ruleForm.img2" :src="ruleForm.img2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片凭证3" prop="img1">
          <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="uploadImg3">
            <img v-if="ruleForm.img3" :src="ruleForm.img3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片凭证4" prop="img1">
          <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="uploadImg4">
            <img v-if="ruleForm.img4" :src="ruleForm.img4" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片凭证5" prop="img1">
          <el-upload class="avatar-uploader" action="http://h5om.knowsea.cn/shop/Upload/uploadFile" :show-file-list="false" :on-success="uploadImg5">
            <img v-if="ruleForm.img5" :src="ruleForm.img5" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="任务编号" prop="shop_name">
          <el-input v-model="ruleForm.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          <el-button @click="dialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default () {
        return true
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogShow = val
    },
    data (val) {
      this.ruleForm['id'] = val['id']
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
        type: '',
        work_type: '',
        id: '',
        remark: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: ''
      },
      rules: {
        type: [{ required: true, message: '请选择工单类型', trigger: 'blur' }],
        work_type: [{ required: true, message: '请选择问题分类', trigger: 'blur' }],
        remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
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
        return
      }
      this.$ajax
        .get('shopmember/workorders', {
          params: {
            token: this.$getToken(),
            orderid: this.ruleForm.id,
            type: this.ruleForm.type,
            work_type: this.ruleForm.work_type,
            remark: this.ruleForm.remark,
            img: this.ruleForm.img1 + ',' + this.ruleForm.img2 + ',' + this.ruleForm.img3 + ',' + this.ruleForm.img4 + ',' + this.ruleForm.img5
          }
        })
        .then(res => {
          if (res && res.data && res.data.code === 1) {
            this.$notify({
              title: '提交成功',
              type: 'success'
            })
            this.$refs['ruleForm'].resetFields()
            this.$emit('dialogClose', false)
          }
        })
    },
    uploadImg1 (data) {
      if (data.code === 1) {
        this.ruleForm.img1 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadImg2 (data) {
      if (data.code === 1) {
        this.ruleForm.img2 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadImg3 (data) {
      if (data.code === 1) {
        this.ruleForm.img3 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadImg4 (data) {
      if (data.code === 1) {
        this.ruleForm.img4 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    uploadImg5 (data) {
      if (data.code === 1) {
        this.ruleForm.img5 = 'http://h5om.knowsea.cn' + data.data
      } else {
        this.$notify.error({
          title: '上传图片失败'
        })
        this.goodsImgList = []
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
