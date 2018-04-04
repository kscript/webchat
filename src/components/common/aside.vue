<template>
  <el-aside class="cust-fix">
    <div class="logo"></div>
  </el-aside>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
.el-aside{
  top: 0;
  left: 0;
  color: #fff;
  background-color: #333;
  width: $asideW!important;
  .logo{
    height: $headH;
    background-color: #232323;
  }
}
</style>
