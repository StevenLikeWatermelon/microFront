<template>
  <div class="recursion-menu">
    <template v-for="list in menuList">
      <xl-submenu
        v-if="list.children && list.children.length>0"
        :key="list.id"
        :index="list.id"
      >
        <template slot="title">
          <i :class="list.icon"></i>
          <span>{{list.resName}}</span>
        </template>
        <recursion-menu :menuList="list.children"></recursion-menu>
      </xl-submenu>
      <xl-menu-item
        v-else
        :key="list.id"
        :index="list.id"
        @click.native="pushPath(list)"
      >
        <i :class="list.icon"></i>
        <span>{{list.resName}}</span>
      </xl-menu-item>
    </template>
  </div>
</template>

<script>
import { pushPath } from '@/assets/js/utils'
export default {
  name: 'recursion-menu',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    pushPath (item) {
      pushPath(item)
    }
  }
}
</script>

<style>
</style>
