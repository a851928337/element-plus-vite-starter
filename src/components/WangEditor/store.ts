import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IDomEditor } from '@wangeditor/editor'
const useEditorStore = defineStore('wang-editor', () => {
  const editorRef = ref<IDomEditor | null>(null)
  function setRef(ref: IDomEditor) {
    editorRef.value = ref
  }
  function clearRef() {
    editorRef.value = null
  }
  return {
    editorRef,
    setRef,
    clearRef
  }
})

export default useEditorStore
