<template>
  <div class="account-message">
    <div class="sub1 bg-white">
      <div class="message-title">
        消息开关
        <div class="sub-title">
          <small>请选择您要展示的消息类型</small>
        </div>
      </div>
      <div class="message-content">
        <el-table class="show-list no-border" empty=""
          :fit="false"
          :data="visible"
          :highlight-current-row="false"
          :show-header="false">
          <el-table-column
            width="160">
            <template slot-scope="scope">
              {{scope.row.label}}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-switch
                class="cust-switch-label"
                v-model="scope.row.selected"
                active-color="#13ce66"
                inactive-color="#ccc"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="sub1 bg-white">
      <div class="message-title clear">
        内容过滤
        <el-button class="right" size="mini" type="success">添加内容</el-button>
        <div class="sub-title">
          <small>当转发或评论消息的内容包含屏蔽词时，该消息将被自动归入垃圾箱; 当我发出的微博中包含屏蔽词时，该条微博下的评论、转发或点赞将自动归入垃圾箱</small>
        </div>
      </div>
      <div class="message-content">
        <el-table class="show-list" :data="filterList">
          <el-table-column prop="text" label="内容">
          </el-table-column>
          <el-table-column prop="filter" label="过滤">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="handler del">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filterList: [
        {
          id: 0,
          text: '这是一个测试',
          filter: '测试',
          create_time: '2018-03-27'
        }
      ],
      visible: [
        {
          value: 0,
          selected: 1,
          label: '关注消息'
        },
        {
          value: 1,
          selected: 1,
          label: '取关消息'
        },
        {
          value: 2,
          selected: 1,
          label: '私信消息'
        },
        {
          value: 3,
          selected: 1,
          label: '评论消息'
        },
        {
          value: 4,
          selected: 1,
          label: '@提及我消息'
        },
        {
          value: 5,
          selected: 1,
          label: '点链接'
        },
        {
          value: 6,
          selected: 1,
          label: '点赞'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.account-message{
  .sub1{
    padding: 10px 10px;
    margin-bottom: 20px;
    .message-title{
      padding: 0px 10px 10px;
      border-bottom: 1px solid #e4e7ed;
      .sub-title{
        padding: 2px 0;
        font-size: 12px;
        color: #888;
      }
      .el-button{
        margin-top: 5px;
      }
    }
    .message-content{
      padding: 10px 10px;
      .show-list{
        thead th{
          background-color: #eee;
        }
      }
      .no-border{
        td, th{
          border-bottom: none;
        }
        &:before{
          display: none;
        }
      }
    }
  }
}
</style>
