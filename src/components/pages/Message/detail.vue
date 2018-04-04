<template>
  <div class="message-detail">
    <div class="message-card cust-fix">
      <el-card class="card-box user-detail">
        <div slot="header" class="clearfix" v-if="detail.user">
            <el-row type="flex">
              <el-col :span="1" style="min-width: 60px">
                <el-badge class="item">
                  <img :src="detail.user.profile_image_url" alt="" class="photo">
                </el-badge>
              </el-col>
              <el-col :span="23">
                <el-row>
                  <el-col :span="16">
                    <div class="user-name">
                      {{detail.user.name}}
                      <span class="iconfont" :class="detail.user.gender === 'm' ? 'icon-male':'icon-female'"></span>
                      <el-button size="mini" class="mini-minus">关注</el-button>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="icon-list text-right">
                      <el-tooltip content="收藏客户" placement="bottom" :open-delay="300">
                        <span class="iconfont icon-favorite" @click="iconHandler('favorite')"></span>
                      </el-tooltip>
                      <el-tooltip content="去微博发私信" placement="bottom" :open-delay="300">
                        <a :href="'//weibo.com/u/' + detail.user.id" target="_blank"><span class="iconfont icon-letter"></span>&nbsp;</a>
                      </el-tooltip>
                      <el-tooltip content="结束对话" placement="bottom" :open-delay="300">
                        <span class="iconfont icon-close" @click="iconHandler('close')"></span>
                      </el-tooltip>
                      <el-tooltip content="垃圾箱" placement="bottom" :open-delay="300">
                        <span class="iconfont icon-delete" @click="iconHandler('delete')"></span>
                      </el-tooltip>
                    </div>
                  </el-col>
                </el-row>

                <div class="user-info">
                  <span class="info-item"><span class="nums">{{detail.user.followers_count}}</span> <span class="text">粉丝</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.friends_count}}</span> <span class="text">关注</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.statuses_count}}</span> <span class="text">微博</span></span>
                  <span class="info-item"><span class="iconfont icon-position"></span> <span class="text">{{(detail.user.location||'').split(' ')[0]}}</span></span>
                </div>
              </el-col>

            </el-row>
        </div>
        <div class="scroll-box cust-fix">
          <div class="scroll">
            <ul class="content-list">
              <li class="li-item clear" v-for="(vo, index) in messages" :key="vo.id" :data-id="vo.accountId" :data-uid="vo.user.id" v-if="messages.length" :class="{'is-self':vo.accountId == vo.user.id,active: index === activeLi}" @click="clickLi(index)">
                <div class="identity">
                  <div class="is-messages message-item" v-if="vo.type === 'messages'">
                    <div class="message-time" v-if="vo.message && vo.message.createdAt">{{(vo.message.createdAt||'').slice(0,10)}}</div>
                    <template v-if="vo.message">
                      <div class="is-text type-box" v-if="vo.message.type === 'text'">
                        <span class="content-text" v-html="formatText(vo.message.text)"></span>
                        <span class="message-type">私信</span>
                      </div>
                      <div class="is-position type-box" v-else-if="vo.message.type === 'position'">
                        <span class="content-text" v-html="formatText(vo.message.text)"></span>
                      </div>
                    </template>
                  </div>
                  <div class="is-comments message-item" v-else-if="vo.type === 'comments'">
                    <template v-if="vo.status">
                      <div class="message-time" v-if="vo.message && vo.message.createdAt">{{(vo.message.createdAt||'').slice(0,10)}}</div>
                      <div class="is-status type-box">
                        <span class="content-text" v-html="formatText(vo.status.text)"></span>
                        <span class="message-type">评论</span>
                      </div>
                    </template>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="editor-box cust-fix">
          <div class="editor-padding">
            <v-editor @sendMessage="sendMessage" :options="editOptions"></v-editor>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import editor from '../../common/editor.vue'
