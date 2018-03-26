<template>
  <div class="service-box">
    <v-manage v-if="active ==='manage'"></v-manage>
    <v-assign v-if="active ==='assign'"></v-assign>
  </div>
</template>
<script>
import manage from './manage.vue'
import assign from './assign.vue'

export default {
  data () {
    return {}
  },
  props: {
    active: String
  },
  components: {
    'v-manage': manage,
    'v-assign': assign
  }
}
</script>
