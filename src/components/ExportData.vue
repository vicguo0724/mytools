<template>
  <el-row>
    <h1 style="margin: auto; margin-top: 5px; margin-bottom: 5px">数据导出</h1>
    <el-input
      v-model="textarea"
      :rows="2"
      type="textarea"
      placeholder="Please input"
      @input="handlerTextareaChange"
    />
    <el-table :data="data" style="width: 100%">
      <el-table-column v-for="(header, key) in headers" :label="header">
        <template #default="scope">
          {{ scope.row[key] }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="pageNo"
      :page-sizes="[5, 10, 30, 50]"
      v-model:page-size="pageSize"
      v-model:total="totalCount"
      layout="total, sizes, prev, pager, next, jumper, slot"
    >
      <el-button v-on:click="exportData">导出数据</el-button>
    </el-pagination>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import { ExportExcel } from "../tools/ExportExcel,js";
const textarea = ref("");

const pageNo = ref(1); // 默认当前是第一页
const pageSize = ref(5); // 当前每页的数据是5条
const totalCount = ref(0); // 总数默认为0
const allData = ref([]);
const headers = ref([]);
const data = ref([]);
function reloadTable() {
  let start = (pageNo.value - 1) * pageSize.value;
  let end = pageNo.value * pageSize.value;
  data.value = allData.value.slice(start, end);
  // console.log(tableData)
}
function handleCurrentChange(val) {
  // pageNo = val
  reloadTable();
  console.log(val, pageNo);
}
function handleSizeChange(val) {
  // pageSize = val
  reloadTable();
  console.log(val, pageSize);
}

function handleTextareaChange() {
  // console.log(tableData)
  totalCount.value = allData.value.length;
  reloadTable();
}
handleTextareaChange();
function exportData() {
  let excelData = [headers.value, ...allData.value];
  ExportExcel(excelData, "123.xlsx");
}
function handlerTextareaChange() {
  let obj = JSON.parse(textarea.value);
  console.log(obj);
  if ("data" in obj && "headers" in obj) {
    headers.value = obj.headers;
    allData.value = obj.data;
    totalCount.value = allData.value.length;
    reloadTable();
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
