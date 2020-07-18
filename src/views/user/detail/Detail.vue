<template>
  <div class="detail">
    <go-back />
    <div class="w clearfix">
      <detail-head :obj="obj" :productId="productId" :specificationList="specificationList"
                    :imageUrl="imageUrl" :shopName="shopName"/>
    </div>
    <div class="w clearfix">
      <Aside :shop-name="shopName"/>
      <detail-body :parameter-list="parameterList" :productId="productId" :detailsImageList="detailsImageList" />
    </div>
  </div>
</template>

<script>
import { getProductDetail } from "api/user";

import GoBack from "components/content/GoBack";

import DetailHead from "./childrenComp/DetailHead";

import Aside from "./childrenComp/Aside";
import DetailBody from "./childrenComp/DetailBody";

export default {
  name: "Detail",
  components: {
    GoBack,
    DetailHead,
    Aside,
    DetailBody
  },
  created() {
    this.productId = this.$route.params.productId;
    getProductDetail(this.productId).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        let data = res.data.data;
        this.obj.title = data.product.title;
        this.obj.stock = data.product.stock;
        this.obj.productImageList = data.product.productImageList;
        this.obj.outPrice = data.product.outPrice;
        this.obj.sales = data.product.sales;
        this.specificationList = data.specificationList,
        this.shopName = data.product.shopName
        this.parameterList = data.parameterList;
        this.detailsImageList = data.product.detailsImageList;
        this.imageUrl = data.product.productImageList[0].imageUrl
      } else {
        this.$message.error(res.data.message)
      }
    });
  },
  data() {
    return {
      productId: "",
      obj: {
        title: '',
        stock: 0,
        image: '',
        outPrice: 0,
      },
      specificationList: [],
      shopName: '',
      parameterList: [],
      detailsImageList: [],
      imageUrl: ''
    };
  }
};
</script>

<style scoped>
</style>