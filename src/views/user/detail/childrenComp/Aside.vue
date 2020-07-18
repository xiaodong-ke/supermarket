<template>
  <div class="aside">
    <!-- <div class="shop-name">信勋服饰专营店</div> -->
    <div class="shop-name">{{ shopName }}</div>
    <div class="shop-info">
      <h4>店铺星级 ★★★</h4>
      <h4>商品评价 8.89 中</h4>
      <h4>物流履约 9.57 高</h4>
      <h4>售后服务 9.20 高</h4>
    </div>
    <!-- <div class="shop">
      <div>进店逛逛</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: {
    shopName: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.aside {
  float: left;
  width: 210px;
  height: 180px;
  border: 1px solid #eee;
}
.shop-name {
  width: 210px;
  height: 40px;
  padding-left: 5px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #666;
  background-color: #f7f7f7;
  border: 1px solid #eee;
}
.shop-info {
  width: 188px;
  height: 124px;
  /* border-bottom: 1px solid #eee; */
}
.shop-info h4 {
  height: 31px;
  line-height: 31px;
  font-size: 12px;
  color: #666;
  padding-left: 10px;
}
/* .shop {
  width: 188px;
  height: 56px;
}
.shop div {
  width: 90px;
  height: 36px;
  margin: 10px auto;
  text-align: center;
  line-height: 36px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
} */
</style>