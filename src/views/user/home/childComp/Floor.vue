<template>
  <div>
    <div class="w floor">
      <div class="floor-head">
        <span></span>
        <p>{{obj.categoryName}}</p>
      </div>
      <div class="floor-body clearfix">
        <div class="big-banner">
          <!-- <img src="~assets/images/big-banner.jpg" alt /> -->
          <img :src="image" alt />
        </div>
        <div class="middle-column-con">
          <div class="floor-item" v-for="(item, index) in obj.list.slice(0,8)" :key="index" @click="toDetail(item.productId)">
            <!-- <img :src="item.productImageList[0].imageUrl" alt class="floor-item-img" /> -->
            <div v-if="item.productImageList[0]">
              <img :src="item.productImageList[0].imageUrl" alt class="floor-item-img" />
            </div>
            <div class="floor-item-title" :title="item.title">{{item.title}}</div>
            <p class="floor-price">￥{{item.outPrice}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: {
    obj: {
      type: Object,
      default() {
        return {};
      }
    },
    image: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // showImage: require(this.image)
    }
  },
  methods: {
    toDetail(productId) {
      this.$router.push('/detail/' + productId)
    }
  }
};
</script>

<style scoped>
.floor {
  margin-top: 20px;
}
.floor-head {
  background-color: #fdf4ed;
  height: 40px;
}
.floor-head span {
  float: left;
  width: 4px;
  height: 20px;
  background: #e96f1e;
  margin-top: 10px;
}
.floor-head p {
  float: left;
  margin-left: 11px;
  font-size: 18px;
  color: #e96f1e;
  line-height: 40px;
}
.big-banner {
  float: left;
}
.big-banner img {
  width: 235px;
  height: 618px;
}

.floor-item {
  float: left;
  width: 197px;
  height: 309px;
  padding: 20px 0;
  text-align: center;
  cursor: pointer;
}
.floor-item:hover {
  border: 2px solid #f5f5f5;
}
.floor-item img {
  width: 185px;
  height: 185px;
}
.floor-item-title {
  width: 135px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  margin: 5px auto;

  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
.floor-price {
  font-size: 18px;
  color: #ff0036;
  line-height: 18px;
}
</style>