<template>
  <div class="container flex">
    <WangEditor class="left" placeholder="请输入内容" v-model="content" />
    <Insert target="#editor-container" class="right" :list="insertList" />
    <!-- <div class="w-1/2 right" v-html="json"></div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import Editor from '~/static/utils/editor';
import { mockWordJson } from '~/static/mock/rich-text';
const content = ref('');
const insertList = ref([
  {
    label: '公司名称',
    value: 'companyName'
  },
  {
    label: '公司地址',
    value: 'companyAddress'
  },


])
// 初始化编辑器内容
onMounted(() => {
  // if (editorRef.value) {
  const initialHtml = Editor.parseWordToRichText(mockWordJson);
  // editorRef.value.innerHTML = initialHtml;
  console.log(initialHtml)
  content.value = initialHtml;
  // }
});

// 解析编辑器内容为JSON
const json = computed(() => {
  const res = Editor.parseHtmlToWord(content.value);
  return Editor.parseWordToRichText(res);
});

// 检查转换是否一致
const equal = computed(() => {
  return content.value === json.value;
});
</script>

<style scoped lang="scss">
.container {
  height: 100%;

  .left {
    flex: 1;
    margin-right: 10px;
    height: 100%;
  }

  .right {
    width: 200px;
  }
}
</style>
