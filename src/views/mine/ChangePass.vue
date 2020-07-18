<template>
  <div>
    <div class="title">
      <a href="javascript:;" class="actived">修改密码</a>
    </div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="70px"
      :rules="rules"
      hide-required-asterisk
    >
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
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <div class="password-btn">
        <button @click.prevent="change('ruleForm')">确认修改</button>
      </div>
    </el-form>
    <div class="password-block">
      <ul>
        <li>
          <a href="javascript:;" @click="toLogin">返回登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { sendSms, updatePassword } from "api/mine";

export default {
  name: "ChangePass",
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
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      ruleForm: {
        phone: "",
        code: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
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
    change(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(valid);
        if (valid) {
          // console.log("success");
          updatePassword(
            this.ruleForm.phone,
            this.ruleForm.code,
            this.ruleForm.pass
          ).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("恭喜您，修改密码成功");
              this.$router.push("/login");
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push("/login");
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
.password-btn button {
  width: 100%;
  height: 42px;
  color: #fff;
  font-size: 16px;
  background-color: #ff0036;
  border-color: #ff0036;
}

.password-block {
  height: 20px;
  margin: 15px 0 5px;
}
.password-block ul li {
  float: right;
}
.password-block ul li a {
  margin: 0 5px;
  font-size: 12px;
  color: #6c6c6c;
}
</style>