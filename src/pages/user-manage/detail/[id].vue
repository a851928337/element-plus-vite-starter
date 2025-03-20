<template>
  <div class='header flex items-center justify-between'>
    <div>
      <div class='name'>{{ data.name }}</div>
      <div class='code'>企业编号：{{ data.enterpriseCode }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute('/enterprise-manage/detail/[id]')
const id = route.params.id
const data = ref({
  name: '企业名称',
  shortName: '企业简称',
  enterpriseCode: '企业编号',
  phone: '企业电话',
  type: '企业类型',
  industry: '所属行业',
  region: '所在地区',
  address: '详细地址',
  postcode: '邮政编码',
  fax: '企业传真',
  website: '企业网址',
  establishmentDate: '成立时间',
  contactName: '企业联系人',
  contactPhone: '联系人电话',
  contactEmail: '电子邮箱',
  contactJob: '联系人职务',
  contactTitle: '尊称',
  reportManager: '报告负责人',
  reportManagerPhone: '手机号码',
  reportManagerJob: '部门职务',
  reportManagerEmail: '电子邮箱',
})
</script>
