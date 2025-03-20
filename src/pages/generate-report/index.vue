<template>
    <div class="container">
        <h2 class="title">生成报告</h2>
        <div class="title_form">
            <span>企业名称：松莉美容科技（上海）有限公司</span>
            <span style="display: flex;">
                <el-form inline>
                    <el-form-item style="font-size: 16px;" label=" 报告年度">
                    <el-select style="width:400px;" v-model="reportyear" placeholder="下拉选择报告年度">
                        <el-option label="2020" value="2020"></el-option>
                    </el-select>
                </el-form-item>
                </el-form>
            </span>
        </div>
        <el-steps :active="0">
            <el-step title="上传数据"/>
            <el-step title="生成报告"/>
            <el-step title="在线编辑"/>
        </el-steps>
        <div class="uploadFile">
            <div class="flex flex-center flex-col">
                <el-icon size="50" color="green"><CircleCheck /></el-icon>
                清单模板
            </div>
            <div style="width: 85%;display: flex;justify-content: center;align-items: center;">
                <el-upload
                ref="upload"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :limit="1"
                :auto-upload="false"
            >
                <template #trigger>
                <el-button type="success">上传文件</el-button>
                </template>
            </el-upload>
            </div>
           
        </div>
        <div class="uploadFile">
            <div class="flex flex-center flex-col">
                <el-icon  size="50" color="orange"><WarnTriangleFilled /></el-icon>
                BVD数据模板
            </div>
            <div style="width: 80%;display: flex;justify-content: center;align-items: center;">
                <el-upload
                ref="upload"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :limit="1"
                :auto-upload="false"
            >
                <template #trigger>
                <el-button type="success">重新上传</el-button>
                </template>
            </el-upload>
            </div>
           
        </div>
        <div class="uploadFile" style="justify-content: flex-end;">
            <el-button type="primary">下一步</el-button>
        </div>
        <div class="exception">
            <p>[异常提示]</p>
            <p>第1行： 【产品编号】该字段不能为空</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const reportyear = ref('')
</script>
<style scoped lang="scss">
:deep(.ep-step__title.is-process){
    color:#243adf;
}
:deep(.ep-button--primary){
  --ep-button-bg-color:#243adf;
  --ep-button-border-color:#243adf;
}
// :deep(.ep-step__icon.is-text){
//     border-color:#243adf;
// }
:deep(.ep-step__icon-inner){
    color:#243adf;
}
.container {
    background-color: #fff;
    padding: 20px;
    .exception{
        border: 1px solid #ccc;
        color:orange;
        font-size:14px;
        background: #eeeded;
        padding: 10px;
        font-weight:bold;
    }
    .uploadFile{
        padding:30px 20px;
        display: flex;
        align-content: center;
        border-bottom: 1px solid #ccc;
    }
    .title {
        border-bottom: 1px solid #ccc;
    }

    .title_form {
        font-size: 16px;
        display: flex;
        justify-content: space-between;
    }
}
</style>