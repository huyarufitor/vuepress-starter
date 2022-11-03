<template>
  <div class="up-down-load-wrapper">
    <div class="select-upload">
      <el-select
        v-model="uploadChoice"
        class="m-2"
        placeholder="导入线索"
        @change="choseChangeUpload(uploadChoice)"
        size="small"
      >
        <el-option label="单个录入" value="single"> </el-option>
        <el-option label="批量上传" value="batch">
          <el-upload
            class="upload-file"
            :action="uploadUrl"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :data="{
              req: JSON.stringify({ auth: $store.getters['userAuth'] }),
            }"
            :show-file-list="false"
            :on-success="messageBox"
            :on-error="messageBox"
            >批量上传
          </el-upload>
        </el-option>
      </el-select>
      <el-dialog
        v-model="showSingleUploadDialog"
        title="线索信息提交"
        width="50%"
        center
        class="upload-clue-dialog-wrapper"
      >
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="clue-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="日期" prop="create_time">
            <el-date-picker
              v-model="ruleForm.create_time"
              type="date"
              placeholder="选择日期"
              size="small"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="ruleForm.telephone"></el-input>
          </el-form-item>
          <el-form-item
            label="备用联系方式"
            prop="spare_contact"
            class="note-form-item"
            style="margin-bottom: 12px"
          >
            <el-input v-model="ruleForm.spare_contact"></el-input>
          </el-form-item>
          <!-- <el-form-item label=""> -->
          <div
            class="note-info"
            style="text-align: right; color: #f56c6c; margin-bottom: 12px"
          >
            手机号、备用联系方式，2选1 必填
          </div>
          <!-- </el-form-item> -->
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="ruleForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="ruleForm.company_name"></el-input>
          </el-form-item>
          <el-form-item label="渠道" prop="channel">
            <el-input v-model="ruleForm.channel"></el-input>
          </el-form-item>
          <el-form-item label="行业" prop="industry">
            <el-input v-model="ruleForm.industry"></el-input>
          </el-form-item>
          <el-form-item label="场景" prop="scene">
            <el-input v-model="ruleForm.scene"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              type="primary"
              @click="handleSubmit()"
              :disabled="getUploadBtnDisable"
            >
              确认
            </el-button>
            <el-button @click="showSingleUploadDialog = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <el-button
      class="download-template"
      size="small"
      @click="getClueTemplateUrl()"
      >模板下载</el-button
    >
    <!--重复线索支持下载重复excel 弹窗  -->
    <el-dialog v-model="showRepeatDialog" width="30%">
      <h3>导入成功！</h3>
      <h4>
        重复线索{{ repeatNumList.length }}条，<span
          @click="exportExcel"
          class="check-more-clue"
        >
          点此查看明细
        </span>
      </h4>
      <el-button @click="showRepeatDialog = false">确认</el-button>

      <el-table
        :data="repeatNumList"
        id="exportXlsx"
        ref="multipleTable"
        v-loading="fullscreenLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="company_name"
          label="公司名"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="spare_contact"
          label="备用联系方式"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="id_type"
          label="身份类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="competency"
          label="职能"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="industry"
          label="行业"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="channel"
          label="渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="key_words"
          label="搜索词"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="scene"
          label="场景"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="日期"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
// , FormInstance, FormRules
import { config } from "@/api/axios";
import { api } from "@/api/api";
import store from "@/store";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
// import { uploadClue } from "@/service/clue";
import moment from "moment";

