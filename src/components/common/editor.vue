<template>
  <div class="meditor">
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
            <el-tab-pane :label="vo.label" :name="key" v-for="(vo,key) in datas.emotions" v-if="datas.emotions" :key="key">
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
      <el-popover
        popper-class="video-list no-outline"
        ref="image-popover"
        placement="top"
        title=""
        width="320"
        trigger="click">
        <template slot-scope="content">
          <el-tabs>
            <el-tab-pane>
              <template slot="label">本地图片</template>
              <el-upload
                class="upload-demo"
                action=""
                accept="image/*"
                :show-file-list="false"
                :auto-upload="false"
                :limit="1"
                :file-list="fileList"
                :on-change="uploadChange"
                :on-exceed="uploadExceed">
                <el-button size="mini">上传</el-button>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane>
              <template slot="label">网络图片</template>
              <el-row>
                <el-col :span="3" style="min-width: 40px; line-height: 28px;">url:</el-col>
                <el-col :span="16">
                  <el-input size="mini" v-model="imageUrl"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini" style="margin-left: 10px;" @click="addImage">确定</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-popover>
      <el-popover
        popper-class="video-list no-outline"
        ref="video-popover"
        placement="top"
        title=""
        width="320"
        trigger="click">
        <template slot-scope="content">
          <el-row>
            <el-col :span="3" style="min-width: 40px; line-height: 28px;">url:</el-col>
            <el-col :span="16">
              <el-input size="mini" v-model="videoUrl"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" style="margin-left: 10px;" @click="addVideo">确定</el-button>
            </el-col>
          </el-row>
        </template>
      </el-popover>
      <el-popover
        popper-class="video-list no-outline"
        ref="time-popover"
        placement="top"
        title=""
        width="360"
        trigger="click"
        @show="timerShow">
        <template slot-scope="content">
          <el-row :gutter="5">
            <el-col :span="9">
              <el-date-picker
                v-model="pdate"
                type="date"
                placeholder="选择日期" size="mini">
              </el-date-picker>
            </el-col>
            <el-col :span="9">
              <el-time-picker
                v-model="ptime"
                align="center"
                placeholder="选择时间" size="mini">
              </el-time-picker>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" style="margin-left: 10px;" @click="addVideo">确定</el-button>
            </el-col>
          </el-row>
        </template>
      </el-popover>
      <el-dialog
        title="查看原图"
        class="bg-hyaline is-fullscreen"
        width="100%"
        top="0"
        :visible.sync="prviewVisible"
        append-to-body
        center>
        <div class="text-center">
          <!-- <h4>查看原图</h4> -->
          <img :src="prviewSrc" alt="" class="prview">
        </div>
      </el-dialog>
      <div class="el-textarea">
        <div class="meditor-el el-textarea__inner editor-text scroll"
          contenteditable="true"
          ref="meditor"
          :style="'overflow-y: auto; height: ' + editor.height + 'px'"
          @click="inputClick"
          @drop="inputDrop">
        </div>
        <div class="editor-icon">
            <span class="iconfont icon-smile" v-if="modules.emotions" v-popover:emotions-popover>{{modules.emotions.label}}</span>
            <span class="iconfont icon-pictrue" v-if="modules.image" v-popover:image-popover>{{modules.image.label}}</span>
            <span class="iconfont icon-video" v-if="modules.video" v-popover:video-popover>{{modules.video.label}}</span>
            <span class="iconfont icon-time" v-if="modules.time" v-popover:time-popover>{{modules.time.label}}</span>
            <el-button class="right" size="mini" type="success" @click="sendMessage">发私信</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'default',
      selectionEnd: 0,
      range: null,
      tempIndex: 0,
      filemap: {},
      videoUrl: '',
      imageUrl: '',
      pdate: '',
      ptime: '',
      prviewVisible: false,
      prviewSrc: '',
      fileList: []
    }
  },
  props: {
    options: Object,
    datas: Object
  },
  computed: {
    modules () {
      // return Object.assign({
      //   video: {
      //     label: '视频'
      //   },
      //   image: {
      //     label: '图片'
      //   },
      //   emotions: {
      //     label: '表情'
      //   },
      //   time: {
      //     label: '定时发'
      //   }
      // }, (this.options || {}).modules || {})
      return (this.options || {}).modules || {}
    },
    editor () {
      return Object.assign({
        ref: 'meditor', // 编辑器容器
        text: '',
        html: '',
        height: 120,
        range: null,
        selection: null
      }, {})
    }
  },
  methods: {
    // 图片上传相关
    uploadChange (file, fileList) {
      let type = ['delete', 'change', 'add'][fileList.length - this.fileList.length + 1]
      if (type === 'add') {
        this.tempIndex++
        this.insertImg(fileList[fileList.length - 1])
      }
      this.fileList = fileList
    },
    uploadExceed (file) {
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
    insertImg (file, type) {
      type = type || 'blob'
      let self = this
      let pic = new Image()
      pic.src = file.url
      pic.className = 'pic ' + type + '-pic ' + type + '-' + file.uid
      pic.alt = file.name || ''
      self.filemap[file.uid] = file
      pic.onload = () => {
        self.insertContent(pic)
      }
      pic.onclick = () => {
        self.prviewSrc = pic.src
        self.prviewVisible = true
      }
      pic.onerror = err => {
        self.$message.error('图片加载出错')
        throw ('图片加载出错', err)
      }
      self.$refs['image-popover'].showPopper = false
    },
    timerShow () {
      // this.pdate = ''
      // this.ptime = ''
    },
    // 提交消息
    sendMessage (text) {
      this.$emit('sendMessage', text || this.getContent())
    },
    getContent (el) {
      let self = this
      return extr(el || self.editor.el)
      function extr (ele) {
        let list = []
        let block
        let content // 递归item获取到的内容
        let nodes = Array.prototype.slice.apply(ele.childNodes)
        nodes.forEach((item) => {
          if (item.nodeType === 1) { // 元素节点
            if (item.tagName === 'IMG') {
              list.push('![' + (item.alt || 'img') + '](' + item.src + ')')
            } else if (item.tagName === 'A') {
              list.push('![' + (extr(item) || item.href) + '](' + item.href + ')')
            } else if (item.tagName === 'VIDEO') {
              list.push('![' + (item.title || 'video') + '](' + item.src + ')')
            } else {
              block = self.getStyle(item, 'display') === 'block' || item.tagName === 'BR' // 是否要换行
              content = extr(item)
              list.push(content + (nodes.length > 1 && block ? '\n' : ''))
            }
          } else if (item.nodeType === 3) { // 文本节点
            list.push(item.textContent)
          }
        })
        return list.join('').replace(/\n$/, '')
      }
    },
    getStyle (el, attr) {
      let styles = el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)
      return attr ? styles[attr] : styles
    },
    clearStyle (el) {
      let self = this
      el.childNodes && Array.prototype.slice.apply(el.childNodes).forEach((item) => {
        if (item.nodeType === 1) {
          if (!/^(img|a|div|p|label|span|small|br|hr|h[1-6]|ol|ul|li|dl|dt|dd|i|em|video)$/i.test(item.tagName)) {
            (item.parentElement || item.parentNode).removeChild(item)
          }
          item.removeAttribute('style')
          item.removeAttribute('class')
          item.removeAttribute('id')
          self.clearStyle(item)
        }
      })
    },
    addVideo () {
      let self = this
      if (self.videoUrl) {
        if (!self.$RegX.url(self.videoUrl)) {
          self.$message.error('视频地址有误')
          return
        }
        let file = {
          controls: true,
          autoplay: false,
          src: self.videoUrl
        }
        let el = document.createElement('div')
        let span = document.createElement('span')
        let video = document.createElement('video')
        span.innerHTML = '&nbsp;'
        el.appendChild(video)
        el.appendChild(span)
        video.controls = file.controls || false
        video.autoplay = file.autoplay || false
        video.src = file.src
        self.$refs['video-popover'].showPopper = false
        self.videoUrl = ''
        self.insertContent(el)
      }
    },
    addImage () {
      let self = this
      if (self.imageUrl) {
        if (!self.$RegX.url(self.imageUrl)) {
          self.$message.error('图片地址有误')
          return
        }
        self.insertImg({
          url: self.imageUrl,
          alt: '',
          uid: Date.now() + this.tempIndex++
        }, 'web')
        self.imageUrl = ''
        self.$refs['image-popover'].showPopper = false
      }
    },
    keyup ($event) {
      let self = this
      if ($event.ctrlKey && $event.key === 'Enter' && self.editor.text !== '') {
        self.sendMessage(self.editor.text)
        self.editor.text = ''
      }
    },
    inputClick ($event) {
      let selection = window.getSelection ? window.getSelection() : document.selection
      if (!selection.rangeCount){
        return
      }
      this.editor.range = selection.createRange ? selection.createRange() : selection.getRangeAt(0)
      if ($event && /^IMG$/.test($event.target.tagName)) {
      }
    },
    inputDrop () {
      this.$nextTick(() => {
        this.clearStyle(this.editor.el)
      })
    },
    insertContent (str) {
      let self = this
      let range = self.editor.range
      let selection
      let hasR
      let hasRLastChild
      let e

      if (!window.getSelection) {
        range.pasteHTML(str)
        range.collapse(false)
        range.select()
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection
        range.collapse(false)
        hasR = typeof str === 'string' ? range.createContextualFragment(str) : str
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
        selection.empty()
      }
    },
    selectEmoji (emoji) {
      this.insertContent(emoji.value)
      this.$refs['emotions-popover'].showPopper = false
    },
    handleClick () {
    },
    init () {
      let self = this
      self.$nextTick(() => {
        self.editor.el = self.$refs['meditor']
        self.$refs['meditor'].focus()
        self.inputClick()
        self.$refs['meditor'].blur()
      })
    }
  },
  created () {
    window.editor = this
    this.init()
  }
}
</script>
<style lang="scss">
$height: 96px;
.bg-hyaline{
  background: none;
  .el-dialog{
    height: 100%;
    margin: 0;
    background: none;
    pointer-events: none;
  }
  .el-dialog__body{
    pointer-events: none;
  }

  .el-dialog__body{
    text-align: center;
    padding: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    .text-center{
      display: flex;
      align-items: center;
    }
  }
  .el-dialog__header{
    display: none;
  }
  .prview{
    pointer-events: auto;
  }

}
.meditor{
  .editor-context{
    padding: (106 - $height)/2;

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
        font-size: 12px;
        color: #999;
        cursor: pointer;
        &:before{
          padding-right: 3px;
          font-size: 16px;
          vertical-align: middle;
        }
      }
    }
  }
  .pic{
    max-width: 500px;
    cursor: zoom-in;
    border: 1px solid #fefefe;
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
