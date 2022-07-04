<template>
  <div class="info-content">
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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="单位名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="反馈内容" width="430">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="drawer = true"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增反馈意见 -->
    <el-dialog title="反馈意见" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="反馈内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 反馈详情 -->
    <el-drawer title="意见详情" :visible.sync="drawer" direction="rtl">
      <span>哈哈哈哈哈哈</span>
    </el-drawer>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "意见反馈",
          name: "0"
        }
      ],
      drawer: false,
      dialogFormVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "四川省成都市人大代表",
          address:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      form: {
        name: "",
        content: "",
        type: []
      },
      formLabelWidth: "120px",
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
