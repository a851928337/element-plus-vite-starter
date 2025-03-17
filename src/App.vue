<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="main-container flex">
      <BaseSide />
      <div class="bg-gray-100 w-full py-14 px-14 overflow-auto">
        <keep-alive exclude="/report-manage/editor/[id]">
          <RouterView />
        </keep-alive>
        <!-- <Layout>
          <RouterView />
        </Layout> -->
      </div>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import useUserStore from '~/store/store'
import { definePage } from 'vue-router/auto'
import { onMounted } from 'vue'
const userStore = useUserStore()
definePage({
  redirect: '/home',
})
onMounted(() => {
  userStore.init()
})
</script>
<style>
#app {
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
