<template>
  <div class="info-content">
    <msgBox ref="tips"></msgBox>
    <div class="relative">
      <el-tabs v-model="editableTabsValue">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <div
        class="absolute add-feedback font14"
        @click="dialogFormVisible = true"
      >
        提交反馈意见
      </div>
    </div>
    <el-table :data="feedbackData" style="width: 100%">
      <el-table-column prop="date" width="60" type="index"> </el-table-column>
      <el-table-column prop="unitRemark" label="单位名称"> </el-table-column>
      <el-table-column prop="content" label="反馈内容"> </el-table-column>
      <el-table-column prop="createTime" label="提交时间"> </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="detailFun(scope.row)"
            >详情</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="确认删除?"
            @confirm="delFeedbackFun(scope.row.id)"
          >
            <el-button slot="reference" type="danger" size="small"
              >删除</el-button
            >
          </el-popconfirm>
          <!-- <el-button
            type="primary"
            size="small"
            @click="delFeedbackFun(scope.row.id)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增反馈意见 -->
    <el-dialog title="反馈意见" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.unitRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="反馈内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
            autocomplete="off"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :headers="{ Authorization: token }"
            action="https://admin.cdzkzs.top/client/order/upload"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFeedbackFun">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 反馈详情 -->
    <el-drawer title="" :visible.sync="drawer" direction="rtl">
      <el-descriptions
        class="margin-top"
        style="padding: 20px;padding-top: 0;"
        title="意见详情"
        :column="1"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            单位名称
          </template>
          {{ feedbackItem.unitRemark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            反馈时间
          </template>
          {{ feedbackItem.createTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            反馈内容
          </template>
          {{ feedbackItem.content }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-sunrise-1"></i>
            图片
          </template>
          <img src="" alt="" />
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script>
import { addFeedback, feedbackList, delFeedback } from "@/api/feedback";
import { getToken } from "@/utils/auth";
import msgBox from "./msg.vue";
export default {
  components: { msgBox },
  data() {
    return {
      token: "",
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "意见反馈",
          name: "0"
        }
      ],
      drawer: false,
      dialogFormVisible: false,
      feedbackData: [],
      form: {
        unitRemark: "",
        content: "",
        imgUrl: ""
      },
      formLabelWidth: "120px",
      fileList: [],
      feedbackItem: {}
    };
  },
  created() {
    this.token = getToken();
    this.getData();
  },
  methods: {
    getData() {
      feedbackList().then(res => {
        if (res.code == 200) {
          this.feedbackData = res.data.records;
        }
      });
    },
    addFeedbackFun() {
      console.log(this.form);
      addFeedback(this.form).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.dialogFormVisible = false;
          this.getData();
        }
      });
    },
    detailFun(info) {
      this.feedbackItem = info;
      this.drawer = true;
    },
    delFeedbackFun(id) {
      delFeedback({ id: id }).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.getData();
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        // debugger;
        // return
        // this.voucherImg = URL.createObjectURL(file.raw);
        // this.voucherImg = res.location;
      } else {
        this.$refs.tips.toast(res.msg);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      debugger;
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style scoped>
.add-feedback {
  padding: 9px 15px;
  color: #fff;
  background-color: #409eff;
  right: 0;
  top: 0px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
