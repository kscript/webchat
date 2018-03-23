<template>
  <div class="message">
    <v-messagehead></v-messagehead>
    <div class="message-main cust-fix">
      <v-messagelist :users="users" @selectUser="selectUser"></v-messagelist>
      <v-messagedetail :detail="detail" :messages="messages" :emotions="emotions"></v-messagedetail>
      <v-messagehandle :users="users" :detail="detail"></v-messagehandle>
    </div>
  </div>
</template>
<script>
import messageList from './list.vue'
import messageDetail from './detail.vue'
import messageHead from './head.vue'
import messageHandle from './handle.vue'

export default {
  data () {
    return {
      users: [],
      messages: [],
      detail: {},
      emotions: {}
    }
  },
  components: {
    'v-messagelist': messageList,
    'v-messagedetail': messageDetail,
    'v-messagehead': messageHead,
    'v-messagehandle': messageHandle
  },
  methods: {
    selectUser (vo) {
      this.getMessageList(vo)
    },
    getEmotions () {
      let self = this
      self.$axios({
        url: 'v1/emotions',
        method: 'GET',
        data: {
          category: '默认'
        }
      }).then(response => {
        self.emotions['default'] = {
          label: '默认',
          list: response.data.result
        }
      })
    },
    getMessageList (vo) {
      let self = this
      self.detail = vo
      vo.biz.count = 0
      self.$axios({
        url: 'v1/contents',
        method: 'GET',
        data: {
          id: vo.id
        }
      }).then(response => {
        self.messages = response.data.result.reverse()
      })
    },
    init () {
      let self = this
      self.$axios({
        url: 'v1/users',
        method: 'GET'
      }).then(response => {
        self.users = response.data.result
        self.getMessageList(self.users[0])
      })
      self.getEmotions()
    }
  },
  created () {
    this.init()
    window.vm = this
  }
}
</script>
<style>
.message-main{
  width: 100%;
}
</style>
