<template>
  <div class="message-list">
    <div class="user-list cust-fix">
      <div class="scroll-box">
        <div class="scroll">
          <el-table
          :data="users"
          :show-header="false" empty-text=" "
          @selection-change="selectChange"
          @row-dblclick="handleDblClick">
            <el-table-column type="selection" width="28" class-name="text-center"></el-table-column>
            <el-table-column
              prop="user"
              label="">
              <template slot-scope="scope">
                <el-row type="flex">
                  <el-col :span="3" style="min-width: 60px">
                    <el-badge :value="scope.row.biz.count" class="item">
                      <img :src="scope.row.user.profile_image_url" alt="" class="photo">
                    </el-badge>
                  </el-col>
                  <el-col :span="16">
                    <div class="user-name">{{scope.row.user.name}}</div>
                    <div class="message-time">{{scope.row.biz.updatedAt.slice(0,10)}}</div>
                    <div class="message-text">{{scope.row.biz.text}}</div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-pagination
        class="text-right"
        small
        layout="prev, pager, next"
        :total="page.total">
      </el-pagination>
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
      user_select: []
    }
  },
  methods: {
    selectChange () {

    },
    handleDblClick (vo) {
      // 清除未读计数器
      vo.biz.count = 0
      this.$emit('selectUser', vo)
    }
  },
  props: {
    users: Array
  }
}
</script>
<style lang="scss">
.message-list{
  padding-top: 0px;
  .user-list .scroll-box{
    height: 100%;
    border: 1px solid #e4e7ed;
    border-top: none;
    border-right: none;
  }
  .user-list .scroll-box .scroll{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .user-list .scroll-box .scroll .el-table{
    margin-bottom: -1px;
  }
  .user-list .el-pagination{
    /*border: 1px solid #e4e7ed;
    border-top: none;
    border-right: none;*/
  }
  .user-list{
    z-index: 120;
    width: 25%;
    padding-bottom: 28px;
  }
  .user-list .el-badge{
    padding: 4px 0;
    height: 44px;
    line-height: normal;
  }
  .user-list .el-badge .el-badge__content{
    background-color: #ff0000;
    top: 10px;
    border: none;
  }
  .user-list .photo{
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .user-list .message-time,
  .user-list .message-text{
    line-height: 16px;
    color: #999;
    font-size: 12px;
  }
}
</style>
