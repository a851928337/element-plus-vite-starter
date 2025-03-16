<template>
  <Layout>
    <section class="flex flex-col h-full enterprise-manage">
      <div class="header flex items-center justify-between">
        <Search showButton placeholder="输入企业名称" />
        <el-button @click="gotoSet" type="primary">新增企业</el-button>
      </div>
      <Table class="flex-1" :tableData="tableData" :currentPage="currentPage" :pageSize="pageSize"
        :background="background">
        <el-table-column width="240" prop="name" label="企业名称" />
        <el-table-column width="200" prop="shortName" label="企业简称" />
        <el-table-column width="200" prop="industry" label="所属行业" />
        <el-table-column width="200" prop="contact" label="企业联系人" />
        <el-table-column width="200" prop="reportManager" label="报告负责人" />
        <el-table-column width="200" prop="updateTime" label="更新时间" />
        <el-table-column width="200" fixed="right" label="操作">
          <template #default="scope">
            <div class="buttons flex flex-col items-center justify-center">
              <el-button @click="gotoDetail(scope.row.id)" type="primary" size="small">详情</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>

      </Table>
    </section>
  </Layout>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
<style lang="scss" scoped>
.buttons {
  &>* {
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>
