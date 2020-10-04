<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <div class="login-header">Welcome</div>
        <!-- <img src="../assets/logo.png" alt=""> -->
        <img src="https://img.icons8.com/bubbles/452/user.png" alt="">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="handleFormLogin">Login</el-button>
        </el-form-item>
        <el-divider></el-divider>
        <el-button type="text">Forgot Password</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
        username: 'jyadmin',
        password: '12345678'
      },
      loginRules: {
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          { min: 4, max: 12, message: 'Length must be 3 to 6 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 8, max: 24, message: 'Password length invalid', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleFormLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid) return;
        // .then來獲取post請求的回傳
        await axios.post('http://localhost:3000/api/auth-user', this.loginForm)
        .then(res => {
          if(res.data.meta.status !== 200) return this.$message.error('Login failed')
          this.$message.success('Login success')
          sessionStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        })
        // 把使用await和async來獲得回傳
        // const { data: res } = await axios.post('http://localhost:3000/api/auth-user', this.loginForm);
      })
    }
  }  
}
</script>

<style scoped>
.login-container {
  height: 100%;
  background-color: #56baed;
}
.login-box {
  height: 600px;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
}
.avatar-box {
  height: 250px;
  width: 250px;
  margin: 40px auto;
}
.avatar-box img {
  width: 100%;
  height: 100%;
}
.login-header {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #84cfd1;
}
.login-form {
  height: 250px;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}
.el-button {
  width: 100%;
}
/* .btn {
  display: flex;
  justify-content: flex-end;
} */
/* .login-header {
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  color: #ffffff;
  font-size: 50px;
  background-color: #007bff;
} */
</style>