<template>
  <div class="login-container">
    <div class="content-top">
      <div class="container-password">
        <div class="relative-container">
          <slot name="header">
            <h3 class="title">{{title}}</h3>
          </slot>
        </div>
        <div class="relative-container">
          <slot name="password">
            <xl-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              label-position="left"
            >
              <xl-form-item prop="username">
                <span class="svg-container">
                  <xl-icon type="user" />
                </span>
                <xl-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </xl-form-item>

              <xl-tooltip v-model="capsTooltip" content="大写已打开" placement="right" manual>
                <xl-form-item prop="password">
                  <span class="svg-container">
                    <xl-icon type="md-lock" />
                  </span>
                  <xl-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <xl-icon v-if="passwordType === 'password'" type="md-eye" />
                    <xl-icon v-else type="md-eye-off" />
                  </span>
                </xl-form-item>
              </xl-tooltip>

              <xl-button
                :loading="loading"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
              >登录</xl-button>
            </xl-form>
          </slot>
        </div>
        <div class="relative-container">
          <slot name="discribe"></slot>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="relative-container">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    title: {
      type: String,
      default: '系统名称'
    },
    validUsername: {
      type: Function,
      default (value) {
        // 默认只有非空校验
        return !!value
      }
    },
    validPassword: {
      type: Function,
      default (value) {
        // 默认只有非空校验
        return !!value
      }
    },
    usernameErrorTip: {
      type: String,
      default: '用户名校验不通过'
    },
    loading: {
      type: Boolean,
      default: false
    },
    passwordErrorTip: {
      type: String,
      default: '密码校验不通过'
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      capsTooltip: false
    }
  },
  computed: {
    loginRules () {
      return {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!this.validUsername(value)) {
                callback(new Error(this.usernameErrorTip))
              } else {
                callback()
              }
            }
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!this.validPassword(value)) {
                callback(new Error(this.passwordErrorTip))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created () {},
  mounted () {
    //   自动聚焦
    if (this.loginForm.username === '') {
      this.$refs.username && this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password && this.$refs.password.focus()
    }
  },
  destroyed () {},
  methods: {
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$emit('validate-success', { ...this.loginForm })
        } else {
          this.$emit('validate-fail', { ...this.loginForm })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@charset "UTF-8";
/* 修复input 背景不协调 和光标变色 */
@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}

/* reset element-ui css */
.login-container .el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}

.login-container .el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #fff;
  height: 47px;
  caret-color: #fff;
}

.login-container .el-input input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #283443 inset !important;
  -webkit-text-fill-color: #fff !important;
}

.login-container .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background: url(https://tiansuiziswjimg.oss-cn-beijing.aliyuncs.com/back.jpg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.login-container .login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
}

.login-container .tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}

.login-container .tips span:first-of-type {
  margin-right: 16px;
}

.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.login-container .content-top {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
}

.login-container .container-password {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
background-color: #2d3a4b;
border-radius: 10px;
}

.login-container .content-bottom {
  min-height: 40px;
  overflow: hidden;
  width: 100%;
}

.login-container .relative-container {
  position: relative;
}

.login-container .relative-container .title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 30px auto;
  text-align: center;
  font-weight: bold;
}

.login-container .show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
