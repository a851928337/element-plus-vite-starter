<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <el-icon class="mr-4" size="100px" color="#999">
          <Avatar />
        </el-icon>
        <div class="user-info">
          <div class="name mb-2">{{ userStore.user?.name }}，欢迎！</div>
          <div class="last-login-at">
            <span>上次登录：</span>
            <span>{{ userStore.user?.last_login_at }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="item flex flex-col items-center">
          <div class="label">公司数量</div>
          <div class="value">100</div>
        </div>
        <div class="item flex flex-col items-center">
          <div class="label">已生成报告</div>
          <div class="value">100</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import useUserStore from '~/store/store'
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.user-info {
  .name {
    font-size: 24px;
    font-weight: bold;
  }

  .last-login-at {
    font-size: 14px;
    color: #999;
  }
}
.item {
  &:not(:last-child) {
    margin-right: 50px;
  }
  .label {
    font-size: 14px;
    color: #999;
  }
  .value {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
