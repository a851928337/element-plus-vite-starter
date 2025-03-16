<template>
  <div class="insert-container">
    <div class="insert-list">
      <div
        class="insert-item"
        v-for="item in props.list"
        :key="item.value"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';

type TItem = {
  label: string
  value: string
}

const props = defineProps<{
  list: TItem[]
  target: string
}>()

const draggedItem = ref<TItem | null>(null)

// 处理拖拽开始
const handleDragStart = (e: DragEvent, item: TItem) => {
  draggedItem.value = item
}

// 处理拖拽结束
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  if (!draggedItem.value) return

  const target = document.querySelector(props.target)
  if (!target || !e.clientX || !e.clientY) return

  const range = document.caretRangeFromPoint(e.clientX, e.clientY)
  if (!range) return

  const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY)
  if (elementAtPoint?.classList.contains('variable-span')) return

  insertVariableSpan(range, draggedItem.value)
  draggedItem.value = null
}

// 处理拖拽过程中
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

// 插入变量span的工具函数
const insertVariableSpan = (range: Range, item: TItem) => {
  const span = document.createElement('span')
  span.textContent = `#{${item.value}}`
  span.style.color = 'red'
  span.className = 'variable-span'
  range.insertNode(span)
}

// 事件监听管理
onMounted(() => {
  document.addEventListener('dragover', handleDragOver)
  document.addEventListener('drop', handleDrop)
})

onUnmounted(() => {
  document.removeEventListener('dragover', handleDragOver)
  document.removeEventListener('drop', handleDrop)
})
</script>
<style scoped lang="scss">
.insert-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;

  .insert-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    .insert-item {
      cursor: grab;
      width: 100%;
      height: 100%;
      background-color: rgb(0, 154, 0);
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      color: #fff;

      &:active {
        cursor: grabbing;
      }
    }
  }
}
</style>
