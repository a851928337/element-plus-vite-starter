<script setup lang="ts">
import type { IDomEditor } from '@wangeditor/editor'
import { createEditor, createToolbar, SlateNode, Toolbar } from '@wangeditor/editor'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useEditorStore from './store'
import '@wangeditor/editor/dist/css/style.css'
// 引入 css
const props = defineProps<{
  placeholder?: string
  menuWidth?: string
}>()
const isInit = ref(false)
const editorStore = useEditorStore()
// const toolbarRef = ref<Toolbar>()
const editorRef = computed(() => editorStore.editorRef)
const headerContainer = ref<HTMLElement>()
const modelValue = defineModel<string>('modelValue')
const editorConfig = {
  placeholder: props.placeholder || '请输入内容...',
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    modelValue.value = html
    const headers = editor.getElemsByTypePrefix('header')
    headerContainer.value?.setHTMLUnsafe(`<ul>${headers.map((header) => {
      const text = SlateNode.string(header)
      const { id, type } = header as any
      return `<li id="${id}" class="${type}">${text}</li>`
    }).join('')}</ul>`)
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorStore.clearRef()
})

onMounted(() => {
  isInit.value = true
})
watch(isInit, (val) => {
  if (val) {
    nextTick(() => {
      const editor = createEditor({
        selector: '#editor-container',
        html: modelValue.value,
        config: editorConfig,
        mode: 'simple', // or 'simple'
      })
      editorStore.setRef(editor)
    })
  }
})
watch(modelValue, (val) => {
  editorRef.value?.setHtml(val || '')
})

// 获取标题层级
function getCurrentLevel(element: HTMLElement) {
  const classList = element.classList
  for (const cls of Array.from(classList)) {
    if (cls.startsWith('header')) {
      return Number.parseInt(cls.replace('header', ''))
    }
  }
  return 0
}

// 获取下一个同级或更高级的标题
function getNextRelevantHeader(currentElement: HTMLElement) {
  const currentLevel = getCurrentLevel(currentElement)
  let nextElement = currentElement.nextElementSibling as HTMLElement | null

  while (nextElement) {
    const nextLevel = getCurrentLevel(nextElement)
    if (nextLevel > 0 && nextLevel <= currentLevel)
      return nextElement
    nextElement = nextElement.nextElementSibling as HTMLElement | null
  }
  return null
}

// 高亮样式配置
const highlightConfig = {
  position: 'absolute',
  left: '-10px',
  right: '-10px',
  pointerEvents: 'none' as const,
  zIndex: '1',
  padding: '10px',
  animationDuration: '4000ms',
  classes: ['highlight-section', 'blink-highlight'],
}

// 创建高亮效果
function createHighlight(currentHeader: Element, nextHeader: Element | null) {
  document.querySelectorAll('.highlight-section').forEach((el) => {
    el.classList.remove('highlight-section')
  })

  const highlightDiv = document.createElement('div')
  highlightDiv.classList.add(...highlightConfig.classes)
  Object.assign(highlightDiv.style, {
    position: highlightConfig.position,
    left: highlightConfig.left,
    right: highlightConfig.right,
    pointerEvents: highlightConfig.pointerEvents,
    zIndex: highlightConfig.zIndex,
  })

  const startRect = currentHeader.getBoundingClientRect()
  const endElement = nextHeader
    ? nextHeader.previousElementSibling || currentHeader
    : currentHeader.parentElement?.lastElementChild || currentHeader
  const endRect = endElement?.getBoundingClientRect()

  if (endRect && currentHeader.parentElement) {
    const containerRect = currentHeader.parentElement.getBoundingClientRect()
    Object.assign(highlightDiv.style, {
      top: `${startRect.top - containerRect.top - 10}px`,
      height: `${endRect.bottom - startRect.top + 20}px`,
    })

    const container = currentHeader.parentElement
    if (container.style.position !== 'relative')
      container.style.position = 'relative'
    container.prepend(highlightDiv)
    setTimeout(() => {
      highlightDiv.remove()
    }, Number.parseInt(highlightConfig.animationDuration))
  }
}

// 处理标题点击事件
function handleHeaderClick(event: MouseEvent) {
  if ((event.target as HTMLElement)?.tagName !== 'LI')
    return
  event.preventDefault()
  const id = (event.target as HTMLElement).id

  const currentHeader = document.querySelector(`#editor-container .w-e-scroll #${id}`)
  if (!currentHeader)
    return

  const nextHeaderId = getNextRelevantHeader(event.target as HTMLElement)?.id
  const nextHeader = nextHeaderId
    ? document.querySelector(`#editor-container .w-e-scroll #${nextHeaderId}`)
    : null

  createHighlight(currentHeader, nextHeader)

  currentHeader.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}

// watch 部分
watch([headerContainer, editorRef], ([val]) => {
  val?.addEventListener('mousedown', handleHeaderClick)
})
</script>

<template>
  <div class="wang-editor flex">
    <div
      id="header-container" :style="{ width: props.menuWidth || '240px' }"
      class="header-container"
    >
      <div class="header">
        文档目录
      </div>
      <div ref="headerContainer" class="content" />
    </div>
    <div v-if="isInit" class="editor-container">
      <div class="header">
        <div class="title">
          松莉美容科技（上海）有限公司
        </div>
        <div class="date">
          <el-icon><Clock /></el-icon>更新时间：2025-01-20 11:42:44
        </div>
      </div>
      <div id="editor-container" class="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wang-editor {
  width: 100%;
  height: 100%;
  .header-container,
  .editor-container {
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }

  .header-container {
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    .header {
      padding: 10px 20px;
      background-color: #f8f8f8;
      border-bottom: 1px solid #e5e5e5;
      font-weight: bold;
    }
    .content {
      ::v-deep(ul) {
        list-style-type: none;
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;

        li {
          width: 100%;
          color: #333;
          margin: 10px 0;
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          &.header1 {
            font-size: 20px;
            font-weight: bold;
          }

          &.header2 {
            font-size: 16px;
            padding-left: 15px;
            font-weight: bold;
          }

          &.header3 {
            font-size: 14px;
            padding-left: 30px;
          }

          &.header4 {
            font-size: 12px;
            padding-left: 45px;
          }

          &.header5 {
            font-size: 12px;
            padding-left: 60px;
          }
        }
      }
    }
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e5e5;
    flex: 1;
    .header {
      padding: 20px 60px;
      border-bottom: 1px solid #e5e5e5;
      .title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
      }
      .date {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999;
      }
    }
    .content {
      padding: 20px 50px;
      flex: 1;
      overflow-y: auto;

      :deep(.highlight-section) {
        &.blink-highlight {
          animation: blink-animation 1s ease-in-out 4;
        }
      }
    }
  }
}

@keyframes blink-animation {
  0% {
    background-color: rgba(255, 255, 0, 0);
  }
  50% {
    background-color: rgba(255, 255, 0, 0.2);
  }
  100% {
    background-color: rgba(255, 255, 0, 0);
  }
}
</style>
