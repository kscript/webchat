<template>
  <div class="post">
    <el-row>
      <el-col :span="12">
        <v-editor :emotions="emotions"></v-editor>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import editor from './editor.vue'
export default {
  data () {
    return {
      emotions: {
      }
    }
  },
  components: {
    'v-editor': editor
  },
  methods: {
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
    init () {
      this.getEmotions()
    }
  },
  created () {
    this.init()
  }
}
</script>
