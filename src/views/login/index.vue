<template>
  <div class="login-full-screen">
    <login-view
      title="新联新平台登陆"

      :loading="loginLoading"
      :validUsername="validateName"
      :validPassword="validatePassword"
      usernameErrorTip="用户名至少5位"
      passwordErrorTip="密码至少6位"
      @validate-success="successHandle"
      @validate-fail="failHandle"
    >
    <!-- <div slot="header">
      <p style="font-size: 32px;color: rgb(103 210 25);padding-bottom: 20px;">新联新平台登陆2</p>
    </div> -->
    <div slot="discribe" class="discribe">
      <p>这里是预留的一些介绍说明空间</p>
    </div>
    <div slot="footer" class="copy-right">
      <p>©版权所有      南京新联电子股份有限公司    苏ICP备15005556号-3      新联电能云官网    www.xldny.cn</p>
    </div>
    </login-view>
  </div>
</template>

<script>
import loginView from '@/components/loginView/index.vue'
export default {
  components: {
    loginView
  },
  data () {
    return {
      loginLoading: false,
      loginBackUrl: require('./background.png'),
      styleObject: {
        background: `url(${this.loginBackUrl})`
      }
    }
  },
  methods: {
    validateName (value) {
      return value.length > 4
    },
    validatePassword (value) {
      return value.length > 5
    },
    successHandle (loginForm) {
      this.$router.push('/iframe/https%3A%2F%2Fm.hao123.com%2F/Hao123/rt-icon-web')
      console.log(loginForm)
    },
    failHandle (loginForm) {
      console.log(loginForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-full-screen {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.discribe {
  font-size: 18px;
  color: #ffffff;
  padding-top: 20px;
}
.copy-right {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
}
</style>
