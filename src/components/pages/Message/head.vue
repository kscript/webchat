<template>
  <div class="message-head">
    <el-row type="flex" :gutter="10">
      <el-col :span="8">
        <el-row type="flex" justify="space-between" :gutter="10">
          <el-col :span="8">
            <el-select class="full" v-model="status.selected" size="mini">
              <el-option
                v-for="item in status.list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="full" v-model="assign.selected" size="mini">
              <el-option
                v-for="item in assign.list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="full" v-model="type.selected" size="mini">
              <el-option
                v-for="item in type.list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <span class="cust-gutter">
          <el-radio-group v-model="classify.selected" size="mini">
            <el-radio-button v-for="vo in classify.list" :label="vo.value" :key="vo.value">{{vo.label}}</el-radio-button>
          </el-radio-group>
        </span>
        <span class="cust-gutter">
          <el-button size="mini">批量完成</el-button>
        </span>
        <span class="cust-gutter">
          <el-switch
            class="cust-switch-label"
            v-model="assign.active"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="0"
            :inactive-text="assign.label">
          </el-switch>
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      classify: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '粉丝数量'
          },
          {
            value: 1,
            label: '交互时间'
          }
        ]
      },
      assign: {
        active: 1,
        label: '指派给我',
        selected: 0,
        list: [
          {
            value: 0,
            label: '全部指派'
          },
          {
            value: 1,
            label: '我的'
          }
        ]
      },
      status: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '待处理'
          },
          {
            value: 1,
            label: '已完成'
          },
          {
            value: 2,
            label: '垃圾箱'
          }
        ]
      },
      type: {
        selected: 0,
        list: [
          {
            value: 0,
            label: '全部消息'
          },
          {
            value: 1,
            label: '私信'
          },
          {
            value: 2,
            label: '评论'
          },
          {
            value: 3,
            label: '@我'
          },
          {
            value: 4,
            label: '点链接'
          },
          {
            value: 5,
            label: '关注'
          },
          {
            value: 6,
            label: '取消关注'
          },
          {
            value: 7,
            label: '点赞'
          }
        ]
      }
    }
  }
}
</script>
<style>
.message-head{
  padding: 15px 15px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e4e7ed;
}
.cust-gutter{
  padding-left: 3px;
  padding-right: 3px;
}
.cust-switch-label .el-switch__label span{
  color: #666;
  font-size: 12px;
}
.el-radio-button--mini .el-radio-button__inner{
  padding-left: 10px;
  padding-right: 10px;
}
</style>
