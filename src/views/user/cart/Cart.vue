<template>
  <div>
    <div class="w">
      <cart-list :cartList="cartList" :userId="userId"/>
    </div>
  </div>
</template>

<script>
import { getUserCart } from "api/user";

import CartList from "./childrenComp/CartList";

export default {
  name: "Cart",
  components: {
    CartList
  },
  created() {
    this.userId = this.$route.params.userId;
    this.getCartData();
    this.$bus.$on("refresh", () => {
      // console.log("重新获取数据");
      this.getCartData();
    });
  },
  data() {
    return {
      userId: "",
      cartList: []
    };
  },
  methods: {
    getCartData() {
      getUserCart(this.userId).then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          this.cartList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
        
      });
    }
  }
};
</script>

<style scoped>
</style>