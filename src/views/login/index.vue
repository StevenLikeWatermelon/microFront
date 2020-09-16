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
import { XlLoginView } from 'xl-views'
import { mapGetters } from 'vuex'
import { pushPath } from '@/assets/js/utils'
import store from '@/store'
export default {
  components: {
    loginView: XlLoginView
  },
  data () {
    return {
      loginLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'homePageConfig'
    ]),
    historyPath () {
      // 有的需要记住上一次跳转过来的路由
      return this.$route.query.redirect
    }
  },
  methods: {
    validateName (value) {
      return value.length > 4
    },
    validatePassword (value) {
      return value.length > 5
    },
    async successHandle (loginForm) {
      this.loginLoading = true
      try {
        // 先登录
        await this.$store.dispatch('user/login', loginForm)
        // 再获取用户信息、菜单、syscode 确保有第一个子项目路由，
        await this.$store.dispatch('getAllUserInfo')
        // 最后跳转
        this.loginLoading = false
        // 有历史参数就跳转历史路由 没有就跳转默认路由
        if (this.historyPath) {
          // 这里带来的token还是旧的 要手动更新下
          const allquery = this.historyPath.split('%26')
          const tokenQueryArr = allquery.filter(item => item.includes('token%3D'))
          const tokenQuery = tokenQueryArr[0] || ''
          const oldToken = tokenQuery.split('%3D')[1] || ''
          const pathWithNewToken = this.historyPath.replace(oldToken, store.getters.token)
          // 开始跳转
          this.$router.push(decodeURI(pathWithNewToken))
        } else {
          // 三个参数分别为：链接、页签标题、图标
          pushPath(this.homePageConfig)
        }
      } catch (error) {
        this.loginLoading = false
      }
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
