<template>
  <div class="header-content">
    <div class="title">
      <span>江苏省生态环境厅污染治理设施用电状况监管云平台</span>
    </div>
    <div class="other">
      <xl-dropdown trigger="click">
        <div class="avatar-wrapper">
          <div class="avatar-img">
              <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          </div>
          <div class="avatar-name">
              <span>{{name}}</span>
          </div>
        </div>
        <xl-dropdown-menu slot="dropdown">
          <xl-dropdown-item @click.native="logout">
            <span>退出</span>
          </xl-dropdown-item>
        </xl-dropdown-menu>
      </xl-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    avatar () {
      return this.$store.getters.avatar
    },
    name () {
      return this.$store.getters.name
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.header-content {
    .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .avatar-img {
            display: block;
            width: 40px;
            height: 40px;
            img {
                display: block;
                height: 100%;
                width: 100%;
            }
        }
        .avatar-name {
            padding-left: 5px;
            font-size: 16px;
            color: #ffffff;

        }
    }

}
</style>
<style lang="scss" scoped>
.header-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
  }
  .other {
      display: flex;
      align-items: center;
      position: relative;
  }
}

</style>
