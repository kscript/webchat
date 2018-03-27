<template>
  <div class="account-relation">
    <div class="sub1 bg-white">
      <div class="message-title">
        关联账号
        <div class="sub-title">
          <small>开启关联后可以使用关联的账号处理消息</small>
        </div>
      </div>
      <div class="message-content">
        <el-table class="show-list no-border" empty=""
          :fit="true"
          :data="account"
          :highlight-current-row="false"
          :show-header="false">
          <el-table-column width="100px">
            <template slot-scope="scope">
              <img class="logo" :src="scope.row.logo" :alt="scope.row.name">
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              {{scope.row.id === 0 ? '当前账号': ''}}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              {{'使用截止时间:' + scope.row.vilid_date}}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              {{types[scope.row.type]||''}}
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
      types: ['默认'],
      account: [
        {
          id: 0,
          type: 0,
          logo: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
          name: '测试',
          vilid_date: '2018-03-27'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.account-relation{
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
      .logo{
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        border-radius: 3px;
        vertical-align: middle;
        margin-right: 5px;
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
