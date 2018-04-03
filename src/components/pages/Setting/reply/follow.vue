<template>
  <div class="reply-follow">
    <div class="box follow-content">
      <div class="hd">
        <div class="major-info">
          <el-switch
            class="cust-switch-label"
            v-model="processMode.active"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="0"
            :inactive-text="processMode.label">
          </el-switch>
        </div>
        <div class="minor-info">
          <small>自动发多条私信<span class="iconfont icon-doubt"></span> <span class="tinting">如何配置?</span></small>
        </div>
      </div>
      <div class="bd">
        <div class="add-reply">
          <el-collapse v-model="activeReplyName" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeReplyName: '',
      processMode: {
        active: 1,
        label: '自动处理关注',
        selected: 0,
        list: [
          {
            value: 0,
            label: ''
          },
          {
            value: 1,
            label: ''
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
$color: #6bbc64;
.reply-follow{
  .follow-content{
    .hd{
      .major-info{
        line-height: 34px;
      }
      .minor-info{
        small {
          .iconfont{
            padding: 0 3px;
          }
          .tinting{
            color: $color;
          }
        }
      }
    }
  }
}
</style>
