<template>
  <div class="message">
    <v-messagehead @filterChange="filterChange"></v-messagehead>
    <div class="message-main cust-fix">
      <v-messagelist :users="users" @selectUser="selectUser"></v-messagelist>
      <v-messagedetail :detail="detail" :messages="messages" :datas="editDatas"></v-messagedetail>
      <v-messagehandle :users="users" :detail="detail"></v-messagehandle>
      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :width="dialog.width" v-if="dialog">
        <span slot="footer" class="dialog-footer" v-if="dialog.footer.show">
          <el-button @click="dialog.visible = false" v-if="dialog.footer.showCancel">取 消</el-button>
          <el-button type="primary" @click="dialog.visible = false" v-if="dialog.footer.showConfirm">确 定</el-button>
        </span>
      </el-dialog>
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
      users: { // key: user.id
        list: [] // user.id
      },
      messages: [],
      detail: {},
      editDatas: {
        emotions: {}
      },
      dialog: null
    }
  },
  components: {
    'v-messagelist': messageList,
    'v-messagedetail': messageDetail,
    'v-messagehead': messageHead,
    'v-messagehandle': messageHandle
  },
  methods: {
    filterChange (filter) {
      console.log(filter)
    },
    setDialog (option) {
      let dialog = {
        title: '',
        visible: false,
        width: '600px',
        footer: {
          show: true,
          showCancel: true,
          showConfirm: true
        }
      }
      option = option || {}
      for (let key in dialog) {
        if (option[key] === undefined) {
          option[key] = dialog[key]
        }
      }
      return option
    },
    selectUser (vo) {
      this.getMessageList(this.users[vo])
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
        self.editDatas.emotions['default'] = {
          label: '默认',
          list: response.data.result
        }
      })
    },
    getMessageList (vo) {
      let self = this
      if (vo || self.users.list.length) {
        self.detail = vo = vo || self.users[self.users.list[0]]
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
      }
    },
    onmessage (message) {
      let data = JSON.parse(message.data)
      if (data) {
        // this.messages.unshift()
      }
    },
    init () {
      let self = this
      self.$axios({
        url: 'v1/users',
        method: 'GET'
      }).then(response => {
        let list = []
        let result = response.data.result || []
        result.forEach((item, index) => {
          list.push(item.user.id)
          self.$set(self.users, item.user.id, item)
        })
        self.$set(self.users, 'list', list)
        self.getMessageList()
      })
      self.getEmotions()
    }
  },
  created () {
    let self = this
    self.init()
    self.setDialog()
    self.$wbk.readyState < 1 && self.$wbk.close()
    self.$wbk.init()
    self.$wbk.onmessage = self.onmessage
    window.vm = self
  }
}
</script>
<style>
.message-main{
  width: 100%;
}
</style>
