<template>
  <div :class="{ 'has-logo': showLogo }" style="width: 180px">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar', 'routes']),
    // routes() {
    // this.$router.options.routes 获取所有的路由信息
    // console.log('routes', this.$router.options.routes)
    // return this.$router.options.routes
    // return this.$store.getters.routes
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
a.router-link-exact-active.router-link-active {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#205af0),
    color-stop(25%, #1e3cae),
    to(rgba(30, 60, 174, 0))
  ) !important;
  // background: linear-gradient(
  //   90deg,
  //   #205af0,
  //   #1e3cae 25%,
  //   rgba(30, 60, 174, 0)
  // ) !important;
}
</style>
