<template>
  <div>
    <div class="shop">
      <span>店铺: </span>
      <span class="shop-name">{{item.shopName}}</span>
    </div>
    <div class="goods-detail">
      <div class="item-content item-0 fl">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </div>
      <div class="item-content item-1 fl">
        <!-- <div>套餐类型：官方标配</div> -->
        {{item.specification}}
      </div>
      <div class="item-content item-2 fl">{{ unitPrice }}</div>
      <div class="item-content item-3 fl">{{item.count}}</div>
      <div class="item-content item-4 fl">{{item.payMoney}}</div>
    </div>

    <div class="accounts">
      <div>
        <span>给卖家留言: </span>
        <span>
          <textarea placeholder="选填" maxlength="100" v-model="message"></textarea>
        </span>
      </div>
      <div class="total">
        <span class="label">店铺合计：</span>
        <span style="color: #ff0036">￥ {{item.payMoney}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmItem",
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {
    unitPrice() {
      return this.item.payMoney / this.item.count;
    }
  }
};
</script>

<style scoped>
.shop {
  height: 30px;
  margin-top: 15px;
  color: #333;
  font-weight: 700;
}
.shop-name {
  font-weight: 400;
  color: #3c3c3c
}
.goods-detail {
  border-top: 1px solid #b2d1ff;
  height: 75px;
}

.item-content {
  height: 75px;
  line-height: 20px;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  color: #3c3c3c;
  padding: 10px 0 10px 10px;
}
.item-0 {
  position: relative;
  width: 400px;
}
.item-0 img {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
}
.item-0 .title {
  width: 320px;
  margin-left: 50px;
  padding-left: 10px;
  vertical-align: top;
  text-align: left;
}
.item-1 {
  width: 180px;
}
.item-2 {
  width: 180px;
}
.item-3 {
  width: 140px;
}
.item-4 {
  width: 120px;
  font-weight: 700;
  color: #ff0036;
  font-size: 14px;
  font-family: verdana;
}
.accounts {
  display: flex;
  height: 60px;
  margin-top: 4px;
}
.accounts > div {
  flex: 1;
  padding: 10px;
  background-color: #f2f7ff;
}
.accounts div:nth-child(1) {
  border: 1px solid #fff;
}
.accounts div:nth-child(1) span:nth-child(1) {
  vertical-align: top;
  margin-right: 10px;
  color: #333;
}
.accounts textarea {
  resize: none;
  width: 400px !important;
  height: 40px !important;
  padding: 3px;
}
.total {
  text-align: right;
  font-family: verdana;
  color: #333;
  font-size: 14px;
  font-weight: 700;
  line-height: 40px;
}
</style>