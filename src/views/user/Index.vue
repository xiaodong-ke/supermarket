<template>
  <div>
    <top-bar>
      <ul slot="left" id="ul1">
        <li>欢迎来到超市</li>
        <li @click="toHome">
          <a href="javascript:;">首页</a>
        </li>
        <li @click="toLogin" >
          <a href="javascript:;" v-if="username == null">请登录</a>
        </li>
        <li @click="toRegister" v-if="username == null" >
          <a href="javascript:;">快速注册</a>
        </li>
      </ul>
      <ul slot="right" id="ul2">
        <li @click="toOrder">我的订单</li>
        <li @mouseenter="isShow=true"  @mouseleave="isShow=false" @click="toInfo" id="username" v-if="username != null">
          我的资料
          <div class="info" v-show="isShow">
            <img :src="imgUrl" :onerror='placeholdImg' alt="">
            <span>{{username}}</span>
            <p>
              <a href="javascript:;" @click="toInfo">设置</a>
              <span>|</span>
              <a href="javascript:;" @click.stop="toLogout">退出</a>
            </p>
          </div>
        </li>
        <li v-if="roleName == '商家'" @click="toShop">我的店铺</li>
      </ul>
    </top-bar>
    <Header></Header>
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script>

import TopBar from "components/content/TopBar";
import Header from "components/content/Header";
import Footer from "components/content/Footer";

export default {
  name: "index",
  components: {
    TopBar,
    Header,
    Footer
  },
  data() {
    return {
      isShow: false,
      placeholdImg: 'this.src="' + require('@/assets/images/touxiang.jpg') + '"',
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    toOrder() {
      this.$router.push("/order");
    },
    toInfo() {
      this.$router.push("/info")
    },
    toLogout() {
      sessionStorage.clear();
      this.$router.push("/login")
    },
    toShop() {
      this.$router.push('/sellers')
    },
    toHome() {
      this.$router.push('/home')
    }
  },
  computed: {
    imgUrl() {
      return sessionStorage.getItem('avatarPath');
    },
    username() {
      return sessionStorage.getItem('username');
    },
    roleName() {
      return sessionStorage.getItem('roleName');
    }
  }
};
</script>

<style scoped>
#ul1 li {
  float: left;
  margin-right: 15px;
  color: #999;
}
#ul1 li a {
  color: #999;
}
#ul1 li a:hover {
  color: #F10215;
}
#ul2 li {
  float: right;
  margin-left: 15px;
  color: #999;
  cursor: pointer;
}
#username {
  position: relative;
}
.info {
  position: absolute;
  top: 35px;
  right: 0;
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 1px solid #eee;
  background-color: #fff;
  z-index: 1;
}
.info img {
  float: left;
  width: 80px;
  height: 80px;
}
.info>span {
  display: inline-block;
  padding: 20px 5px;
  width: 85px;
  overflow: hidden;
  font-size: 14px;
}
.info p {
  position: absolute;
  top: 0;
  right: 10px;
}
.info p a {
  color: #999;
}
.info p span {
  margin: 0 5px;
}
</style>