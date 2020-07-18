<template>
  <div class="head-logo">
    <div class="w head-inner">
      <div class="logo" @click="toHome">
        <img :src="imgUrl" alt="">
      </div>
      <div class="search">
        <input type="text" placeholder="请输入您要搜索的东西" v-model="product"/>
        <button @click="searchProduct">搜索</button>
      </div>
      <div class="cart" @click="toCart">购物车</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      product: '',
      imgUrl: require('@/assets/images/logo.jpeg')
    }
  },
  methods: {
    toCart() {
      this.$router.push('/cart/' + this.userId)
    },
    toHome() {
      this.$router.push('/')
    },
    searchProduct() {
      if (this.product.trim() == '') {  
        this.$message('您没有输入任何关键字哦!')
      } else {
        this.$router.push({
          path: '/query',
          query: {
            product: this.product
          }
        })
      }
    }
  },
  computed: {
    userId() {
      return sessionStorage.getItem('userId');
    }
  }
};
</script>

<style scoped>
.head-logo {
  height: 130px;
  background-color: #fff;
}
.head-inner {
  position: relative;
}
.logo {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 100px;
  /* background-color: pink; */
  cursor: pointer;
}
.logo img {
  width: 200px;
  height: 100px;
}
.search {
  position: absolute;
  left: 345px;
  top: 25px;
  width: 500px;
  height: 40px;
  border: 2px solid #ff2832;
}
.search input {
  width: 436px;
  height: 34px;
  line-height: 36px;
  padding: 10px;
  font-size: 16px;
  border: 0;
}
.search button {
  width: 60px;
  height: 36px;
  line-height: 35px;
  background-color: #ff2832;
  border: 1px solid transparent;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
.cart {
  position: absolute;
  right: 0;
  top: 25px;
  width: 130px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  background-color: #f6f7f9;
  border: 1px solid #eee;
  border-radius: 20px;
  cursor: pointer;
}
</style>