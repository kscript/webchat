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
        <div class="meditor-el el-textarea__inner editor-text scroll"
          contenteditable="true"
          ref="meditor1"
          v-html="editor.html"
          :style="'overflow-y: auto; height: ' + editor.height + 'px'"
          @blur="inputBlur"
          @click="inputClick">
        </div>
      </div>

      <div class="editor-icon">
        <span class="iconfont icon-smile" v-popover:emotions-popover></span>
        <el-upload
        class="upload-demo"
        action=""
        accept="image/*"
        :show-file-list="false"
        :auto-upload="false"
        :limit="1"
        :file-list="fileList"
        :on-remove="uploadRemove"
        :on-change="uploadChange"
        :on-exceed="uploadExceed">
        <span class="iconfont icon-pictrue"></span>
        </el-upload>
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
      editor: {
        ref: 'meditor1',
        el: null,
        text: '',
        html: '',
        height: 160,
        range: null,
        selection: null
      },
      selectionEnd: 0,
      range: null,
      tempIndex: 0,
      fileList: []
    }
  },
  props: {
    emotions: Object,
    conf: Object
  },
  methods: {
    // 图片上传相关
    uploadRemove () {
    },
    uploadChange (file, fileList) {
      let type = ['delete', 'change', 'add'][fileList.length - this.fileList.length + 1]
      if (type === 'add') {
        this.tempIndex++
        this.insertImg(fileList[fileList.length - 1])
      }
      this.fileList = fileList
    },
    uploadExceed (file, fileList) {
      let rawFile = this.createUrl(file[0])
      if (rawFile) {
        this.fileList.shift()
        this.fileList.push(rawFile)
        this.insertImg(rawFile)
      }
    },
    createUrl (file) {
      let rawFile = {
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: Date.now() + this.tempIndex++,
        raw: file
      }
      try {
        rawFile.url = URL.createObjectURL(file)
      } catch (err) {
        console.error(err)
        return
      }
      return rawFile
    },
    insertImg (file) {
      let pic = new Image()
      pic.src = file.url
      this.insertContent('<img src="' + file.url + '" class="blob-pic blob-' + file.uid + '" alt="' + file.name + '">')
    },
    // 提交
    sendMessage (text) {
      this.$emit('sendMessage', text)
    },
    keyup ($event) {
      let self = this
      if ($event.ctrlKey && $event.key === 'Enter' && self.editor.text !== '') {
        self.sendMessage(self.editor.text)
        self.editor.text = ''
      }
    },
    // 鼠标光标
    inputBlur ($event) {
      this.selectionEnd = $event.target.selectionEnd || 0
    },
    inputClick ($event) {
      let selection
      // 记录editor容器
      if (this.editor.el === null) {
        this.editor.el = $event.target
      }
      // 获取选择区域
      selection = window.getSelection ? window.getSelection() : document.selection
      if (!selection.rangeCount) return
      this.range = selection.createRange ? selection.createRange() : selection.getRangeAt(0)
    },
    insertContent (str) {
      let self = this
      let range = self.range
      let selection
      let hasR
      let hasRLastChild
      let e
      if (!range) {
        self.editor.ref
      }
      if (!window.getSelection) {
        range.pasteHTML(str)
        range.collapse(false)
        range.select()
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection
        range.collapse(false)
        hasR = range.createContextualFragment(str)
        hasRLastChild = hasR.lastChild
        while (hasRLastChild && hasRLastChild.nodeName.toLowerCase() === 'br' && hasRLastChild.previousSibling && hasRLastChild.previousSibling.nodeName.toLowerCase() === 'br') {
          e = hasRLastChild
          hasRLastChild = hasRLastChild.previousSibling
          hasR.removeChild(e)
        }
        range.insertNode(hasR)
        if (hasRLastChild) {
          range.setEndAfter(hasRLastChild)
          range.setStartAfter(hasRLastChild)
        }
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    selectEmoji (emoji) {
      // this.editor.text = this.editor.text.slice(0, this.selectionEnd) + emoji.value + this.editor.text.slice(this.selectionEnd)
      this.insertContent(emoji.value)
      this.$refs['emotions-popover'].showPopper = false
    },
    handleClick () {
    }
  },
  created () {
    console.log(this)
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
  .upload-demo{
    display: inline;
    .el-upload-list{
      display: none;
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
