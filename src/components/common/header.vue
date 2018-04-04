<template>
  <el-header height="45px" class="bg-white tabs-small">
    <el-tabs v-model="tabs.activeName" @tab-click="handleClick">
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
<style lang="scss">

.tabs-small{
  height: $headH;
  .el-tabs__item{
    padding: 0px 15px;
  }
  .tab-toggle{
    padding: 2px 15px;
  }
  .el-tabs__header{
    .el-tabs__nav{
      height: $headH;
    }
    .el-tabs__nav-scroll{
      padding-left: 15px;
    }
  }
  .el-tabs__nav-wrap{
    height: $headH;
    &::after{
      height: 1px;
    }
  }
}
</style>
