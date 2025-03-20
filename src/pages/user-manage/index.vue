<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = ref([
  {
    name: '张文娇',
    shortName: '30',
    industry: '暂无',
    updateTime: '2019-08-25 14:54',
  },
])
const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(true)
function gotoSet() {
  router.push('/user-manage/set')
}
function gotoDetail(id: string) {
    router.push('/user-manage/set')
}
</script>

<template>
  <Layout>
    <section class="enterprise-manage h-full flex flex-col">
      <div class="header flex items-center justify-between">
        <Search show-button placeholder="请输入用户名" />
        <el-button type="primary" @click="gotoSet">
          新增用户
        </el-button>
      </div>
      <Table
        class="flex-1" :table-data="tableData" :current-page="currentPage" :page-size="pageSize"
        :background="background"
      >
        <el-table-column  width="300" prop="name" label="人员名称" />
        <el-table-column prop="shortName" label="人员账号" />
        <el-table-column prop="industry" label="所在公司" />>
        <el-table-column width="150" prop="updateTime" label="更新时间" />
        <el-table-column width="280" fixed="right" label="操作">
          <template #default="scope">
            <div class="buttons flex flex-row justify-between">
              <el-button type="primary" size="small" @click="gotoDetail(scope.row.id)">
                重置密码
              </el-button>
              <el-button type="warning" size="small">
                停用人员
              </el-button>
              <el-button type="danger" size="small">
                删除人员
              </el-button>
            </div>
          </template>
        </el-table-column>
      </Table>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
:deep(.ep-button--primary){
  --ep-button-bg-color:#243adf;
  --ep-button-border-color:#243adf;
}
:deep(.ep-pagination.is-background .ep-pager li.is-active){
  background-color:#243adf;
}
.buttons {
  & > * {
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>
