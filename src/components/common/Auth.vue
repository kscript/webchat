<template>
  <div class="auth-box">
    <el-row>
      <el-col :span="16"></el-col>
      <el-col :span="8">
        <a :href="authUrl"><img src="/static/img/sina-logo.png" alt="sina logo"></a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import store from '../../store'
export default {
  data () {
    return {
      authUrl: ''
    }
  },
  methods: {
    init () {
      let self = this
      self.$axios({
        url: store.getters.v2 + 'weibo_auth.php',
        methods: 'GET'
      }).then(response => {
        store.commit('auth', true)
        self.authUrl = response.data.result.auth_url
      })
    }
  },
  created () {
    console.log(this)
    this.init()
  }
}
</script>
