<template>
  <div class="account-box">
    <v-info v-if="active ==='info'"></v-info>
    <v-message v-if="active ==='message'"></v-message>
    <v-menu v-if="active ==='menu'"></v-menu>
    <v-relation v-if="active ==='relation'"></v-relation>
  </div>
</template>
<script>
import info from './info.vue'
import message from './message.vue'
import menu from './menu.vue'
import relation from './relation.vue'

export default {
  data () {
    return {}
  },
  props: {
    active: String
  },
  components: {
    'v-info': info,
    'v-message': message,
    'v-menu': menu,
    'v-relation': relation
  }
}
</script>
