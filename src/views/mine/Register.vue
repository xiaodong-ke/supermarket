<template>
  <div class="register">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row type="flex" class="center">
        <el-col :span="5">
          <el-form-item label-width="70px">
            <span>
              <font color="pink" size="5">
                <strong>注册页面</strong>
              </font>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="form.email" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="省/市/区" prop="PCA">
          <el-cascader
            :options="options"
            :props="{value: 'label',label: 'label',children: 'children'}"
            v-model="form.PCA"
            style="width:300px"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择" @change="roleFun" style="width:300px">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center" v-show="isShow">
        <el-form-item label="店铺名" prop="shopName">
          <el-input placeholder="请输入店铺名" v-model="form.shopName" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="center">
        <el-form-item label="详细地址" prop="address">
          <el-input placeholder="请输入地址" v-model="form.address" style="width:300px"></el-input>
        </el-form-item>
      </el-row>

      <el-row type="flex" class="center">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">注册</el-button>
          <el-button @click="$refs['form'].resetFields()">重置</el-button>
          <el-button @click="back('form')">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import option from './pca'

import axios from "axios";
export default {
  data() {
    return {
      /**角色状态 */
      isShow: false,
      options1: [
        {
          value: "0",
          label: "买家"
        },
        {
          value: "1",
          label: "卖家"
        }
      ],
      value: "",

      options: option,

      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
        PCA: "",
        shopName: "",
        address: "",
        role: ""
      },

      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号，必须11位",
            trigger: "blur"
          },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "邮箱格式不对",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      let formdata = new FormData();
      formdata.append("username", this.form.username);
      formdata.append("password", this.form.password);
      formdata.append("phone", this.form.phone);
      formdata.append("email", this.form.email);
      formdata.append("province", this.form.PCA[0]);
      formdata.append("city", this.form.PCA[1]);
      formdata.append("area", this.form.PCA[2]);
      formdata.append("detailAddress", this.form.address);
      formdata.append("role", this.form.role);
      if (this.form.role === "1") {
        formdata.append("shopName", this.form.shopName);
      }

      axios
        .post("http://106.55.151.225:8888/user/register", formdata)
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success('恭喜您注册成功，正在跳转到登录页面');
            this.$router.push('/login');
          } else {
            this.$message.error(res.data.message);
          }
        });
        // console.log(this.form.username);
    },

    //**判断角色 */
    roleFun() {
      if (this.form.role === "1") {
        this.isShow = true;
        // console.log(this.isShows);
      } else {
        this.isShow = false;
      }
    },
    back() {
      this.$router.push("/login");
    }
  }
};
</script>

<style >
.center {
  text-align: center;
  justify-content: center;
}

.register {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://cdn.colorhub.me/DVXWIzt4XE25XHRoWDsvGUr9tqf06bDaveJXFIHf1uo/auto/0/500/ce/0/bG9jYWw6Ly8vMTIv/MGUvZTNjOWY3ZTY2/Zjg3MmMyMThlYTVl/MWUyYTA5NTU4MTQx/MGEwMTIwZS5qcGVn.jpg);
  background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
}
</style>


