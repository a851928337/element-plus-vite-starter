<template>
  <div class="table-container flex flex-col mt-10">
    <div class="flex-1">
      <el-table class="flex-1" :data="tableData" style="width: 100%">
        <slot />
      </el-table>
    </div>
    <div class="pagination flex items-center justify-end mt-10">
      <el-pagination v-model:current-page="props.currentPage" v-model:page-size="props.pageSize"
        :background="props.background" layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  tableData: any[]
  currentPage?: number
  pageSize?: number
  background?: boolean
}>()
</script>
