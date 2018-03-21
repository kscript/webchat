<template>
  <div class="v-home">
    <v-header></v-header>
    <template v-if="$route.meta.keep">
      <keep-alive></keep-alive>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
    <v-footer></v-footer>
  </div>
</template>
<script>
import header from './header.vue'
import footer from './footer.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/global.scss';
</style>
