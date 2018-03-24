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
              <el-col :span="16">
                <div class="user-name">
                  {{detail.user.name}}
                  <span class="iconfont" :class="detail.user.gender === 'm' ? 'icon-male':'icon-female'"></span>
                </div>
                <div class="user-info">
                  <span class="info-item"><span class="nums">{{detail.user.followers_count}}</span> <span class="text">粉丝</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.friends_count}}</span> <span class="text">关注</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.statuses_count}}</span> <span class="text">微博</span></span>
                  <span class="info-item"><span class="iconfont icon-position"></span> <span class="text">{{(detail.user.location||'').split(' ')[0]}}</span></span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="icon-list text-right">
                  <el-tooltip content="收藏客户" placement="bottom" :open-delay="300">
                    <span class="iconfont icon-favorite" @click="iconHandler('favorite')"></span>
                  </el-tooltip>
                  <el-tooltip content="去微博发私信" placement="bottom" :open-delay="300">
                    <span class="iconfont icon-letter" @click="iconHandler('letter')"></span>
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
        </div>
        <div class="scroll-box cust-fix">
          <div class=" scroll">
            <ul class="content-list">
            <li class="li-item clear" v-for="(vo, index) in messages" :key="vo.id" :data-id="vo.accountId" :data-uid="vo.user.id" v-if="messages.length" :class="{'is-self':vo.accountId == vo.user.id,active: index === activeLi}" @click="clickLi(index)">
              <div class="identity">
                <div class="message-time" v-if="vo.message && vo.message.createdAt">{{(vo.message.createdAt||'').slice(0,10)}}</div>
                <div class="is-messages" v-if="vo.type === 'messages'">
                  <template v-if="vo.message">
                    <div class="is-text" v-if="vo.message.type === 'text'">
                      <span class="content-text" v-html="formatText(vo.message.text)"></span>
                    </div>
                    <div class="is-position" v-else-if="vo.message.type === 'position'">
                      <span class="content-text" v-html="formatText(vo.message.text)"></span>
                    </div>
                  </template>
                </div>
                <div class="is-comments" v-else-if="vo.type === 'comments'">
                  <template v-if="vo.status">
                    <div class="is-status">
                      <span v-html="formatText(vo.status.text)"></span>
                    </div>
                  </template>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div class="editor-box cust-fix">
          <v-editor :emotions="emotions" @sendMessage="sendMessage"></v-editor>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import editor from './editor.vue'
export default {
  data () {
    return {
      activeLi: -1
    }
  },
  props: {
    detail: Object,
    messages: Array,
    emotions: Object
  },
  components: {
    'v-editor': editor
  },
  methods: {
    clickLi (index) {
      this.activeLi = index
    },
    formatText (text) {
      return (text || '').replace(/(\r|\n)/g, (m) => {
        return '<br>'
      }).replace(/\s/g, '&nbsp;').replace(/http:\/\/(.*?)(\b|)$/g, (m) => {
        return '<a href="' + m + '">' + m + '</a>'
      })
    },
    iconHandler (type) {

    },
    sendMessage (text) {
      console.log(text)
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
$editB: 80px;
$editH: 150px;
$editMT: 8px;

.message-card{
  padding-bottom: 1px;
  width: 50%;
  margin-left: 25%;
  z-index: 110;
  .el-card__header{
    padding: 12px 15px;
  }
}
.message-card .card-box{
  height: 100%;
  border-top: none;
  border-bottom: none;
  border-right: 1px solid #e4e7ed;
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
  }
  .user-info{
    padding-top: 10px;
    font-size: 12px;
    color: #666;
    .info-item{
      padding: 0px 12px;
      border-right: 2px solid #f2f2f2;
      &:first-child{
        padding-left: 0;
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
    margin-left: -55px;
    .scroll{
      padding-left: 25px;
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
    bottom: $editB;
    top: auto;
    margin-left: -36px;
    border-top: 1px solid #e4e7ed;
  }
  .icon-list{
    font-size: 0;
    .iconfont{
      font-size: 14px;
      color: #6bbc64;
      cursor: pointer;
      padding: 1px 5px;
    }
  }
}

.content-list{
  padding: 10px;
}
.content-list .li-item{
  padding: 15px 10px 20px;
  border-left: 2px solid transparent;
}
.content-list .li-item .identity{
  text-align: left;
}
.content-list .li-item.is-self .identity{
  text-align: right;
}
.content-list .li-item.active:not(.is-self){
  border-left: 2px solid #6bbc64;
  background-color: #fafafa;
}
.content-list .li-item:not(.is-self):hover{
  border-left: 2px solid #6bbc64;
  background-color: #fafafa;
}
.content-list .message-time{
  font-size: 12px;
  line-height: 34px;
  padding-left: 6px;
}

.content-text{
  padding: 10px 20px;
  font-size: 12px;
  background: #e6f8e9;
  border-radius: 3px;
  position: relative;
  margin-left: 6px;
  line-height: 24px;
  display: inline-block;
}
.content-text:before{
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
.is-self .content-text:before{
  left: auto;
  right: -6px;
  border-left: 6px solid #e6f8e9;
  border-right: none;
}
.content-list a{
  color: #6bbc64;
}
.content-list .is-comments{
  padding: 15px;
  font-size: 12px;
  color: #999;
  background: #e6f8e9;
  border-radius: 5px;
}
</style>
