<template>
  <div class="reply-box">
    <v-follow v-if="active ==='follow'"></v-follow>
    <v-letter v-if="active ==='letter'"></v-letter>
    <v-comment v-if="active ==='comment'"></v-comment>
    <v-link v-if="active ==='link'"></v-link>
  </div>
</template>
<script>
import follow from './follow.vue'
import letter from './letter.vue'
import comment from './comment.vue'
import link from './link.vue'

export default {
  data () {
    return {}
  },
  props: {
    active: String
  },
  components: {
    'v-follow': follow,
    'v-letter': letter,
    'v-comment': comment,
    'v-link': link
  }
}
</script>
