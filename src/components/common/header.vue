<template>
  <el-header height="40px" class="bg-white">
    <el-tabs v-model="tabs.activeName" @tab-click="handleClick" class="tabs-small">
      <el-tab-pane :label="vo.label" :key="vo.name" :name="vo.name" v-for="vo in tabs.list">
        <template slot="label">
          <div class="tab-toggle">{{vo.label}}</div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </el-header>
</template>
<script>
export default {
  data () {
    return {
      tabs: {
        activeName: 'Message',
        list: [
          {
            name: 'Message',
            label: '消息'
          },
          {
            name: 'Post',
            label: '发布'
          },
          {
            name: 'Customer',
            label: '客户'
          },
          {
            name: 'Setting',
            label: '设置'
          }
        ]
      }
    }
  },
  methods: {
    handleClick () {
      let self = this
      let name = self.tabs.activeName
      self.$router.push(name)
    }
  },
  created () {
    let self = this
    self.tabs.activeName = self.$route.name
  }
}
</script>
<style>
.tabs-small .el-tabs__item{
  padding: 0px 15px;
}
.tabs-small .tab-toggle{
  padding: 0 10px;
}
.tabs-small .el-tabs__nav-wrap::after{
  height: 1px;
}
</style>
