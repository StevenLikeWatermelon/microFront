<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.el-main {
    height: calc(100vh - 60px);
    position: relative;
}
.router-tab {
  height: 100%;
}
</style>
