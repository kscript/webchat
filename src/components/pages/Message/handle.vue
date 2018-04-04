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
              <div class="accordion-content scroll">
                <div class="handlers" v-for="(v2,i2) in v1.list" :key="i2" v-if="v2.type">
                  <template v-if="v1.type === 'customer'">
                    <template v-if="v2.type === 'button'">
                      <el-button @click="handler(v2,i2)" size="small">{{v2.label}}</el-button>
                    </template>
                    <template v-if="v2.type === 'detail'">
                      <el-form ref="customer-form" size="small" :model="v2.info" label-width="60px">
                        <el-form-item label="姓名">
                          <el-input v-model="v2.info.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                          <el-radio v-model="v2.info.sex" label="1">男</el-radio>
                          <el-radio v-model="v2.info.sex" label="2">女</el-radio>
                        </el-form-item>
                        <hr>
                        <el-form-item label="手机">
                          <el-input v-model.number="v2.info.mobile" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-input v-model.number="v2.info.qq" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="微信">
                          <el-input v-model="v2.info.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                          <el-input v-model="v2.info.email"></el-input>
                        </el-form-item>
                        <hr>
                        <el-form-item label="签单">
                          <el-select v-model="v2.info.sign.selected">
                            <el-option :value="vo.value" :key="vo.value" :label="vo.label" v-for="vo in v2.info.sign.list"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input v-model="v2.info.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="分组">
                          <el-select multiple v-model="v2.info.group.selected">
                            <el-option :value="vo.value" :key="vo.value" :label="vo.label" v-for="vo in v2.info.group.list"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </template>
                  </template>
                  <template v-if="v1.type === 'talk'">
                    <template v-if="v2.type === 'accordion'">
                      <el-collapse v-model="v2.activeName" accordion v-for="(v3,i3) in v2.list" v-if="v2.list" :key="i3" class="collapse-2">
                        <el-collapse-item class="ellipsis">
                          <div slot="title" class="ellipsis clear">
                            <span class="iconfont icon-edit right" @click.stop.prevent="handlerEditGroup(v3)">&nbsp;</span>
                            <span class="iconfont icon-plus right" @click.stop.prevent="handlerPushGroup(v3)">&nbsp;</span>
                            <span class="title-text">{{v3.label}}</span>
                          </div>
                          <div class="common-list">
                            <div class="common-item clear" v-for="(v4,i4) in v3.list" v-if="v3.list" :key="i4">
                              <span class="iconfont icon-edit right"  @click.stop.prevent="handlerEditText(v4)"></span>
                              <div class="common-text ellipsis">{{v4.text}}</div>
                            </div>
                            <div class="empty-text" v-else>{{v3.empty||'-'}}</div>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </template>
                  </template>
                  <template v-if="v1.type === 'log'">
                    <template v-if="v2.type === 'text'">
                      <ul class="note-list scroll" v-if="v2.list">
                        <li class="li-item node" v-for="(v3, i3) in v2.list" :key="i3">
                          <span class="icon icon-circle"></span><span class="text">{{v3.label}}</span>
                          <div class="time-text">{{v3.time || '-'}}</div>
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
    <el-dialog
      class="messageHandlerDialog"
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      width="450px"
      append-to-body>
      <template v-if="dialogType === 'editGroup' || dialogType === 'addGroup'">
        <el-row>
          <el-col :span="5"><label>分组名称: </label></el-col>
          <el-col :span="18"><el-input clearable v-model="dialog.groupLabel" size="small"></el-input></el-col>
        </el-row>
      </template>
      <template v-else-if="dialogType === 'editText'">
        <el-row>
          <el-col :span="5"><label>话术内容: </label></el-col>
          <el-col :span="18">
            <v-editor :options="editOptions" :datas="editDatas"></v-editor>
          </el-col>
        </el-row>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import editor from '../../common/editor.vue'
