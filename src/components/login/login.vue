<template>
  <div class="login-container">
    <div class="bg"></div>
    <div class="form">
      <h1>欢迎登录</h1>
      <form>
        <div>
          <label>用户名:</label>
          <input placeholder="请输入用户名" v-model="username">
        </div>
        <div>
          <label>密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div>
          <button class="log-btn" @click="Login">登陆</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  methods: {
    Login () {
      if (this.username === '' || this.pwd === '') {
        alert('请输入用户名或密码！')
        return true
      } else {
        localStorage.setItem('lotteryPath', JSON.stringify(['Home']))
        if (localStorage.getItem('userName')) {
          localStorage.setItem('userName', this.username)
        } else {
          localStorage.setItem('userName', this.username)
        }
        this.$router.push({name: 'home'})
      }
    }
  }
}
</script>

<style scoped>
  .login-container{width: 100%;height: 100%;overflow: hidden;position: relative;}
  .login-container .bg{position: relative;width: 100%;height: 100%;background: url('../../../static/img/bg05.jpg') no-repeat;
z-index: 1;background-size: 100% 100%;}
  .login-container .bg:after{content: '';position: absolute;left: 0;top: 0;bottom: 0;right: 0;
background-image: url("../../../static/img/bg05.jpg");z-index: 0;filter: blur(3px);background-size: 100% 100%;}
  .login-container .form{position: absolute;width: 300px;height: 200px;top: 50%;margin-top: -100px;right: 100px;padding: 15px 20px;
    background: rgba(255, 1255, 255, .5);z-index: 10;border-radius: 5px;box-sizing: border-box;}
  .login-container .form h1{font-size: 16px;font-weight: 700;text-align: center;color: #17233d;}
  .login-container .form form{margin-top: 20px;}
  .login-container .form form label{font-size: 14px;color: #515a6e;}
  .login-container .form form input{width: 160px;padding: 5px 8px;margin: 0 0 15px 10px;height: 15px;line-height: 20px;
  outline: none;border-radius: 4px;border: 1px solid transparent;}
  .login-container .form form input:hover{border-color: #57a3f3;}
  .login-container .form form input:focus{box-shadow:0 0 0 2px rgba(45,140,240,.2);}
  .login-container .form form .log-btn{width: 100%;margin: 15px auto 0;height: 30px;line-height: 30px;border-radius: 4px;
  cursor: pointer;outline: none;background: #2d8cf0;color: #fff;border: none;}
</style>
