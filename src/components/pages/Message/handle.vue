<template>
  <div class="message-handle">
    <div class="handle-box cust-fix">
      <div class="handle-list">
        <div class="collapse-box">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                一致性 Consistency<i class="header-icon el-icon-info"></i>
              </template>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                一致性 Consistency<i class="header-icon el-icon-info"></i>
              </template>
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
    }
  },
  props: {
    users: Array,
    detail: Object
  }
}
</script>
<style>
.handle-box{
  margin-left: 75%;
  width: 25%;
  z-index: 100;
  padding-bottom: 1px;
}
.handle-list{
  padding-right: 40px;
  height: 100%;
}
.handle-list .collapse-box{
  height: 100%;
}
.handle-list .el-collapse{
  padding: 10px;
  border: none;
}
</style>
