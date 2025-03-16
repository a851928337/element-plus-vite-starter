<template>
  <div class="flex items-center">
    <el-input v-model="modelValue" :style="{ width, height }" :placeholder="placeholder">
      <template #prefix>
        <el-icon class="el-input__icon">
          <search />
        </el-icon>
      </template>
    </el-input>
    <el-button v-if="showButton" :style="{ padding: '0 15px', height }" type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const modelValue = defineModel<string>('modelValue')
const props = defineProps<{
  width?: string | number
  height?: string | number
  placeholder?: string
  showButton?: boolean
}>()
const width = computed(() => props.width || '240px')
const height = computed(() => props.height)
const placeholder = computed(() => props.placeholder || '输入搜索关键词')
function handleSearch() {
  console.log(modelValue.value)
}
</script>
<style lang="scss" scoped>
.search-input {
  width: 240px;
  height: 40px;
}
</style>
