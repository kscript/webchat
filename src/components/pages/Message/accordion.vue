<template>
  <div class="accordion">
    <el-collapse v-model="v2.activeName" accordion v-for="(v3,i3) in v2.list" v-if="v2.list" :key="i3">
      <el-collapse-item :title="v3.label">
        <div v-for="(v4,i4) in v3.list" v-if="v3.list" :key="i4">
          {{v4.text}}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