import store from '../../../store'
export default {
  data () {
    return {
      activeLi: -1,
      user: {},
      editOptions: {
        confirmButtonText: '发私信',
        modules: {
          emotions: {
          },
          image: {
          }
        }
      }
    }
  },
  props: {
    detail: Object,
    messages: Array
  },
  components: {
    'v-editor': editor
  },
  methods: {
    clickLi (index) {
      this.activeLi = index
    },
    formatText (text) {
      return (text || '').replace(/(\r|\n)/g, () => {
        return '<br>'
      }).replace(/\s/g, '&nbsp;').replace(/http:\/\/(.*?)(\b|)$/g, m => {
        return '<a target="_blank" href="' + m + '">' + m + '</a>'
      })
    },
    iconHandler (type) {
      switch (type) {
        case 'follow':
          break
        case 'letter':
          break
        case 'close':
          break
        case 'delete':
          break
        default:
      }
    },
    sendMessage (text) {
      console.log(text)
    }
  },
  created () {
    this.user = store.state.user
  }
}
</script>
<style lang="scss">
$editB: 50px;
$editH: 150px;
$editMT: 8px;

.message-card{
  padding-bottom: 1px;
  width: 50%;
  margin-left: 25%;
  z-index: 130;
  .el-card__header{
    padding: 12px 10px;
  }
}
.message-card .card-box{
  height: 100%;
  border-top: none;
  border-bottom: none;
  /*border-right: 1px solid #e4e7ed;*/
  border-radius: 0;
  box-shadow: none;
  padding-left: 15px;
  padding-right: 15px;
}
.user-detail{
  .photo{
    width: 50px;
    height: 50px;
    border-radius: 5px;
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
    .mini-minus{
      padding: 3px 10px;
    }
  }
  .user-info{
    padding-top: 10px;
    font-size: 12px;
    color: #666;
    .info-item{
      padding: 0px 10px;
      border-right: 2px solid #f2f2f2;
      &:first-child{
        padding-left: 0;
      }
      &:last-child{
        border-right: none;
      }
      .nums{
        font-weight: 700;
        color: #666;
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
  .scroll-box{
    top: 188px;
    bottom: $editB + $editH + $editMT;
    width: 50%;
    /*left: 25%;*/
    margin-left: -$asideW / 2;
    padding: 0 10px;
    box-sizing: border-box;
    .scroll{
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .el-table{
        margin-bottom: -1px;
      }
    }
  }
  .editor-box{
    width: 50%;
    height: $editH;
    padding: 1px;
    margin-left: -36px;
    border-top: 1px solid #e4e7ed;
    box-sizing: border-box;
    bottom: $editB;
    top: auto;
    .editor-padding{
      padding: 6px;
      background: #fff;
    }
  }
  .icon-list{
    font-size: 0;
    .iconfont{
      font-size: 14px;
      color: #6bbc64;
      cursor: pointer;
      padding: 1px 3px;
      &:focus{
        outline: none!important;
      }
    }
  }
}

.content-list{
  padding: 10px;
  .li-item{
    padding: 15px 10px 20px;
    border-left: 2px solid transparent;
    &.is-self .identity{
      text-align: right;
    }
    &.active:not(.is-self){
      border-left: 2px solid #6bbc64;
      background-color: #fafafa;
    }
    &:not(.is-self):hover{
      border-left: 2px solid #6bbc64;
      background-color: #fafafa;
    }
    &.is-self{
      .identity{
        .content-text:before{
          left: auto;
          right: -6px;
          border-left: 6px solid #e6f8e9;
          border-right: none;
        }
        .message-type{
          display: none;
        }
      }
    }
    .identity{
      text-align: left;
      .message-time{
        font-size: 12px;
        line-height: 34px;
        padding-left: 6px;
      }
      .message-item{
        .type-box{
          position: relative;
          .message-type{
            position: absolute;
            left: auto;
            top: 50%;
            margin-top: -6px;
            margin-left: 8px;
            font-size: 12px;
          }
        }
        &.is-comments{
          .content-text{
            width: 75%;
            font-size: 12px;
            color: #999;
            background: #e6f8e9;
          }
        }
      }
      .content-text{
        padding: 10px 20px;
        font-size: 12px;
        background: #e6f8e9;
        border-radius: 3px;
        position: relative;
        margin-left: 6px;
        line-height: 22px;
        display: inline-block;
        max-width: 75%;

        &:before{
          width: 0;
          height: 0;
          content: " ";
          position: absolute;
          top: 50%;
          border-right: 6px solid #e6f8e9;
          border-bottom: 6px solid transparent;
          border-top: 6px solid transparent;
          left: -6px;
          background: transparent;
          margin-top: -6px;
        }
      }
    }
  }
  a{
    color: #6bbc64;
  }
}

</style>
