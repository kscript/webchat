<template>
  <div class="post">
    <el-tabs class="page-tab" v-model="activePageName" @tab-click="handlePageClick">
      <el-tab-pane name="publishWeibo">
        <span slot="label"> 发布微博</span>
        <div class="post-box">
          <el-row>
            <el-col :span="12">
              <div class="box post-sub">
                <div class="hd">
                  <div class="title clear">
                    发布微博 <i class="iconfont icon-doubt right"></i>
                  </div>
                </div>
                <div class="bd">
                  <div class="note-text clear"><em>有什么新鲜事想告诉大家</em><span class="notice right">可以发布超过<span class="light">140</span>字微博啦</span></div>
                  <v-editor :emotions="emotions"></v-editor>
                </div>
              </div>
              <div class="box post-sub">
                <div class="bd">
                  <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                    <el-tab-pane name="published">
                      <span slot="label"> 已发布微博</span>
                    </el-tab-pane>
                    <el-tab-pane name="unpublish">
                      <span slot="label"> 待发布微博</span>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="massMessage">
        <span slot="label"> 客服群发</span>
        <el-row>
          <el-col :span="12">
            <div class="post-box">
              <div class="box send-letter post-sub">
                <div class="hd">
                  <div class="title clear">
                    发送私信 <i class="iconfont icon-doubt right"></i>
                  </div>
                </div>
                <div class="bd">
                  <el-input v-model="letter.text" type="textarea" class="textarea" resize="none" :rows="2"></el-input>
                  <div class="select-handler">
                    <el-row :gutter="5">
                      <el-col :span="4">
                        <el-select v-model="letter.status.selected" size="mini" :placeholder="letter.status.empty">
                          <el-option :value="vo.value" :key="vo.value" :label="vo.label" v-for="vo in letter.status.list" :disabled="vo.disabled === undefined ? false : true"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="letter.status.selected" size="mini" :placeholder="letter.status.empty">
                          <el-option :value="vo.value" :key="vo.value" :label="vo.label" v-for="vo in letter.status.list" :disabled="vo.disabled === undefined ? false : true"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="letter.status.selected" size="mini" :placeholder="letter.status.empty">
                          <el-option :value="vo.value" :key="vo.value" :label="vo.label" v-for="vo in letter.status.list" :disabled="vo.disabled === undefined ? false : true"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="12" class="text-right">
                        <el-button size="mini">发布</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="box post-sub">
                <div class="info-content">
                  <el-table empty-text=" " :data="accounts">
                    <el-table-column prop="text" label="发送内容">
                    </el-table-column>
                    <el-table-column prop="num" label="发送人数">
                    </el-table-column>
                    <el-table-column prop="created_at" label="发放时间">
                    </el-table-column>
                    <el-table-column prop="sender_id" label="发送人">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import editor from '../../common/editor.vue'
export default {
  data () {
    return {
      activePageName: 'publishWeibo',
      activeTabName: 'published',
      accounts: [
        {
          text: '客服群发测试',
          num: 20,
          sender_id: 1,
          status: 1,
          created_at: '2018-04-21'
        }
      ],
      letter: {
        text: '',
        status: {
          selected: '',
          empty: '处理状态',
          list: [
            {
              value: 0,
              disabled: true,
              label: '处理状态'
            },
            {
              value: 1,
              label: '未处理'
            },
            {
              value: 2,
              label: '已处理'
            }
          ]
        }
      },
      emotions: {
      }
    }
  },
  components: {
    'v-editor': editor
  },
  methods: {
    handlePageClick () {

    },
    handleTabClick () {

    },
    getEmotions () {
      let self = this
      self.$axios({
        url: 'v1/emotions',
        method: 'GET',
        data: {
          category: '默认'
        }
      }).then(response => {
        self.emotions['default'] = {
          label: '默认',
          list: response.data.result
        }
      })
    },
    init () {
      this.getEmotions()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss">
.post{
  .page-tab{
    padding: 10px 20px;
  }
}
.post-box{
  padding: 10px 0;
  .post-sub {
    padding: 8px;
    margin-bottom: 20px;
    background-color: #fff;
    .hd {
      padding: 5px 10px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #555;
    }
    .bd {
      .note-text {
        font-size: 14px;
        line-height: 24px;
        padding: 0 5px 1px;
        em{
          color: #76a513 * 1.2;
        }
        .notice{
          .light{
            font-size: 20px;
            color: #ffc007;
            padding: 0 5px 0 3px;
            font-style: italic;
            font-family: sans-serif;
          }
        }
      }
      .select-handler{
        padding: 16px 0px 8px;
      }
    }
  }
  .info-content{
    padding: 10px 10px;
    .el-table{
      font-size: 12px;
      text-align: center;
      .el-table__header{
        th{
          text-align: center;
          background-color: #f3f3f3;
        }
      }
      .handler-link{
        color: #6bbc64;
        padding: 0px 3px;
        cursor: pointer;
      }
    }
  }
}
</style>
