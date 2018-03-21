<template>
  <div class="message">
    <el-row :gutter="10">
      <el-col :lg="3" :md="4" :sm="6" :xs="8">

        <el-select class="full" v-model="status.selected">
          <el-option
            v-for="item in status.list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-col>
      <el-col :lg="3" :md="4" :sm="6" :xs="8">

        <el-select class="full" v-model="type.selected">
          <el-option
            v-for="item in type.list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