export default {
  data () {
    return {
      dialogTitle: '提示',
      centerDialogVisible: false,
      dialogType: '',
      dialog: {
        groupLabel: ''
      },
      editOptions: {
        showConfirmButton: false,
        height: 100,
        modules: {
          emotions: {}
        }
      },
      editDatas: {},
      handles: [
        {
          label: '客户',
          type: 'customer',
          list: [
            {
              id: 0,
              type: 'button',
              label: '收藏客户',
              info: {
                name: '',
                sex: '',
                mobile: '',
                qq: '',
                wechat: '',
                email: '',
                sign: {
                  selected: '',
                  list: [
                    {
                      value: 0,
                      label: '未签单'
                    },
                    {
                      value: 1,
                      label: '已签单'
                    }
                  ]
                },
                desc: '',
                group: {
                  selected: '',
                  list: [
                    {
                      value: 0,
                      label: '重要客户'
                    },
                    {
                      value: 1,
                      label: '潜在客户'
                    }
                  ]
                }
              }
            }
          ]
        },
        {
          label: '话术',
          type: 'talk',
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
                  label: '10星组10星组10星组10星组10星组10星组10星组10星组10星组10星组10星组',
                  list: [
                    {
                      text: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好'
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
          type: 'log',
          list: [
            {
              id: 0,
              type: 'text',
              label: '记录',
              empty: '暂无记录',
              list: [
                {
                  label: '记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1记录1'
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
    'v-editor': editor
  },
  props: {
    users: Object,
    detail: Object
  },
  methods: {
    handlerEditGroup (v3) {
      this.centerDialogVisible = true
      this.dialogTitle = '编辑分组'
      this.dialogType = 'editGroup'
      this.dialog.groupLabel = v3.label
    },
    handlerEditText (v4) {
      this.centerDialogVisible = true
      this.dialogTitle = '编辑话术'
      this.dialogType = 'editText'
      this.dialog.groupLabel = v4.text
    },
    handlerPushGroup () {
      this.centerDialogVisible = true
      this.dialogTitle = '添加分组'
      this.dialogType = 'addGroup'
      this.dialog.groupLabel = ''
    },
    handler (v2) {
      if (v2.type === 'button') {
        v2.type = 'detail'
      }
    }
  }
}
</script>
<style lang="scss">
$titleH: 40px;
.messageHandlerDialog{
  .el-dialog__header{
    border-bottom: 1px solid #ddd;
    .el-dialog__title{
      font-size: 14px;
      color: #666;
      font-weight: bold;
    }
  }
  .el-dialog__body{
    label{
      line-height: 28px;
    }
  }
}
.handle-box{
  left: 75%;
  width: 25%;
  z-index: 100;
  padding: 0 40px;
  margin-left: 35px;
  padding-bottom: 1px;
  box-sizing: border-box;
}
.handle-list{
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
            &.focusing:focus:not(:hover){
              color: inherit;
            }
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
            .iconfont{
              margin: 5px;
              margin-bottom: 0;
              display: none;
              position: relative;
              z-index: 10;
            }
            &:hover{
              .iconfont{
                display: block;
                cursor:pointer;
                color: #888;
                font-size: 14px;
                margin-top: 10px;
              }
            }
          }

          .el-collapse-item__content{
            padding-top: 0px;
            padding-bottom: 10px;
            .common-list{
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
          padding-bottom: 5px;
          .accordion-content{
            max-height: 280px;
          }
          .handlers{
            padding: 5px 10px;
            .el-form{
              width: 80%;
              margin: 0 auto;
              hr{
                margin-bottom: 15px;
                border: none;
                border-bottom: 1px solid #eee;
              }
              input{
                border-width: 0px;
                &:focus,&:hover{
                  border-width: 1px;
                }
              }
              select{
                border-width: 0px;
                &:focus,&:hover{
                  border-width: 1px;
                }
              }
            }
            .note-list{
              line-height: 18px;
              overflow-y: auto;
              .node{
                font-size: 12px;
                padding-bottom: 8px;
                padding-left: 40px;
                position: relative;
                .icon-circle{
                  position: absolute;
                  top: 8px;
                  left: 5px;
                  width: 6px;
                  height: 6px;
                  display: inline-block;
                  border-color: #67c23a;
                  margin: 0 10px 0 5px;
                }
                .time-text{
                  color: #888;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
