<template>
  <div class="setting">
    <div class="layout-left cust-fix bg-white">
      <div class="box">
        <div class="hd"></div>
        <div class="bd">
          <el-collapse v-model="activeName" class="accordion1" accordion>
            <el-collapse-item v-for="(v1, i1) in handler" :key="i1" :name="v1.name">
              <template slot="title">
                {{v1.label}}
              </template>
              <ul>
                <li class="li-item" :class="{active: handlerItem === v1.name && handlerActive === v2.name}" v-for="(v2,i2) in v1.list" v-if="v1.list" :key="i2" @click="handlerClick(v2,v1)">
                  {{v2.label}}
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="layout-right">
      <div class="box">
        <div class="bd">
          <v-account v-if="handlerItem === 'account'" :active="handlerActive"></v-account>
          <v-reply v-if="handlerItem === 'reply'" :active="handlerActive"></v-reply>
          <v-service v-if="handlerItem === 'service'" :active="handlerActive"></v-service>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import account from './account/index.vue'
import reply from './reply/index.vue'
import service from './service/index.vue'

export default {
  data () {
    return {
      activeName: 'account',
      handlerItem: 'account',
      handlerActive: 'info',
      handler: [
        {
          value: 1,
          name: 'account',
          label: '授权账号',
          list: [
            {
              value: 101,
              name: 'info',
              label: '账号信息'
            },
            {
              value: 102,
              name: 'message',
              label: '消息开关'
            },
            {
              value: 103,
              name: 'menu',
              label: '自定义菜单'
            },
            {
              value: 104,
              name: 'relation',
              label: '关联账号'
            }
          ]
        },
        {
          value: 2,
          name: 'reply',
          label: '自动回复',
          list: [
            {
              value: 201,
              name: 'follow',
              label: '关注'
            },
            {
              value: 202,
              name: 'letter',
              label: '私信'
            },
            {
              value: 203,
              name: 'comment',
              label: '评论'
            },
            {
              value: 204,
              name: 'link',
              label: '点赞'
            }
          ]
        },
        {
          value: 3,
          name: 'service',
          label: '客服设置',
          list: [
            {
              value: 301,
              name: 'manage',
              label: '客服管理'
            },
            {
              value: 302,
              name: 'assign',
              label: '指派管理'
            }
          ]
        }
      ]
    }
  },
  components: {
    'v-account': account,
    'v-reply': reply,
    'v-service': service
  },
  methods: {
    handlerClick (v2, v1) {
      this.handlerItem = v1.name
      this.handlerActive = v2.name
      // console.log('import ' + v2.name + ' from \'./' + v2.name + '.vue\'')
      // console.log('\'v-' + v2.name + '\': ' + v2.name)
      // console.log('<v-' + v2.name + ' v-if="active ===\'' + v2.name + '\'"></v-' + v2.name + '>')
    }
  }
}
</script>
<style lang="scss">
$color: #6bbc64;
.setting{
  .layout-left{
    width: 220px;
    top: 60px;
    left: auto;
    bottom: 0;
    z-index: 10;
    border-right: 1px solid #f3f3f3;
    .accordion1{
      border-top: none;
      border-bottom: none;
      .el-collapse-item__header{
        padding-left: 20px;
        border-bottom: none;
      }
      .el-collapse-item__wrap{
        border-bottom: none;
        .li-item{
          cursor: pointer;
          line-height: 34px;
          padding-left: 40px;
          &.active,&:hover{
            color: $color;
            background-color: $color * 2.25;
          }
        }
      }
    }
  }
  .layout-right{
    margin-left: 220px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
  }
}
</style>
