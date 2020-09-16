<template>
  <xl-container>
    <xl-header>Header</xl-header>
    <xl-container>
      <xl-aside>
        <xl-menu :default-active="currentIndex">
          <recursion-menu :menuList="menuListWithPre"></recursion-menu>
        </xl-menu>
      </xl-aside>
      <xl-main
        v-loading="loading"
        element-loading-text="子系统加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <router-tab @iframe-mounted="iframeMounted" @iframe-loaded="iframeLoaded" />
      </xl-main>
    </xl-container>
  </xl-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventTypes } from 'xl-utils'
import recursionMenu from '@/components/recursionMenu/index'
import { showTokenExpireBox } from '@/assets/js/utils'
export default {
  methods: {
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
            console.log('newTab')
            break

          default:
            break
        }
      }
    }
  },
  components: {
    recursionMenu
  },
  computed: {
    ...mapGetters(['firstIframeId', 'menuListWithPre'])
  },
  data () {
    return {
      loading: false
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

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
