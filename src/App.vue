<script setup lang="ts">
import { onMounted } from 'vue'
import { definePage } from 'vue-router/auto'
import useUserStore from '~/store/store'
const userStore = useUserStore()
definePage({
  redirect: '/home',
})
onMounted(() => {
  userStore.init()
})
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="main-container flex">
      <BaseSide />
      <div class="w-full overflow-auto bg-gray-100 px-4 py-4">
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

<style>
#app {
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
