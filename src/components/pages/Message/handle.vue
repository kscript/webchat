<template>
  <div class="message-handle">
    <div class="handle-box cust-fix bg-white">
      <div class="handle-list">
        <div class="collapse-box">
          <el-collapse accordion class="collapse-1">
            <el-collapse-item v-for="(v1, i1) in handles" :key="i1">
              <div slot="title">
                <div class="accordion-title">
                  {{v1.label}}
                </div>
              </div>
              <div class="accordion-content">
                <div class="handlers" v-for="(v2,i2) in v1.list" :key="i2">
                  <template v-if="v2.type">

                    <template v-if="v2.type === 'button'">
                      <el-button @click="handler(v2,i2)" size="small">{{v2.label}}</el-button>
                    </template>

                    <template v-else-if="v2.type === 'accordion'">

                      <el-collapse v-model="v2.activeName" accordion v-for="(v3,i3) in v2.list" v-if="v2.list" :key="i3" class="collapse-2">
                        <el-collapse-item :title="v3.label">
                          <div class="common-list scroll">
                            <div class="common-item clear" v-for="(v4,i4) in v3.list" v-if="v3.list" :key="i4">
                              <span class="iconfont icon-edit right"></span>
                              <div class="common-text ellipsis">{{v4.text}}</div>
                            </div>
                            <div class="empty-text" v-else>{{v3.empty||'-'}}</div>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </template>
                    <template v-if="v2.type === 'text'">
                      <ul class="note-list scroll" v-if="v2.list">
                        <li class="li-item node" v-for="(v3, i3) in v2.list" :key="i3">
                          <span class="text">{{v3.label}}</span>
                        </li>
                      </ul>
                      <div class="empty-text" v-else>{{v2.empty||'-'}}</div>
                    </template>

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
// import accordion from './accordion.vue'
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
            },
            {
              id: 0,
              type: 'accordion',
              activeName: '',
              empty: '暂无话术',
              label: '',
              list: [
                {
                  label: '10星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '9星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '8星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '7星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '6星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '5星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '4星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '3星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '2星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '1星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                },
                {
                  label: '0星组',
                  list: [
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    },
                    {
                      text: '你好'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '记录',
          list: [
            {
              id: 0,
              type: 'text',
              label: '记录',
              empty: '暂无记录',
              list: [
                {
                  label: '记录1'
                },
                {
                  label: '记录2'
                },
                {
                  label: '记录3'
                },
                {
                  label: '记录4'
                },
                {
                  label: '记录5'
                },
                {
                  label: '记录6'
                },
                {
                  label: '记录7'
                },
                {
                  label: '记录8'
                },
                {
                  label: '记录9'
                },
                {
                  label: '记录10'
                },
                {
                  label: '记录11'
                },
                {
                  label: '记录12'
                },
                {
                  label: '记录13'
                },
                {
                  label: '记录14'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    // 'v-accordion': accordion
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
  .collapse-1{
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin:0 10px;
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
      &.is-active{
        .el-collapse-item__header{
          .el-collapse-item__arrow{
            transform: rotate(.25turn) scale(.8333);
          }
        }
      }
      .el-collapse-item__header{
        height: $titleH;
        line-height: $titleH;
        border-top: 1px solid #d9d9d9;
        border-bottom: none;
        background: none;
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
        .accordion-title{
          padding-left: 15px;
          background-color: #f4f4f4;
        }
      }
      .el-collapse-item__wrap{
        border-bottom: none;
        background: none;
        .collapse-2{
          border-top: none;
          border-bottom: none;
          margin-top: 5px;
          .el-collapse-item__header{
            background: #f7f7f7;
            height: 36px;
            line-height: 36px;
            &.is-active{
              .el-icon-arrow-right{
                transform: rotate(.25turn) scale(0.8333);
              }
            }
            &:not(.is-active){
              .el-icon-arrow-right{
                transform: rotate(0turn) scale(0.8333);
              }
            }
            .el-icon-arrow-right{
              height: 36px;
              line-height: 36px;
            }
          }
          .el-collapse-item__content{
            padding-top: 0px;
            padding-bottom: 10px;
            .common-list{
              max-height: 200px;
              overflow-y: auto;
            }
            .common-item{
              padding: 1px 5px;
              cursor:pointer;
              .iconfont{
                margin: 5px;
                margin-bottom: 0;
                display: none;
              }
              &:hover{
                .iconfont{
                  display: block;
                  cursor:pointer;
                  color: #888;
                  font-size: 14px;
                }
              }
            }
          }
        }
        .el-collapse-item__content{
          padding-top: 5px;
          padding-bottom: 15px;
          .handlers{
            padding: 10px 10px 0;
            .note-list{
              line-height: 25px;
              max-height: 200px;
              overflow-y: auto;
            }
          }
        }
      }
    }
  }
}
</style>
