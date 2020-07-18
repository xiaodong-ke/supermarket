<template>
  <div class="recommend">
    <div class="w">
      <div class="recommend-title">
        <span>猜你喜欢</span>
      </div>
      <div class="recommend-content">
        <recommend-item v-for="(item, index) in productList" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>

import RecommendItem from "./RecommendItem";

export default {
  name: "Recommend",
  components: {
    RecommendItem
  },
  props: {
    productList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // items: [{
      //   img: 'require()',
      //   title: '（2条99元）布衣门夏季薄款休闲裤中老年高腰宽松免烫商务长裤男装直筒男裤 薄款卡其色+米色 32码=2尺5腰围',
      //   price: 99
      // }]
    };
  },
  mounted() {
    // console.log(this.productList);
  }
};
</script>

<style scoped>
.recommend {
  background-color: #f4f4f4;
  padding: 10px;
}
.recommend-title {
  height: 44px;
  padding-top: 10px;
  color: #666;
  text-align: center;
}
.recommend-title span {
  position: relative;
  font-size: 18px;
}
.recommend-title span::before,
.recommend-title span::after {
  content: "";
  position: absolute;
  top: 8px;
  width: 30px;
  height: 1px;
  background-color: #979797;
}
.recommend-title span::before {
  left: -40px;
}
.recommend-title span::after {
  right: -40px;
}
.recommend-content {
  display: flex;
  flex-wrap: wrap;
}
</style>