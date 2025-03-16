<template>
  <section class="flex flex-col h-full enterprise-manage">
    <h1 class="text-2xl mt-0 font-bold">{{ title }}</h1>
    <div class="header flex items-center justify-between">
      <el-form style="width: 300px;" :model="form" label-width="120px">
        <div class="part">
          <div class="title">基本信息</div>
          <el-form-item required label="企业名称">
            <el-input v-model="form.name" placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item required label="企业简称">
            <el-input v-model="form.shortName" placeholder="请输入企业简称" />
          </el-form-item>
          <el-form-item required label="企业电话">
            <el-input v-model="form.phone" placeholder="请输入企业电话" />
          </el-form-item>
          <el-form-item required label="企业类型">
            <el-select v-model="form.type" placeholder="请选择企业类型">
              <el-option label="国有企业" value="1" />
              <el-option label="私营企业" value="2" />
              <el-option label="事业单位或社会团体" value="3" />
              <el-option label="中外合资" value="4" />
              <el-option label="外商独资" value="5" />
              <el-option label="其它" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item required label="所属行业">
            <el-select v-model="form.industry" placeholder="请选择所属行业">
              <el-option label="行业1" value="1" />
              <el-option label="行业2" value="2" />
              <el-option label="行业3" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-tree-select v-model="form.region" placeholder="请选择所在地区" :data="REGION_DATA" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.address" placeholder="请输入详细地址" />
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="form.postcode" placeholder="请输入邮政编码" />
          </el-form-item>
          <el-form-item label="企业传真">
            <el-input v-model="form.fax" placeholder="请输入企业传真" />
          </el-form-item>
          <el-form-item label="企业网址">
            <el-input v-model="form.website" placeholder="请输入企业网址" />
          </el-form-item>
          <el-form-item label="成立时间">
            <el-date-picker style="width: 100%;" v-model="form.establishmentDate" type="date" placeholder="请选择成立时间" />
          </el-form-item>
        </div>
        <div class="part">
          <div class="title">公司Logo</div>
          <el-form-item>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <div v-else
                class="p-8 border border-dashed border-gray-300 rounded-md flex items-center justify-center w-full h-full">
                <el-icon size="30" class="text-gray-500">
                  <Upload />
                </el-icon>
              </div>
            </el-upload>
          </el-form-item>
        </div>
        <div class="part">
          <div class="title">企业联系人</div>
          <el-form-item required label="联系人姓名">
            <el-input v-model="form.contactName" placeholder="请输入联系人姓名" />
          </el-form-item>
          <el-form-item required label="联系人电话">
            <el-input v-model="form.contactPhone" placeholder="请输入联系人电话" />
          </el-form-item>
          <el-form-item required label="电子邮箱">
            <el-input v-model="form.contactEmail" placeholder="请输入电子邮箱" />
          </el-form-item>
          <el-form-item required label="联系人职务">
            <el-input v-model="form.contactJob" placeholder="请输入联系人职务" />
          </el-form-item>
          <el-form-item required label="尊称">
            <el-radio-group v-model="form.contactTitle">
              <el-radio label="先生" value="1" />
              <el-radio label="女士" value="2" />
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="part">
          <div class="title">报告负责人</div>
          <el-form-item required label="报告负责人">
            <el-select v-model="form.reportManager" placeholder="请选择报告负责人">
              <el-option label="张三" value="1" />
              <el-option label="李四" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item required label="手机号码">
            <el-input v-model="form.reportManagerPhone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="部门职务">
            <el-input v-model="form.reportManagerJob" placeholder="请输入部门职务" />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.reportManagerEmail" placeholder="请输入电子邮箱" />
          </el-form-item>
        </div>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import REGION_DATA from '~/config/region';
const form = ref({
  name: '',
  shortName: '',
  phone: '',
  type: '',
  industry: '',
  region: '',
  address: '',
  postcode: '',
  fax: '',
  website: '',
  establishmentDate: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  contactJob: '',
  contactTitle: '',
  reportManager: '',
  reportManagerPhone: '',
  reportManagerJob: '',
  reportManagerEmail: '',
})
const imageUrl = ref('')
const route = useRoute()
const title = computed(() => route.query.id ? '修改企业' : '新增企业')
function handleAvatarSuccess(res: any) {
  imageUrl.value = URL.createObjectURL(res.file)
}
function beforeAvatarUpload(file: any) {
  return true
}
function handleSubmit() {
  console.log(form.value)
}
</script>
<style lang="scss" scoped>
.part {
  margin-bottom: 20px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 5px;
  width: 400px;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
