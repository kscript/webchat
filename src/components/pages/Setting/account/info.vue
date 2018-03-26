<template>
  <div class="account-info">
    <div class="sub1 bg-white">
      <div class="info-title">
        账号授权
      </div>
      <div class="info-content">
        <el-table empty-text=" " :data="accounts">
          <el-table-column prop="name" label="昵称">
          </el-table-column>
          <el-table-column prop="uid" label="UID">
          </el-table-column>
          <el-table-column prop="appkey" label="APPKEY">
          </el-table-column>
          <el-table-column prop="service" label="粉丝服务">
          </el-table-column>
          <el-table-column prop="vilid_date" label="有效期">
          </el-table-column>
          <el-table-column prop="status" label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="handler-link">重新授权</span>
              <span class="handler-link">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-row type="flex" :gutter="15">
      <el-col :span="12">
        <div class="sub2 bg-white">
          <div class="title-box">
            <div class="title">
              处理主动私信
            </div>
            <small class="sub-title">
              接收并恢复主动私信的粉丝
            </small>
          </div>
          <div class="content">
            <el-button size="mini" type="default">配置粉丝服务</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="sub2 bg-white">
          <div class="title-box">
            <div class="title">
              处理主动私信
            </div>
            <small class="sub-title">
              接收并恢复主动私信的粉丝
            </small>
          </div>
          <div class="content">
            <el-button size="mini" type="default">配置私信</el-button>
            <span class="note-text">未开通</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      accounts: [
        {
          name: '测试',
          uid: 1,
          status: 1,
          vilid_date: '2018-04-21',
          service: 'http://exmaple.com/service'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.account-info{
  .sub1{
    padding: 10px 10px;
    margin-bottom: 20px;
    .info-title{
      padding: 0px 10px 10px;
      border-bottom: 1px solid #e4e7ed;
    }
    .info-content{
      padding: 10px 10px;
      .el-table{
        font-size: 12px;
        text-align: center;
        .el-table__header{
          th{
            text-align: center;
            background-color: #f3f3f3;
          }
        }
        .handler-link{
          color: #6bbc64;
          padding: 0px 3px;
          cursor: pointer;
        }
      }
    }
  }
  .sub2{
    padding: 10px;
    .title-box{
      padding: 10px;
      border-bottom: 1px solid #e4e7ed;
      font-size: 14px;
      .title{
        color: #555;
      }
      .sub-title{
        color: #888;
      }
    }
    .content{
      padding: 10px;
      .note-text{
        padding: 0px 5px;
        font-size: 12px;
        color: #888;
      }
    }
  }
}
</style>
