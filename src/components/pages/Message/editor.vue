<template>
  <div class="editor">
    <div class="editor-context rel">
      <el-popover
        popper-class="no-outline"
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
                    <img :alt="emoji.value" :src="emoji.icon" @click="selectEmoji(emoji)">
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-popover>
      <div class="el-textarea">
        <textarea class="el-textarea__inner editor-text scroll" v-model="editorText" @click="inputClick" @keyup="keyup"></textarea>
      </div>
      <!-- <el-input type="textarea" v-model="editorText" :tabindex="tabindex" @click="inputClick" @select="inputSelect"></el-input> -->
      <div class="editor-icon">
        <span class="icon" v-popover:emotions-popover>😊</span><span class="icon el-icon-picture-outline"></span>
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
      selectionEnd: 0
    }
  },
  props: {
    emotions: Object
  },
  methods: {
    sendMessage () {
      console.log(this)
    },
    keyup ($event) {
      console.log($event)
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
  }
}
</script>
<style lang="scss">
$height: 96px;
.editor{
  padding: 8px;
}
.editor .editor-context{
  padding: (106 - $height)/2;
  height: $height;
}
.editor .editor-context .editor-text{
  width: 100%;
  height: $height;
  outline: none;
  resize: none;
}
.editor-icon{
  font-size: 20px;
  padding: 5px;
  margin-top: 3px;
}
.editor-icon .icon{
  cursor: pointer;
  color: #999;
  padding: 0px 5px;
}
.emoji-box{
  padding-bottom: 10px;
}
.emoji-box .emoji{
  text-align: center;
  max-width: (100/12) + %;
  min-width: (100/12) + %;
  line-height: 11px;
  padding: 3px 0;
}
.emoji-box .emoji:active{
  background-color: #eee;
}
.emoji-box .emoji img{
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>
