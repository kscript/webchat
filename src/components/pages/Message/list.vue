<template>
  <div class="message-list">
    <div class="user-list cust-fix bg-white">
      <div class="scroll-box">
        <div class="scroll">
          <el-table
          ref="usersTable"
          :data="users.list"
          :show-header="false"
          empty-text=" "
          @selection-change="selectChange"
          @row-dblclick="handleDblClick">
            <el-table-column type="selection" width="32" class-name="text-center"></el-table-column>
            <el-table-column
              label="">
              <template slot-scope="scope">
                <el-row type="flex">
                  <el-col :span="3" style="min-width: 60px">
                    <el-badge :value="users[scope.row].biz.count" class="item">
                      <img :src="users[scope.row].user.profile_image_url" alt="" class="photo">
                    </el-badge>
                  </el-col>
                  <el-col :span="16">
                    <div class="user-name">{{users[scope.row].user.name}}</div>
                    <div class="message-time">{{users[scope.row].biz.updatedAt.slice(0,10)}}</div>
                    <div class="message-text">{{users[scope.row].biz.text}}</div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <div slot="append"></div>
          </el-table>
        </div>
      </div>
      <el-row class="pagination-box">
        <el-col :span="8">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="selectAll">全选/取消</el-checkbox>
        </el-col>
        <el-col :span="16">
          <el-pagination
          class="text-right"
          small
          layout="prev, pager, next"
          :total="page.total"
          @current-change="pageChange">
        </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page: {
        total: 50,
        size: 15,
        current: 1
      },
      isIndeterminate: false,
      checkAll: false,
      user_select: []
    }
  },
  methods: {
    pageChange () {
      let self = this
      self.checkAll = false
      self.selectAll()
    },
    selectAll () {
      let self = this
      let table = self.$refs.usersTable
      if (!self.checkAll) {
        table.clearSelection()
      } else {
        table.data.forEach(row => {
          table.toggleRowSelection(row, true)
        })
      }
    },
    selectChange (rows) {
      let table = this.$refs.usersTable
      if (rows.length > 0) {
        this.checkAll = table.data.length === rows.length
        this.isIndeterminate = !this.checkAll
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    handleDblClick (vo) {
      // 清除未读计数器
      this.users[vo].biz.count = 0
      this.$emit('selectUser', vo)
    }
  },
  created () {
  },
  props: {
    users: Object
  }
}
</script>
<style lang="scss">
.message-list{
  padding-top: 0px;
  .user-list{
    z-index: 120;
    width: 25%;
    padding-bottom: 42px;
    .scroll-box{
      height: 100%;
      border: 1px solid #e4e7ed;
      border-top: none;
      border-right: none;
      .scroll{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .el-table{
          margin-bottom: -1px;
        }
        .message-time,
        .message-text{
          line-height: 16px;
          color: #999;
          font-size: 12px;
        }
        .el-badge{
          padding: 4px 0;
          height: 44px;
          line-height: normal;
          .el-badge__content{
            background-color: #ff0000;
            top: 10px;
            border: none;
          }
        }
      }
    }
    .photo{
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
    .pagination-box{
      padding: 8px;
      margin-bottom: 10px;
    }
  }
}
</style>
