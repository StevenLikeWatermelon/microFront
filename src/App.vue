<template>
  <xl-container>
  <xl-header>Header</xl-header>
  <xl-container>
    <xl-aside>
      <xl-menu :default-openeds="['1', '3']">
      <xl-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <xl-menu-item-group>
          <template slot="title">分组一</template>
          <xl-menu-item index="1-1" @click.native="openFrame('https://www.baidu.com/', 'name1')">about</xl-menu-item>
          <xl-menu-item index="1-2" @click="openFrame('https://2032.chinahby.com/Main/EP_CompanyDeviceStatistics_Org.aspx?turn=1&token=6551787647762432', 'name2')">vue项目</xl-menu-item>
        </xl-menu-item-group>
        <xl-menu-item-group title="分组2">
          <xl-menu-item index="1-3">选项3</xl-menu-item>
        </xl-menu-item-group>
        <xl-submenu index="1-4">
          <template slot="title">选项4</template>
          <xl-menu-item index="1-4-1">选项4-1</xl-menu-item>
        </xl-submenu>
      </xl-submenu>
      <xl-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <xl-menu-item-group>
          <template slot="title">分组一</template>
          <xl-menu-item index="2-1">选项1</xl-menu-item>
          <xl-menu-item index="2-2">选项2</xl-menu-item>
        </xl-menu-item-group>
        <xl-menu-item-group title="分组2">
          <xl-menu-item index="2-3">选项3</xl-menu-item>
        </xl-menu-item-group>
        <xl-submenu index="2-4">
          <template slot="title">选项4</template>
          <xl-menu-item index="2-4-1">选项4-1</xl-menu-item>
        </xl-submenu>
      </xl-submenu>
      <xl-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <xl-menu-item-group>
          <template slot="title">分组一</template>
          <xl-menu-item index="3-1">选项1</xl-menu-item>
          <xl-menu-item index="3-2">选项2</xl-menu-item>
        </xl-menu-item-group>
        <xl-menu-item-group title="分组2">
          <xl-menu-item index="3-3">选项3</xl-menu-item>
        </xl-menu-item-group>
        <xl-submenu index="3-4">
          <template slot="title">选项4</template>
          <xl-menu-item index="3-4-1">选项4-1</xl-menu-item>
        </xl-submenu>
      </xl-submenu>
    </xl-menu>
    </xl-aside>
    <xl-main>
      <router-view />
    </xl-main>
  </xl-container>
</xl-container>

</template>

<script>
export default {
  methods: {
    gotoInnerAbout () {
      this.$router.push('about')
    },
    openFrame (url, name) {
      this.$tabs.openIframe(url, name, 'icon-web')
    }
  },
  created () {
    window.addEventListener('message', function (e) {
      console.log(e)
    })
  }
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
