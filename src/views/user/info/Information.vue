<template>
  <div class="w clearfix">
    <div class="infoAside">
      <dl>
        <dt>设置</dt>
        <dd
          v-for="(title, index) in titles"
          :key="index"
          :class="{actived: currentIndex===index}"
          @click="selected(index)"
        >{{title}}</dd>
      </dl>
    </div>
    <div class="infoMain">
      <div class="isBlock">
        <div class="title">
          个人资料
          <span class="recharge" @click="recharge">充值</span>
        </div>
        <div class="info">
          <el-form
            :model="formInfo"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="right"
          >
            <el-form-item label="当前头像">
              <el-upload
                class="avatar-uploader"
                action="http://106.55.151.225:8888/user/updateUserInfo"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img :src="imageUrl" :onerror="placeholdImg" class="avatar" />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="formInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formInfo.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="余额">
              <div>{{ money }}</div>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" @click="confirm">确认更改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <div class="address">
          <h2 class="title">收货地址</h2>
          <div class="address-detail">
            <el-form label-position="right" label-width="80px" :model="formAddress">
              <el-form-item label="地址信息">
                <v-distpicker province city area @selected="onSelected"></v-distpicker>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="formAddress.detailAddress" placeholder="请输入详细地址信息"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-button type="primary" @click="holdAddress">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="show-address">
          <el-table :data="addressData" border style="width: 80%">
            <el-table-column prop="province" label="省份" width="150"></el-table-column>
            <el-table-column prop="city" label="市" width="150"></el-table-column>
            <el-table-column prop="area" label="区/镇" width="150"></el-table-column>
            <el-table-column prop="detailAddress" label="详细地址" width="180"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAddress,
  updateAddress,
  updateUserInfo,
  getUserInfo,
  addMoney
} from "api/user";

import VDistpicker from "v-distpicker";

export default {
  name: "Information",
  created() {
    this.getUserAddress();
    this.getUserInformation();
  },
  components: {
    VDistpicker
  },
  computed: {
    userId() {
      return sessionStorage.getItem('userId');
    },
    username() {
      return sessionStorage.getItem('username');
    }
  },
  data() {
    return {
      titles: ["个人资料", "收货地址"],
      currentIndex: 0,
      // imageUrl: require("@/assets/images/touxiang.jpg"),
      imageUrl: '',
      placeholdImg:
        'this.src="' + require("@/assets/images/touxiang.jpg") + '"',
      formAddress: {
        address: {
          province: "",
          city: "",
          county: ""
        },
        detailAddress: ""
      },
      addressData: [],
      formInfo: {
        username: "",
        phone: "",
        email: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }]
      },
      formdata: new FormData(),
      money: 0
    };
  },
  methods: {
    selected(index) {
      this.currentIndex = index;
      let divs = document.querySelectorAll(".infoMain>div");
      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.remove("isBlock");
      }
      divs[index].classList.add("isBlock");
    },
    onSelected(data) {
      this.formAddress.address.province = data.province.value;
      this.formAddress.address.city = data.city.value;
      this.formAddress.address.county = data.area.value;
    },
    getUserAddress() {
      getAddress(this.userId).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(res.data.data);
          this.addressData = [];
          this.addressData.push(res.data.data);
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    getUserInformation() {
      getUserInfo(this.username).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          let info = res.data.data;
          this.formInfo.username = info.username;
          this.formInfo.phone = info.phone;
          this.formInfo.email = info.email;
          this.imageUrl = info.avatarPath;
          this.money = info.money
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    holdAddress() {
      // console.log(this.formAddress);
      updateAddress(
        this.formAddress.address.province,
        this.formAddress.address.city,
        this.formAddress.address.county,
        this.formAddress.detailAddress,
        this.userId
      ).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.getUserAddress();
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    confirm() {
      // console.log(this.formInfo);
      this.formdata.append("userId", this.userId);
      this.formdata.append("username ", this.formInfo.username);
      this.formdata.append("phone", this.formInfo.phone);
      this.formdata.append("email", this.formInfo.email);
      if (this.formInfo.password !== "") {
        this.formdata.append("password", this.formInfo.password);
      }
      updateUserInfo(this.formdata).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(imageUrl);
          this.$message.success("修改成功，请重新登录");
          this.getUserInformation();
          this.formdata = new FormData();
          sessionStorage.clear();
          this.$router.replace('/login');
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // console.log(file);
      // console.log(typeof file);

      this.formdata.append("file", file);

      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    recharge() {
      this.$prompt("请输入充值金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$|^\d+[.]?\d+$/,
        inputErrorMessage: "请输入正确的数字"
      })
        .then(({ value }) => {
          // console.log(value)
          addMoney(this.userId, value).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success('充值成功');
              this.getUserInformation();
            } else {
              this.$message.error(res.data.message)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style scoped>
.infoAside {
  float: left;
  width: 120px;
  padding: 5px;
}
.infoAside dl dt {
  height: 28px;
  line-height: 28px;
  font-weight: 700;
  font-size: 14px;
  color: #333;
}
.infoAside dl dd {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.actived {
  color: #e4393c !important;
}
.infoMain {
  float: left;
  width: 800px;
  height: 600px;
}
.infoMain > div {
  display: none;
}
.isBlock {
  display: block !important;
}

.address {
  height: 280px;
}
.title {
  position: relative;
  height: 280px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 18px;
  background-color: #f3f8fe;
}
.recharge {
  position: absolute;
  top: 0;
  right: 20px;
  cursor: pointer;
}
.address .address-detail {
  width: 605px;
  height: 150px;
  padding-top: 20px;
}
.show-address {
  margin-top: 5px;
  width: 809px;
  padding: 0 10px;
}
.info {
  width: 400px;
  padding-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
.avatar-uploader-icon {
  width: 90px;
  height: 90px;
  line-height: 90px;
}

.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
}
</style>