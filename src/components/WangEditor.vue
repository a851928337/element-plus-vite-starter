<template>
  <div class="wang-editor flex">
    <div :style="{ width: props.menuWidth || '200px' }" ref="headerContainer" id="header-container"
      class="header-container">
    </div>
    <div id="editor-container" class="editor-container"><!-- 编辑器 --></div>
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, onMounted, watch, CSSProperties } from 'vue'
import { createEditor, SlateNode, IDomEditor } from '@wangeditor/editor'
const props = defineProps<{
  placeholder?: string
  menuWidth?: string
}>()
const editorRef = ref<IDomEditor | null>(null)
const headerContainer = ref<HTMLElement | null>(null)
const editorConfig = {
  placeholder: props.placeholder || '请输入内容...',
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    modelValue.value = html
    const headers = editor.getElemsByTypePrefix('header')
    headerContainer.value?.setHTMLUnsafe(`<ul>${headers.map(header => {
      const text = SlateNode.string(header)
      const { id, type } = header as any
      return `<li id="${id}" class="${type}">${text}</li>`
    }).join('')}</ul>`)
  },
}


const modelValue = defineModel<string>('modelValue')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})

onMounted(() => {
  editorRef.value = createEditor({
    selector: '#editor-container',
    html: modelValue.value,
    config: editorConfig,
    mode: 'simple', // or 'simple'
  })
})
watch(modelValue, (val) => {
  editorRef.value?.setHtml(val || '')
})

watch([headerContainer, editorRef], ([val, editor]) => {
  val?.addEventListener('mousedown', event => {
    if ((event.target as HTMLElement)?.tagName !== 'LI') return
    event.preventDefault()
    const id = (event.target as HTMLElement).id
    document.querySelector(`#editor-container .w-e-scroll #${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
    // editor?.scrollToElem(id) // 滚动到标题
  })
})

</script>
<style scoped lang="scss">
.wang-editor {
  max-width: 100%;
  max-height: 100%;
  width: 1000px;
  height: 300px;

  .header-container,
  .editor-container {
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }

  .header-container {
    margin-right: 10px;

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

  .editor-container {
    padding: 10px 0;
    flex: 1;
  }
}
</style>
