<template>
  <div>
    <div class="title">
      <a
        href="javascript:;"
        v-for="(title, index) in titles"
        :key="index"
        :class="{actived: currentIndex===index}"
        @click="titleClick(index)"
      >{{ title }}</a>
    </div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="70px"
      :rules="rules"
      hide-required-asterisk
    >
      <div v-if="isUser">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" key="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            key="password"
            show-password
          ></el-input>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" key="phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="code">
          <el-input type="text" v-model="ruleForm.code" autocomplete="off" key="code" maxlength="6"></el-input>
          <button
            class="send-btn"
            @click.prevent="sendCode"
            ref="sentCode"
            :disabled="isDisabled"
          >获取验证码</button>
        </el-form-item>
      </div>
      <div class="login-btn">
        <button @click.prevent="login('ruleForm')">登录</button>
      </div>
    </el-form>

    <div class="login-block">
      <ul>
        <li>
          <a href="javascript:;" @click="toPassword">忘记密码</a>
        </li>
        <li>
          <a href="javascript:;" @click="toRegister">免费注册</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { sendSms, loginByMessage, loginByPassword } from "api/mine";

export default {
  name: "Login",
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      titles: ["密码登录", "短信登录"],
      currentIndex: 0,
      isUser: true,
      isDisabled: false,
      ruleForm: {
        username: "",
        pass: "",
        phone: "",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { validator: checkPhone, trigger: "blur" },
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      if (index == 0) {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
      this.$refs.ruleForm.clearValidate();
    },
    toPassword() {
      this.$router.push("/change");
    },
    toRegister() {
      this.$router.push("/register");
    },
    sendCode() {
      this.$refs.ruleForm.validateField("phone", valid => {
        if (valid === "") {
          this.isDisabled = true;
          let that = this;
          let time = 60;
          // console.log(this.$refs.sentCode);
          let obj = this.$refs.sentCode;
          let timer = setInterval(function() {
            if (time == 0) {
              clearInterval(timer);
              that.isDisabled = false;
              obj.innerHTML = "重新发送";
            } else {
              obj.innerHTML = time + " 秒可重发";
              time--;
            }
          }, 1000);
          sendSms(this.ruleForm.phone).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    login(formName) {
      // console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("success");
          if (this.isUser) {
            // console.log(this.ruleForm.username);
            // console.log(this.ruleForm.pass);
            loginByPassword(this.ruleForm.username, this.ruleForm.pass).then(
              res => {
                console.log(res);
                if (res.data.code == 200) {
                  // console.log("成功");
                  this.setSessionAndLogin(res.data);
                } else {
                  this.$message.error(res.data.message);
                }
              }
            );
          } else {
            // console.log(this.ruleForm.phone);
            // console.log(this.ruleForm.code);
            loginByMessage(this.ruleForm.phone, this.ruleForm.code).then(
              res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.setSessionAndLogin(res.data);
                } else {
                  this.$message.error(res.data.message);
                }
              }
            );
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    setSessionAndLogin(data) {
      sessionStorage.setItem("userId", data.data.userId);
      sessionStorage.setItem("phone", data.data.phone);
      sessionStorage.setItem("username", data.data.username);
      sessionStorage.setItem("avatarPath", data.data.avatarPath);
      sessionStorage.setItem("roleName", data.data.roleName);
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem('shopName', data.data.shopName);
      this.$message.success("恭喜您，登录成功");
      this.$router.push("/");
      // console.log(data);
    }
  }
};
</script>

<style scoped>
.title {
  margin: 10px 0 30px 0;
}
.title a {
  height: 18px;
  padding-bottom: 5px;
  margin: 9px 10px 0 0;
  font-weight: 700;
  font-size: 16px;
  color: #3c3c3c;
}
.actived {
  border-bottom: 2px solid #000;
}
.login-btn button {
  width: 100%;
  height: 42px;
  color: #fff;
  font-size: 16px;
  background-color: #ff0036;
  border-color: #ff0036;
}
.login-block {
  height: 20px;
  margin: 20px 0;
}
.login-block ul li {
  float: right;
}
.login-block ul li a {
  margin: 0 5px;
  font-size: 12px;
  color: #6c6c6c;
}
.code {
  position: relative;
}
.send-btn {
  position: absolute;
  right: 10px;
  top: 1px;
  width: 80px;
  height: 38px;
  font-size: 12px;
  text-align: center;
  color: #6c6c6c;
  background: #fff;
  cursor: pointer;
}
</style>