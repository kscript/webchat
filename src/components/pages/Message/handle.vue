<template>
  <div class="message-handle">
    <div class="handle-box cust-fix">
      <div class="handle-list">
        <div class="collapse-box">
          <el-collapse accordion class="accordion-icon-left">
            <el-collapse-item v-for="(v1, i1) in handles" :key="i1">
              <template slot="title">
                <div class="accordion-title">
                  {{v1.label}}
                </div>
              </template>
              <div class="accordion-content">
                <div class="handlers" v-for="(v2,i2) in v1.list" :key="i2">
                  <template v-if="v2.type && v2.type === 'button'">
                    <el-button @click="handler(v2,i2)" size="small">{{v2.label}}</el-button>
                  </template>
                </div>
              </div>
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
      handles: [
        {
          label: '客户',
          list: [
            {
              id: 0,
              type: 'button',
              label: '收藏客户'
            }
          ]
        },
        {
          label: '话术',
          list: [
            {
              id: 0,
              type: 'button',
              label: '添加分组'
            }
          ]
        },
        {
          label: '记录'
        }
      ]
    }
  },
  props: {
    users: Array,
    detail: Object
  },
  methods: {
    handler (v2, i2) {

    }
  }
}
</script>
<style lang="scss">
$titleH: 40px;
.handle-box{
  margin-left: 75%;
  width: 25%;
  z-index: 100;
  padding-bottom: 1px;
}
.handle-list{
  padding-right: 40px;
  height: 100%;

  .collapse-box{
    height: 100%;
    padding: 5px 10px;
  }
  .el-collapse{
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin:0 10px;
  }
  .el-collapse-item__header{
    height: $titleH;
    line-height: $titleH;
    border-top: 1px solid #d9d9d9;
    border-bottom: none;
    background: none;
  }
  .el-collapse-item__wrap{
    border-bottom: none;
    background: none;
  }
  .accordion-title{
    padding-left: 15px;
    background-color: #f4f4f4;
  }
  .el-collapse-item__content{
    padding-bottom: 0;
  }
  .el-collapse-item{
    &:last-child{
      margin-bottom: 0;
      .el-collapse-item__header{
        border-bottom: none;
      }
    }
    &:first-child{
      .el-collapse-item__header{
        border-top: none;
      }
    }
    .el-icon-arrow-right{
      line-height: $titleH;
      margin-left: 5px;
      float: left;
      color: #666;
      font-size: 16px;
      transform: scale(.8333);
      transition: transform .24s ease;
      &:before{
        content: "\e60e";
      }
    }
    &.is-active{
      .el-collapse-item__header{
        .el-collapse-item__arrow{
          transform: rotate(.25turn) scale(.8333);
        }
      }
    }
  }
  .handlers{
    padding: 10px 10px;
  }
}

</style>
