<template>
  <div class="editor">
    <div class="editor-context rel">
      <el-popover
        popper-class="emoji-list no-outline"
        ref="emotions-popover"
        placement="top-start"
        title=""
        width="350"
        trigger="click">
        <template slot-scope="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="vo.label" :name="key" v-for="(vo,key) in emotions" :key="key">
              <template slot="label">
                {{vo.label}}
              </template>
              <div class="emoji-box">
                <el-row type="flex" class="wrap">
                  <el-col class="emoji" :span="2" v-for="(emoji,index) in vo.list" :key="index">
                    <img :alt="emoji.value" :title="emoji.value" :src="emoji.icon" @click="selectEmoji(emoji)">
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-popover>
      <div class="el-textarea">
        <quill-editor class="quill-editor"
          v-model="content"
          ref="newEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
        <!-- <div class="meditor el-textarea__inner editor-text scroll" contenteditable="true" @keyup="keyup" v-html="editorHtml"></div> -->
      </div>
      <div class="editor-icon">
        <span class="iconfont icon-smile" v-popover:emotions-popover></span>
        <span class="iconfont icon-pictrue"></span>
        <el-button class="right" size="mini" type="success" @click="sendMessage">发私信</el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      activeName: 'default',
      editorText: '',
      editorHtml: '',
      content: '',
      editorOption: {
        theme: 'snow',
        placeholder: '请填写简介',
        history: {
          delay: 100,
          maxStack: 100,
          userOnly: false
        },
        strict: false,
        modules: {
          toolbar: [
            [
              {
                'color': []
              },
              {
                'background': []
              },
              'link',
              'image'
            ]
          ]
        }
      },
      selectionEnd: 0
    }
  },
  components: {quillEditor},
  props: {
    emotions: Object,
    conf: Object
  },
  methods: {
    onEditorBlur () {

    },
    onEditorFocus () {

    },
    onEditorChange () {

    },
    parse () {

    },
    sendMessage (text) {
      this.$emit('sendMessage', text)
    },
    keyup ($event) {
      let self = this
      if ($event.ctrlKey && $event.key === 'Enter' && self.editorText !== '') {
        self.sendMessage(self.editorText)
      }
    },
    inputClick ($event) {
      this.selectionEnd = $event.target.selectionEnd || 0
    },
    selectEmoji (emoji) {
      this.editorText = this.editorText.slice(0, this.selectionEnd) + emoji.value + this.editorText.slice(this.selectionEnd)
    },
    handleClick () {
    }
  },
  created () {
    console.log(this)
  },
  mounted () {
    console.log([Quill])
  }
}
</script>
<style lang="scss">
$height: 96px;

.editor{
  padding: 8px;
  .editor-context{
    padding: (106 - $height)/2;
    height: $height;
    .editor-text{
      width: 100%;
      height: $height;
      outline: none;
      resize: none;
    }
    .editor-icon{
      padding: 5px;
      margin-top: 3px;
      .iconfont{
        padding: 0px 3px;
        font-size: 16px;
        color: #999;
        cursor: pointer;
      }
    }
  }
}
.emoji-list .el-tabs__content{
    min-height: 240px;
}
.emoji-box{
  margin: 0 auto 10px;
  border-bottom: 1px solid #eeeac9;
  border-right: 1px solid #eeeac9;

  .emoji{
    max-width: (100/12) + %;
    min-width: (100/12) + %;
    padding: 3px 0;
    line-height: 11px;
    text-align: center;
    background: #fffce4;
    border-top: 1px solid #eeeac9;
    border-left: 1px solid #eeeac9;
    &:active{
      background-color: #f1edd0;
    }
    img{
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
</style>
