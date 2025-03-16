<template>
  <Layout>
    <div class="header flex items-center justify-between">
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
    <div class="content mt-10">
      <div class="title flex items-center mb-4">
        <el-icon class="mr-2" size="20px">
          <Menu />
        </el-icon>
        企业列表
      </div>
      <div class="list">
        <div class="item flex items-center justify-between" v-for="item in data" :key="item.title">
          <div class="title">{{ item.title }}</div>
          <div class="flex items-center">
            <div class="name mr-4">{{ item.name }}</div>
            <el-icon class="mr-2" size="14px">
              <Calendar />
            </el-icon>
            <div class="date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useUserStore from '~/store/store'
const userStore = useUserStore()
const data = ref<{
  title: string,
  name: string,
  date: string
}[]>([
  { title: '【2025】中国石油天然气集团公司', name: '李小明', date: '2019-04-10 09:00' },
  { title: '【2025】中国石油天然气集团公司', name: '李小明', date: '2019-04-10 09:00' },
  { title: '【2025】中国石油天然气集团公司', name: '李小明', date: '2019-04-10 09:00' },
  { title: '【2025】中国石油天然气集团公司', name: '李小明', date: '2019-04-10 09:00' },
  { title: '【2025】中国石油天然气集团公司', name: '李小明', date: '2019-04-10 09:00' },
])
</script>
<style lang="scss" scoped>
.header {
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
}

.content {
  .list {
    // padding: 10px 0;
    border-top: 1px solid #e0e0e0;

    .item {
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
  }
}
</style>
