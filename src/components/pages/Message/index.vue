<template>
  <div class="message">
    <v-messagehead></v-messagehead>
    <v-messagelist></v-messagelist>
    <v-messagedetail></v-messagedetail>
  </div>
</template>
<script>
import messageList from './list.vue'
import messageDetail from './detail.vue'
import messageHead from './head.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    'v-messagelist': messageList,
    'v-messagedetail': messageDetail,
    'v-messagehead': messageHead
  }
}
</script>
