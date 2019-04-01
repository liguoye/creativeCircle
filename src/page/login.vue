<template>
  <div class="home">
    <div class="banner">
      <!-- <img src="../../assets/picture/banner.png" />> -->
      <div class="loginBox">
        <p class="title">用户登录</p>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入注册账户" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="regPass"><a href="">商家会员注册</a> <a href="#/business/forget" class="fr">忘记密码</a></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入注册账户'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$router.push({ name: 'home', param: { tab: 'home' } })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
