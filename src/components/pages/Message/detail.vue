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
                <div class="user-name">{{detail.user.name}}</div>
                <div class="user-info">
                  <span class="info-item"><span class="nums">{{detail.user.followers_count}}</span> <span class="text">粉丝</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.friends_count}}</span> <span class="text">关注</span></span>
                  <span class="info-item"><span class="nums">{{detail.user.statuses_count}}</span> <span class="text">微博</span></span>
                  <span class="info-item"><span class="location"></span> <span class="text">{{(detail.user.location||'').split(' ')[0]}}</span></span>
                </div>
              </el-col>
            </el-row>
        </div>
        <div class="scroll-box cust-fix">
          <div class=" scroll">
            <ul class="content-list">
            <li class="li-item clear" v-for="vo in messages" :key="vo.id" :data-id="vo.accountId" :data-uid="vo.user.id" v-if="messages.length" :class="{'is-self':vo.accountId == vo.user.id}">
              <div class="identity">
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
        <div class="editor cust-fix">

        </div>
      </el-card>
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
    detail: Object,
    messages: Array
  },
  methods: {
    formatText (text) {
      return (text || '').replace(/(\r|\n)/g, (m) => {
        return '<br>'
      }).replace(/\s/g, '&nbsp;').replace(/http:\/\/(.*?)(\b|)$/g, (m) => {
        return '<a href="' + m + '">' + m + '</a>'
      })
    }
  },
  created () {
  }
}
</script>
<style>
.message-card{
  /*padding-left: 2px;*/
  padding-bottom: 1px;
  width: 50%;
  margin-left: 25%;
  z-index: 110;
}
.message-card .card-box{
  height: 100%;
  border-top: none;
  border-right: 1px solid #e4e7ed;
  box-shadow: none;
  border-radius: 0;
  padding-left: 15px;
  padding-right: 15px;
}
.user-detail .photo{
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.user-detail .user-info{
  padding-top: 5px;
  font-size: 12px;
  color: #666;
}
.user-detail .info-item{
  padding: 0px 12px;
  border-right: 2px solid #f2f2f2;
}
.user-detail .info-item:first-child{
  padding-left: 0;
}

.user-detail .scroll-box{
  top: 180px;
  bottom: 181px;
  width: 50%;
  margin-left: -55px;
  overflow: hidden; /* 隐藏滚动条右侧 */
  border: 1px solid #e4e7ed;
  border-top: none;
  border-bottom: none;
  border-left: 1px solid #e4e7ed;
  border-right: 2px solid #f1f1f1; /* 给滚动条添加右侧边框 */
}
.user-detail .scroll-box .scroll{
  margin: -14px -10px -14px 0; /* 隐藏上下三角 */
  padding: 14px 0;
  padding-left: 15px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.user-detail .scroll-box .scroll .el-table{
  margin-bottom: -1px;
}
.user-detail .editor{
  width: 50%;
  height: 100px;
  bottom: 80px;
  top: auto;
  margin-left: -37px;
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.content-list{
  padding: 10px;
}
.content-list .li-item{
  padding: 10px;
}
.content-list .li-item .identity{
  text-align: left;
}
.content-list .li-item.is-self .identity{
  text-align: right;
}
.content-text{
  padding: 5px 15px;
  background: #eee;
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
