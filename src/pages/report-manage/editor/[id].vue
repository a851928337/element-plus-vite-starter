<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import useEditorStore from '~/components/WangEditor/store'
import { mockWordJson } from '~/static/mock/rich-text'
import Editor from '~/static/utils/editor'
const editorStore = useEditorStore()
const content = ref('')
const insertList = ref([
  {
    label: '公司名称',
    value: 'companyName',
  },
  {
    label: '公司地址',
    value: 'companyAddress',
  },

])
// 初始化编辑器内容
onMounted(() => {
  // if (editorRef.value) {
  const initialHtml = Editor.parseWordToRichText(mockWordJson)
  // editorRef.value.innerHTML = initialHtml;
  content.value = initialHtml
  // }
})

// 解析编辑器内容为JSON
const json = computed(() => {
  const res = Editor.parseHtmlToWord(content.value)
  return Editor.parseWordToRichText(res)
})

// 检查转换是否一致
const equal = computed(() => {
  return content.value === json.value
})
function handleAfterInsert(item: any, style: any) {
  editorStore.editorRef?.dangerouslyInsertHtml(`<span style="color: ${style.color}; background-color: ${style['background-color']}; padding: ${style.padding}; border-radius: ${style['border-radius']}">#{${item.label}}</span>`)
}
</script>

<template>
  <!-- <div class="container"> -->
  <WangEditor v-model="content" class="editor" placeholder="请输入内容" />
  <!-- <Insert :auto-insert="false" target="#editor-container" class="right" :list="insertList"
      @after-insert="handleAfterInsert" /> -->
  <!-- <div class="w-1/2 right" v-html="json"></div> -->
</template>

<style scoped lang="scss">
// .container {
//   height: 100%;
//   width: 100%;
//   .left {
//     // margin-right: 10px;
//     height: 100%;
//     width: 100%;
//   }

//   .right {
//     width: 200px;
//   }
// }
.editor {
  width: 100%;
  height: 100%;
}
</style>
