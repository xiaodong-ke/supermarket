<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/sellers/home"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/sellers/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/sellers/addGoods">添加商品</el-menu-item>
            <el-menu-item index="/sellers/goodlist">商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/sellers/orderlist">
          <i class="el-icon-document"></i>
          <span slot="title">订单列表</span>
        </el-menu-item>
        <el-menu-item index="/sellers/message">
          <i class="el-icon-document"></i>
          <span slot="title">留言列表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-dropdown>
          <el-avatar shape="square" size="large" :src="imgUrl || squareUrl" class="photograph"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toHome">返回首页</el-dropdown-item>
            <el-dropdown-item @click.native="toLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from 'api/user'

export default {
  name: "Admin",
  computed: {
    username() {
      return sessionStorage.getItem('username');
    }
  },
  created() {
    getUserInfo(this.username).then(res => {
      // console.log(res)
      if (res.data.code == 200) {
        let data = res.data.data;
        this.shopName = data.shopName
        this.imgUrl = data.avatarPath
      }
    })
  },
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      userId: '',
      shopName: '',
      imgUrl: ''
    };
  },
  methods: {
    toHome() {
      // console.log('home')
      this.$router.push('/')
    },
    toLogout() {
      // console.log('logout')
      this.$router.replace('/login');
      sessionStorage.clear();
    }
  }
};
</script>

<style scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-dropdown {
  float: right;
  margin-top: 10px;
  width: 40px;
  height: 40px;
}
</style>