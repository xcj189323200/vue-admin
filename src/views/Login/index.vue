<template>
  <el-container class="Login">
    <div class="login-box">
      <div class="login-logo"></div>
      <div class="login-forms">
        <p class="login-title">账号登录</P>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" minlength="4" maxlength="100"></el-input>
          </el-form-item>
          <el-button @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </el-container>
</template>

<script>

export default {
  data() {
    return{
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
            {
                min: 4,
                max: 100,
                message: '长度在 4 到 100 个字符'
            }
        ],
      }
    }
  },
  components: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parms = {
            username: this.ruleForm.name,
            password: this.ruleForm.password
          }
          this.$http.LoginUser(parms).then(res=>{
            if (res && res.id_token) {
						localStorage.setItem('token', 'Bearer ' + res.id_token);
            this.$router.replace({ name: 'home' })
					}

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created(){
  }
}
</script>
<style scoped>
.el-main {
  height: 100%;
}
.el-form-item{
  height: 80px;
  position: relative;
}
.el-form-item__label{
  height: 80px !important;
}
.el-button{
  background: linear-gradient(135deg, rgba(62,170,245,1), rgba(127,222,250,1));
  border:none;
  color:#fff;
  font-size: 18px;
  width: 30%;
  height: 50px;
  border-radius: 50px;
  position: relative;
  left: 50%;
  margin-left: -15%;
}
.el-input{
  width: 80%;
}
.el-form-item__error{
  left: 80% !important;
}
.Login{
  background: linear-gradient(45deg, rgba(62,170,245,1) 20%, rgba(127,222,250,1));
  /*min-height: 1000px;*/
  min-width: 1100px;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
}
.login-box{
  background: rgba(255, 255, 255,1);
  border-radius: 20px;
  width:1100px;
  height:600px;
  position:absolute;
  left: 50%;
  top: 50%;
transform: translate(-50%,-50%);
  z-index:2;
  box-shadow:0 0 15px #2781c8;
  overflow:hidden;
}
.login-forms,.login-logo{
  width:50%;
}
.login-logo{
  background:url("https://dj001.oss-cn-beijing.aliyuncs.com/yunchao/login-logo-bg.png") no-repeat center center;
  background-size: cover;
  float:left;
  position:relative;
  height: 100%;
}
.login-logo:before{
  content:"";
  position:absolute;
  top:0;left:30%;
  height:100%;
  width:40%;
  background:url('../../assets/images/login-logo.png')no-repeat center center;
  background-size: contain;
}
.login-forms{
  float: right;
}
.login-title{
  font-size:27px;
  color:#3ea9f7;
  text-align:center;
  margin-top:80px;
  margin-bottom: 80px;
}


</style>

