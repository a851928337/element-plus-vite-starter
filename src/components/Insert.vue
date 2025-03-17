<template>
  <div class="insert-container">
    <div class="insert-list">
      <div class="insert-item" v-for="item in props.list" :key="item.value" draggable="true"
        @dragstart="handleDragStart($event, item)">
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
const emit = defineEmits<{
  (e: 'afterInsert', item: TItem, style: typeof VARIABLE_STYLES): void
}>()
const props = withDefaults(defineProps<{
  list: TItem[]
  target: string
  autoInsert?: boolean
}>(), {
  autoInsert: true
})

const draggedItem = ref<TItem | null>(null)

// 定义变量样式常量
const VARIABLE_STYLES = {
  color: '#ff0000',
  'background-color': '#ffe6e6',
  padding: '0 2px',
  'border-radius': '3px'
} as const

// 处理拖拽开始
const handleDragStart = (e: DragEvent, item: TItem) => {
  draggedItem.value = item
}

// 检查目标元素和位置是否有效
const getValidPosition = (e: DragEvent) => {
  const target = document.querySelector(props.target)
  if (!target || !e.clientX || !e.clientY) return null

  // 检查拖拽位置是否在目标元素内
  const rect = target.getBoundingClientRect()
  if (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  ) return null

  const position = document.caretPositionFromPoint(e.clientX, e.clientY)
  if (!position) return null

  // 检查位置节点是否属于目标元素
  let currentNode: Node | null = position.offsetNode
  while (currentNode && currentNode !== target) {
    currentNode = currentNode.parentNode
  }
  if (!currentNode) return null

  const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY)
  if (elementAtPoint?.classList.contains('variable-span')) return null

  return position
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()

  const position = getValidPosition(e)
  if (!position) return

  // 设置光标位置
  const range = document.createRange()
  range.setStart(position.offsetNode, position.offset)
  range.collapse(true)

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  if (!draggedItem.value) return

  const position = getValidPosition(e)
  if (!position) return

  const range = document.createRange()
  range.setStart(position.offsetNode, position.offset)
  range.collapse(true)

  insertVariableSpan(range, draggedItem.value)
  draggedItem.value = null
}

const insertVariableSpan = (range: Range, item: TItem) => {
  const span = document.createElement('span')
  span.textContent = `#{${item.value}}`
  span.className = 'variable-span'
  // 应用样式
  Object.assign(span.style, VARIABLE_STYLES)
  if (props.autoInsert) {
    range.insertNode(span)
  }
  emit('afterInsert', item, VARIABLE_STYLES)
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
