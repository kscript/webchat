<template>
  <div class="customer clear">
    <div class="layout-left cust-fix bg-white">
      <div class="box">
        <div class="hd">
          客户分组
        </div>
        <div class="bd">
          <ul class="group-list">
            <li  class="group-item" v-for="(vo, index) in group.list" :key="index" @click="selectGroup(vo, index)">
              {{vo.label}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="layout-right">
      <div class="box scroll">
        <div class="hd">
          <el-row :gutter="10">
            <el-col :span="2" class="select2">
              <el-select class="full" v-model="info.selected" size="mini">
                <el-option
                  v-for="item in info.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="select2">
              <el-select class="full" v-model="sex.selected" size="mini">
                <el-option
                  v-for="item in sex.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="select2">
              <el-select class="full" v-model="province.selected" size="mini">
                <el-option
                  v-for="item in province.list"
                  :key="item.ProID"
                  :label="item.name"
                  :value="item.ProID">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3" class="select3">
              <el-input class="input-with-select" placeholder="请输入内容" size="mini" v-model="searchText">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4" class="select4 right">
              <el-radio-group v-model="classify.selected" size="mini">
                <el-radio-button v-for="vo in classify.list" :label="vo.value" :key="vo.value">{{vo.label}}</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <div class="bd">
          <el-table
          class="user-list"
          :data="users"
          :show-header="false"
          empty-text=" ">
            <el-table-column
              prop="user"
              label=""
              width="90px" class="text-center">
              <template slot-scope="scope">
                <img :src="scope.row.user.profile_image_url" alt="" class="photo">
              </template>
            </el-table-column>
            <el-table-column
              prop="user"
              label="">
              <template slot-scope="scope">
                <div>
                  <div class="user-name">
                    {{scope.row.user.name}}
                    <span class="iconfont" :class="scope.row.user.gender === 'm' ? 'icon-male':'icon-female'"></span>
                  </div>
                  <div class="user-info">
                    <span class="info-item"><span class="nums">{{scope.row.user.followers_count}}</span> <span class="text">粉丝</span></span>
                    <span class="info-item"><span class="nums">{{scope.row.user.friends_count}}</span> <span class="text">关注</span></span>
                    <span class="info-item"><span class="nums">{{scope.row.user.statuses_count}}</span> <span class="text">微博</span></span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="text-right"
            small
            layout="prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      users: [],
      searchText: '',
      page: {
        total: 50,
        size: 15,
        current: 1
      },
      province: {
        selected: 0,
        list: []
      },
      group: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '重要客户'
          }
        ]
      },
      classify: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '收藏时间'
          },
          {
            value: 1,
            label: '粉丝数'
          },
          {
            value: 2,
            label: '互动时间'
          }
        ]
      },
      info: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '有QQ'
          },
          {
            value: 2,
            label: '有电话'
          },
          {
            value: 3,
            label: '有微信'
          }
        ]
      },
      sex: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '不限性别'
          },
          {
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          }
        ]
      }
    }
  },
  methods: {
    selectGroup (vo) {
      console.log(vo)
    },
    getUser (option = {}) {
      let self = this
      self.$axios({
        url: 'v1/users',
        method: 'GET',
        data: option
      }).then(response => {
        self.users = response.data.result
      })
    },
    getArea () {
      let self = this
      self.$axios({
        url: 'v1/province',
        method: 'GET'
      }).then(response => {
        self.province.list = [{
          ProID: 0,
          name: '所有地区'
        }].concat(response.data.result)
      })
    },
    init () {
      this.getUser()
      this.getArea()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss">
$leftW: 240px;
.customer{
  .layout-left{
    width: $leftW;
    padding-top: 20px;
    top: $headH;
    left: auto;
    bottom: 0;
    z-index: 10;
    border-right: 1px solid #e4e7ed;
    .box{
      padding-left: 10px;
    }
    .hd{
      padding-bottom: 10px;
      font-size: 16px;
      color: #333;
    }
    .group-item{
      font-size: 12px;
      line-height: 24px;
      padding: 5px 0 5px 10px;
      &:hover{
        cursor: pointer;
        color: #89c983;
      }
    }
  }
  .layout-right{
    position: fixed;
    top: $headH;
    left: $leftW + $asideW;
    right: 0;
    bottom: 0;
    z-index: 9;
    .box{
      height: 100%;
      overflow-y: auto;
      position: relative;
    }
    .hd{
      position: fixed;
      top: $headH;
      left: $leftW + $asideW;
      right: 0;
      z-index: 9;
      padding: 15px 20px;
      background-color: #f6f6f6;
      border-bottom: 1px solid #e4e7ed;
    }
    .bd{
      padding-top: 80px;
      padding-bottom: 60px;
    }
    .user-list{
      .photo{
        margin-left: 20px;
        border-radius: 5px;
      }
    }
    .el-pagination{
      position: fixed;
      bottom: 0;
      left: $leftW;
      right: 0;
      z-index: 9;
      height: 30px;
      padding: 15px 20px;
      background-color: #fff;
      .el-pagination__editor.el-input{
        width: 50px!important;
      }
    }
    .user-name{
      font-size: 14px;
      color: #333;
      .icon-female{
        color: #e91e63;
        font-weight: 600;
      }
      .icon-male{
        color: #6bbc64;
        font-weight: 600;
      }
    }
    .user-info{
      padding-top: 10px;
      font-size: 12px;
      color: #666;
      .info-item{
        padding: 0px 6px;
        &:first-child{
          padding-left: 0;
        }
        .nums{
          color: #999;
        }
        .text{
          color: #999;
        }
        .icon-position{
          color: #333;
          transform: scaleX(.8);
        }
      }
    }
    .select2{
      min-width: 105px;
    }
    .select3{
      min-width: 160px;
    }
    .select4{
      min-width: 240px;
    }
  }
}
</style>
