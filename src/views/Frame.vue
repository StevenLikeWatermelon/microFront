<template>
  <xl-container>
    <xl-header>
      <header-content></header-content>
    </xl-header>
    <xl-container>
      <xl-aside :width="toggleWidth">
        <xl-menu :default-active="currentIndex" :collapse="isCollapse" :collapse-transition="false">
          <recursion-menu :menuList="menuListWithPre"></recursion-menu>
        </xl-menu>
      </xl-aside>
      <xl-main
        v-loading="loading"
        element-loading-text="子系统加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <router-tab @iframe-mounted="iframeMounted" @iframe-loaded="iframeLoaded" :class="{'is-fullscreen': isFullScreen}">
          <!-- 页签开始 -->
          <template #start>
            <div class="toggle-icon" v-if="!isFullScreen" @click="toggleMenu">
              <div class="icon">
                <i v-show="!isCollapse" class="el-icon-s-fold"></i>
                <i v-show="isCollapse" class="el-icon-s-unfold"></i>
              </div>
            </div>
          </template>

          <!-- 页签结束 -->
          <template #end>
            <div class="toggle-icon" @click="toggleScreen">
              <div class="icon">
                <svg-icon :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'"/>
              </div>
            </div>
          </template>
        </router-tab>
      </xl-main>
    </xl-container>
  </xl-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventTypes } from 'xl-utils'
import recursionMenu from '@/components/recursionMenu/index'
import headerContent from '@/components/headerContent/index'
import { showTokenExpireBox } from '@/assets/js/utils'
export default {
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    toggleScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    // iframe 节点挂载就绪
    iframeMounted (url, iframe) {
      this.loading = true
    },

    // iframe 内容加载成功
    iframeLoaded () {
      this.loading = false
    },
    handleEvent (e) {
      const eventType = e?.data?.sysCode
      // 只处理子系统发过来的有eventsType的事件
      if (eventType) {
        switch (eventType) {
          case eventTypes.timeOut:
            showTokenExpireBox()
            break
          case eventTypes.newTab:

            break

          default:
            break
        }
      }
    }
  },
  components: {
    recursionMenu,
    headerContent
  },
  computed: {
    ...mapGetters(['firstIframeId', 'menuListWithPre']),
    toggleWidth () {
      return this.isCollapse ? '65px' : '230px'
    }
  },
  data () {
    return {
      loading: false,
      isFullScreen: false,
      isCollapse: false
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleEvent)
  },
  mounted () {
    window.addEventListener('message', this.handleEvent)
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query || {}
        this.currentIndex = query.id || this.firstIframeId
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.el-header {
  background-color: #2f8ef1;
  color: #333;
  line-height: 60px;
}

.el-menu--collapse > div > .el-menu-item > span,  .el-menu--collapse > div > .el-submenu > .el-submenu__title > span, .el-menu--collapse > div > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow{
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-aside {
    transition: width 0.28s;
    border-right: solid 1px #e6e6e6;
}
.el-menu {
  border-right: none;
}
.router-tab.is-fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #fff;
}
.el-main {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.toggle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30px;
  font-size: 19px;
}
</style>