export default defineComponent({
  setup(props, context) {
    const data = ref("12314");
    let uploadChoice = ref("");
    let showSingleUploadDialog = ref(false);
    let repeatNumList = ref([]); // 导入线索中的重复线索list
    let showRepeatDialog = ref(false); // 是否有重复线索弹窗
    // 通过excel 上传 线索；
    const messageBox = function (res: any) {
      if (res.ret.code === 0) {
        // 请求接口成功
        ElMessage({
          message: "上传成功",
          type: "success",
        });
        if (res.data.is_clue_repeat === 2) {
          // is_clue_repeat 1：没有重复，直接插入表中；2：有重复线索，返回所有的重复线索。
          showRepeatDialog.value = true;

          repeatNumList.value = res.data.list.map((item: any) => item);
          // repeatNumList.value = res.data.list.map((item: any) => item.telephone);
        }
        context.emit("updateDataList");
      } else {
        // 请求接口失败
        ElMessage({
          message: "上传失败",
          type: "error",
        });
      }
    };
    // 获取临时下载模板链接
    const getClueTemplateUrl = async function () {
      api("getClueTemplate", {
        auth: store.getters["userAuth"],
      }).then(({ ret, data }) => {
        if (ret.code === 0) {
          // debugger;
          download(data.url);
        }
      });
    };
    //  下载数据报表
    const download = function (url: string) {
      // 创建a标签
      const a = document.createElement("a");
      // 定义下载名称
      // a.download = '文件名称'
      // 隐藏标签
      a.style.display = "none";
      // 设置文件路径
      a.href = url;
      // 将创建的标签插入dom
      document.body.appendChild(a);
      // 点击标签，执行下载
      //
      a.click();
      // 将标签从dom移除
      document.body.removeChild(a);
    };
    const exportExcel = async function () {
      //根据给的id获取table表，选取元素的时候加上，{raw:true}可以使表格正常导出，消除科学计数法
      let wb = XLSX.utils.table_to_book(document.getElementById("exportXlsx"), {
        raw: true,
      });
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        //给xlsx文件赋值名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "重复线索表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.error(e, wbout);
      }
      return wbout;
    };
    const choseChangeUpload = function (upload: string) {
      if (upload === "single") {
        showSingleUploadDialog.value = true;
      } else if (upload === "batch") {
        console.log("开始上传");
      }
    };

    const formSize = ref("default");
    const ruleFormRef = ref<any>();
    const ruleForm = reactive({
      create_time: 0, //日期
      telephone: null, //手机号
      spare_contact: "", //备用联系方式
      contact: "", //联系人
      company_name: "", //公司名称
      channel: "", //渠道
      industry: "", //   行业
      scene: "", // 场景
    });
    const rules = reactive<any>({
      create_time: [
        {
          required: true,
          message: "请选择日期",
          type: "date",
          trigger: "blur",
        },
      ],
      telephone: [
        {
          required: false,
          message: "请输入手机号",
          trigger: "blur",
        },
        {
          // pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,
          pattern: /^[0-9]*$/,
          message: "请输入正确的手机号",
          trigger: ["blur", "change"],
        },
      ],
      spare_contact: [
        {
          required: false,
          message: "请输入备用联系方式",
          trigger: "blur",
        },
      ],
      contact: [
        {
          required: true,
          message: "请输入联系人",
          trigger: "blur",
        },
      ],
      company_name: [
        {
          required: true,
          message: "请输入公司名称",
          trigger: "blur",
        },
      ],
      channel: [
        {
          required: true,
          message: "请输入渠道",
          trigger: "blur",
        },
      ],
      industry: [
        {
          required: true,
          message: "请输入行业",
          trigger: "blur",
        },
      ],
      scene: [
        {
          required: true,
          message: "请输入场景",
          trigger: "blur",
        },
      ],
    });
    //demo
    const submitForm = async (formEl: any | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const resetForm = (formEl: any | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }));

    const ruleFormsss = ref(null);
    const handleSubmit = async function () {
      ruleForm.create_time = moment(ruleForm.create_time).valueOf();
      ruleFormRef.value.validate(async (valid: any) => {
        if (valid) {
          console.log("submit");
          const { ret } = await api("uploadClue", {
            auth: store.getters["userAuth"],
            data: ruleForm,
          });
          if (ret.code === 0) {
            showSingleUploadDialog.value = false;
            ElMessage({
              message: "添加线索成功",
              type: "success",
            });
            ruleFormRef.value.resetFields();
            context.emit("updateDataList");
          }
        } else {
          console.error("error submit");
          return false;
        }
      });
    };
    //market-blog.zego.im/
    // update wp_options set option_value = replace(option_value, 'http://47.103.202.233', 'https://market-blog.zego.im') where option_name = 'home' OR option_name = 'siteurl';
    const getUploadBtnDisable = computed(() => {
      let tel = false;
      if (ruleForm.telephone || ruleForm.spare_contact) {
        // 手机号或者备注联系得有一个
        tel = true;
      }
      if (
        ruleForm.create_time &&
        tel &&
        ruleForm.contact &&
        ruleForm.company_name &&
        ruleForm.channel &&
        ruleForm.industry &&
        ruleForm.scene
      ) {
        return false;
      } else {
        return true;
      }
    });
    return {
      data,
      ruleFormsss,
      showSingleUploadDialog,
      uploadChoice,
      showRepeatDialog,
      repeatNumList,
      messageBox,
      uploadUrl: config.baseURL + "/clue/add_clue_by_doc",
      getClueTemplateUrl,
      exportExcel,
      choseChangeUpload,
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      options,
      handleSubmit,
      getUploadBtnDisable,
    };
  },
});
</script>

<style lang="less">
.up-down-load-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  .select-upload {
    width: 100px;
    /deep/.el-overlay {
      .el-overlay-dialog {
        .note-info {
          text-align: right !important;
        }
      }
    }
    .upload-clue-dialog-wrapper {
      padding: 0;
      .clue-ruleForm {
        .note-info {
          text-align: right !important;
        }
      }
    }
  }
}
</style>
