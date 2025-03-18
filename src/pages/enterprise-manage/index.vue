<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = ref([
  {
    name: '松莉美容科技（上海）有限公司',
    shortName: '松莉美容',
    industry: '所属行业',
    contact: '李小明',
    reportManager: '张晓丽',
    updateTime: '2019-08-25 14:54',
  },
])
const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(true)
function gotoSet() {
  router.push('/enterprise-manage/set')
}
function gotoDetail(id: string) {
  router.push(`/enterprise-manage/detail/${id}`)
}
</script>

<template>
  <Layout>
    <section class="enterprise-manage h-full flex flex-col">
      <div class="header flex items-center justify-between">
        <Search show-button placeholder="输入企业名称" />
        <el-button type="primary" @click="gotoSet">
          新增企业
        </el-button>
      </div>
      <Table
        class="flex-1" :table-data="tableData" :current-page="currentPage" :page-size="pageSize"
        :background="background"
      >
        <el-table-column prop="name" label="企业名称" />
        <el-table-column prop="shortName" label="企业简称" />
        <el-table-column prop="industry" label="所属行业" />
        <el-table-column prop="contact" label="企业联系人" />
        <el-table-column prop="reportManager" label="报告负责人" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column width="200" fixed="right" label="操作">
          <template #default="scope">
            <div class="buttons flex flex-col items-center justify-center">
              <el-button type="primary" size="small" @click="gotoDetail(scope.row.id)">
                详情
              </el-button>
              <el-button type="danger" size="small">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </Table>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
.buttons {
  & > * {
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>
