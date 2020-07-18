<template>
  <div class="recommend-item" @click="itemClick">
    <!-- <img src="~assets/images/recommend.webp" alt /> -->
    <div v-if="item.productImageList[0]">
      <img :src="item.productImageList[0].imageUrl" alt />
    </div>
    <div class="item-info">
      <p class="item-name">{{item.title}}</p>
      <div class="item-price">
        <i>¥</i> 
        <span>{{item.outPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendItem",
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemClick() {
      this.$router.push('/detail/' + this.item.productId);
    }
  }
};
</script>

<style scoped>
.recommend-item {
  width: 20%;
  height: 300px;
  padding: 20px 5px;
  margin: 2px 0px;
  background-color: #fff;
  border: 5px solid #f4f4f4;
  text-align: center;
  cursor: pointer;
}
.recommend-item:hover {
  border-color: #dfdbdb;
}
.recommend-item img {
  width: 150px;
  height: 150px;
}
.item {
  padding: 0 3px;
}
.item-name {
  height: 48px;
  font-size: 14px;
  color: #666;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-price {
  font-size: 20px;
  margin-left: 10px;
  text-align: left;
  color: #e1251b;
}
.item-price i {
  font-style: normal;
}
</style>