<template>
  <div class="flex items-center">
    <el-input v-model="modelValue" style="width: 240px; height: 40px;" placeholder="输入搜索关键词">
      <template #prefix>
        <el-icon class="el-input__icon">
        <search />
      </el-icon>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
const modelValue = defineModel<string>('modelValue')
</script>
<style lang="scss" scoped>
.search-input {
  width: 240px;
  height: 40px;
}
</style>
