

<template>
  <el-row fill="true" style="text-align: center;">
    <h1 style="margin: auto; margin-top: 5px;margin-bottom: 5px;">数据导出</h1>
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
    
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
const textarea = ref('')
const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
