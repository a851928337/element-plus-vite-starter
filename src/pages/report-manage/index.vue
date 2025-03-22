<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = ref([
  {
    name: '松莉美容科技（上海）有限公司',
    reportName: '关联交易同期资料本地文档',
    reportType: '财务报告',
    reportManager: '张晓丽',
  },
])
const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(true)
function handleDetail(row: any) {
  router.push(`/report-manage/editor/${row.id}`)
}
function handleUpload(row: any) {
  router.push(`/generate-report`)
}
</script>

<template>
  <Layout>
    <section class="enterprise-manage h-full flex flex-col">
      <div class="header flex items-center justify-between">
        <div class="flex items-center">
          <Search class="mr-2" placeholder="输入企业名称" />
          <Search class="mr-2" placeholder="输入报告名称" />
          <el-select class="mr-2" style="width: 100px;" placeholder="请选择">
            <el-option label="A" value="1" />
            <el-option label="B" value="2" />
            <el-option label="C" value="3" />
          </el-select>
          <el-button type="primary">
            搜索
          </el-button>
        </div>
      </div>
      <Table
        class="flex-1" :table-data="tableData" :current-page="currentPage" :page-size="pageSize"
        :background="background"
      >
        <el-table-column prop="name" label="企业名称" />
        <el-table-column prop="reportName" label="报告名称" />
        <el-table-column prop="reportType" label="报告类型" />
        <el-table-column prop="reportManager" label="报告负责人" />
        <el-table-column width="250" fixed="right" label="操作">
          <template #default="scope">
            <div class="buttons flex flex-row items-center justify-between">
              <el-button type="primary" size="small" @click="handleUpload(scope.row)">
                生成报告
              </el-button>
              <el-button size="small" @click="handleDetail(scope.row)">
                编辑模板
              </el-button>
              <el-button size="small" @click="handleUpload(scope.row)">
                反向模板
              </el-button>
            </div>
          </template>
        </el-table-column>
      </Table>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
// :deep(.ep-button--primary){
//   --ep-button-bg-color:#243adf;
//   --ep-button-border-color:#243adf;
// }
// :deep(.ep-pagination.is-background .ep-pager li.is-active){
//   background-color:#243adf;
// }
.buttons {
  & > * {
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>
