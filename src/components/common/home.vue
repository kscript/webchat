<template>
  <el-container direction="vertical">
    <v-header></v-header>
    <v-aside></v-aside>
    <el-main>
      <template v-if="$route.meta.keep">
        <keep-alive></keep-alive>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </el-main>
    <v-footer></v-footer>
  </el-container>
</template>
<script>
import header from './header.vue'
import footer from './footer.vue'
import aside from './aside.vue'
// import store from '../../store'
export default {
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-aside': aside,
    'v-footer': footer
  },
  created () {
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/global.scss';
</style>
