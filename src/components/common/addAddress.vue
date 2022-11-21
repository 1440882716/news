<template>
  <div class="container">
    <el-dialog
      title="新增地址"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="70%"
    >
      <div class="font14 dialog-content flex-r flex-b">
        <div style="width: 600px;">
          <el-form
            label-width="120px"
            :model="addressForm"
            :rules="accountRules"
            ref="addressForm"
          >
            <el-form-item label="收货人" prop="name">
              <el-input
                v-model="addressForm.name"
                placeholder="请输入姓名"
                type="text"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input
                v-model="addressForm.mobile"
                type="text"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="region">
              <el-cascader
                style="width: 100%;"
                v-model="addressForm.region"
                :options="cityData"
                :props="{
                  // checkStrictly: true,
                  expandTrigger: 'hover',
                  value: 'id',
                  label: 'ext_name',
                  children: 'childs'
                }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <textarea
                class="textarea-box"
                style="color: #606266;"
                v-model="addressForm.address"
                placeholder="请输入详细地址"
                cols="10"
                rows="4"
              ></textarea>
            </el-form-item>

            <el-form-item label="邮编">
              <el-input
                v-model="addressForm.postCode"
                type="number"
                placeholder="请输入邮政编码"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="标签">
              <el-input
                v-model="addressForm.label"
                placeholder="请输入标签（如：家里、单位）"
                type="text"
              ></el-input>
            </el-form-item> -->
          </el-form>
          <div class="default-box text-left pointer" @click="getDefault">
            <i
              :class="[
                'el-icon-circle-check',
                'font18',
                isDefault ? 'primary-color' : ''
              ]"
            ></i>
            <span class="font14 ">设为默认地址</span>
          </div>
          <div class="flex-r dialog-btn">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="comfirmAddress">确认</el-button>
          </div>
        </div>
        <Map @getAddFun="getMsg"></Map>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import city from "../../assets/data/area_format_user.json";
import Map from "./map.vue";
import { addAddress, updateAdd, addList } from "@/api/address";
export default {
  components: {
    Map
  },
  data() {
    return {
      dialogVisible: false,
      cityData: city,
      isDefault: false,
      addressForm: {
        name: "",
        mobile: "",
        province: "",
        region: "",
        city: "",
        county: "",
        address: "",
        postCode: "",
        isDefault: false
      },
      accountRules: {
        name: [{ required: true, message: "请输入收货人", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            required: true,
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        region: [
          { required: true, message: "请选择所在地区", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  props: ["addData", "upData"],
  watch: {
    upData() {
      this.addressForm.name = this.upData.name;
      this.addressForm.mobile = this.upData.mobile;
      this.addressForm.address = this.upData.address;
      this.addressForm.region[0] = this.upData.province;
      this.addressForm.region[1] = this.upData.city;
      this.addressForm.region[2] = this.upData.county;
    }
  },
  created() {
    this.setFormData();
    // if (this.upData.hasOwnProperty("id")) {
    //   this.addressForm.name = this.upData.name;
    //   this.addressForm.mobile = this.upData.mobile;
    //   this.addressForm.region[0] = this.upData.province;
    //   this.addressForm.region[1] = this.upData.city;
    //   this.addressForm.region[2] = this.upData.county;
    // }
    // console.log(this.upData);
    // debugger;
  },
  methods: {
    setFormData() {
      if (this.upData.hasOwnProperty("id")) {
        this.addressForm.name = this.upData.name;
        this.addressForm.mobile = this.upData.mobile;
        this.addressForm.region[0] = this.upData.province;
        this.addressForm.region[1] = this.upData.city;
        this.addressForm.region[2] = this.upData.county;
      }
      // console.log(this.addressForm);
      //   debugger;
    },
    getMsg(data) {
      this.addressForm.address = data;
    },
    // 打开弹窗
    openDialog() {
      this.dialogVisible = true;
    },
    //   关闭弹窗后清除表单内容
    closeDialog() {
      this.$nextTick(() => {
        this.$refs.addressForm.clearValidate();
        this.addressForm.name = "";
        this.addressForm.mobile = "";
        this.addressForm.address = "";
        // this.addressForm.region[0] = this.upData.province;
        // this.addressForm.region[1] = this.upData.city;
        // this.addressForm.region[2] = this.upData.county;
      });
    },
    getDefault() {
      this.isDefault = !this.isDefault;
      this.addressForm.isDefault = this.isDefault;
    },
    comfirmAddress() {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          // console.log(this.addressForm);
          this.addressForm.province = this.addressForm.region[0];
          this.addressForm.city = this.addressForm.region[1];
          this.addressForm.county = this.addressForm.region[2];
          addAddress(this.addressForm).then(res => {
            if (res.code == 200) {
              addList().then(res => {
                if (res.code == 200) {
                  this.$emit("changeData", res.data);
                  // console.log(res.data);
                  // debugger;
                  // return;
                  this.dialogVisible = false;
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style>
.dialog-content {
  padding: 0px 30px;
}
.textarea-box {
  width: 95%;
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 4px;
  resize: none;
}
.default-box {
  /* width: 100%; */
  margin: 0 auto;
  padding-left: 120px;
  height: 30px;
  color: #606266;
  /* margin-left: 120px; */
  /* background-color: #5fbaae; */
}
.dialog-btn {
  /* width: 50%; */
  margin: 0 auto;
  margin-top: 20px;
  padding-left: 200px;
}
</style>
