<template>
  <xl-container>
    <xl-header>Header</xl-header>
    <xl-container>
      <xl-aside>
        <xl-menu :default-active="currentIndex">
          <recursion-menu :menuList="menuListWithPre"></recursion-menu>
        </xl-menu>
      </xl-aside>
      <xl-main>
        <router-tab />
      </xl-main>
    </xl-container>
  </xl-container>
</template>

<script>
import { mapGetters } from 'vuex'
import recursionMenu from '@/components/recursionMenu/index'
export default {
  methods: {
    gotoInnerAbout () {
      this.$router.push('about')
    },
    openFrame (url, name) {
      this.$tabs.openIframe(url, name, 'icon-web')
    }
  },
  components: {
    recursionMenu
  },
  computed: {
    ...mapGetters([
      'firstIframeId',
      'menuListWithPre'
    ])
  },
  data () {
    return {}
  },
  created () {
    window.addEventListener('message', function (e) {
      console.log(e)
    })
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
