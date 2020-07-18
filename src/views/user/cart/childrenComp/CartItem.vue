<template>
  <div class="cart-item">
    <!-- <div class="shop">锐锐家居日用专营店</div> -->
    <div class="shop">{{ item.shopName }}</div>
    <div class="item-form">
      <div class="item-form-goods fl">
        <!-- <img src="~assets/images/cart1.jpg" alt class="fl"/> -->
        <img :src="item.image" alt class="fl" />
        <!-- <div class="item-form-name fl">单人沙发布艺北欧客厅沙发美式老虎椅复古沙发电脑椅咖啡厅沙发椅 灰色千鸟格 布 单人</div> -->
        <div class="item-form-name fl">{{ item.title}}</div>
      </div>
      <!-- <div class="item-form-props fl">灰色千鸟格 布</div> -->
      <div class="item-form-props fl">{{ item.specification}}</div>
      <!-- <div class="item-form-price fl"><strong>¥721.00</strong></div> -->
      <div class="item-form-price fl">
        <strong>¥ {{ unitPrice }}</strong>
      </div>
      <div class="item-form-quantity fl">
        <a href="javascript:;" @click="decrease">-</a>
        <!-- <input type="text" value="1"> -->
        <!-- <input type="text" :value="item.count" /> -->
        <!-- <input type="text" :value="value" @change.lazy="valueChange($event)"/> -->
        <input type="number" :value="value" @change="valueChange($event)" />
        <a href="javascript:;" @click="increase">+</a>
      </div>
      <!-- <div class="item-form-sum fl"><strong>¥5047.00</strong></div> -->
      <div class="item-form-sum fl">
        <strong>¥ {{item.payMoney}}</strong>
      </div>
      <div class="item-form-option fl" @click="deleteItem">删除</div>
    </div>
    <div class="checkbox">
      <!-- <input type="checkbox" v-model="checked" @change="changeBox" /> -->
      <input type="checkbox" v-model="checked" @change="changeBox" />
    </div>
  </div>
</template>

<script>
import { removeCart, updateCartCount } from "api/user";

export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      value: this.item.count,
      checked: false
    };
  },
  computed: {
    unitPrice() {
      return this.item.payMoney / this.item.count;
    },
    userId() {
      return sessionStorage.getItem('userId');
    }
  },
  watch: {
    item(newVal) {
      // console.log(newVal);
    }
  },
  methods: {
    // 数量减1，同时发生请求
    decrease() {
      // alert("-");
      if (this.value <= 1) {
        return;
      }
      this.value--;
      this.updateCount(this.value);
    },
    // 数量加1，同时发生请求
    increase() {
      // alert("+");
      this.value++;
      this.updateCount(this.value);
    },
    // 自定义改变数量，同时发生请求
    valueChange(e) {
      // console.log('change')
      // console.log(e.target.value);
      let value = this.value;
      if (e.target.value <= 0) {
        // this.value = value;
        this.$message.error("请不要输入1以下的数字哦");
        this.$bus.$emit("refresh");
        return;
      }
      this.value = e.target.value;
      this.updateCount(e.target.value);
    },
    deleteItem() {
      // console.log(this.item.cartId);
      removeCart(this.item.cartId, this.userId).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(this.item.cartId);
          this.$emit("changeVolume", this.item.cartId, "0");
          this.$bus.$emit("refresh");
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    updateCount(value) {
      // console.log(value);
      updateCartCount(this.userId, this.item.cartId, value).then(
        res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$emit("changeVolume", this.item.cartId, "1", value);
            this.$bus.$emit("refresh");
          } else {
            this.$message.error("更新失败");
          }
        }
      );
    },
    changeBox() {
      // console.log(this.checked);
      this.$emit("changeBox", this.checked, this.item);
    }
  }
};
</script>

<style scoped>
.cart-item {
  position: relative;
  margin: 15px 0;
  height: 148px;
}
.shop {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  color: #666;
  font-size: 12px;
}
.item-form {
  height: 118px;
  padding-left: 30px;
  padding-top: 15px;
  color: #666;
  background-color: #fff4e8;
}
.item-form-goods > img {
  width: 80px;
  height: 80px;
}
.item-form-name {
  width: 208px;
  height: 56px;
  padding-left: 10px;
}
.item-form-props {
  width: 130px;
  padding-left: 20px;
}
.item-form-price {
  width: 150px;
  height: 20px;
  padding-left: 40px;
  color: #333;
}
.item-form-quantity {
  width: 80px;
  height: 67px;
  margin-left: 35px;
}
.item-form-quantity a {
  float: left;
  width: 16px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #cacbcb;
  background-color: #fff;
  color: #666;
  text-align: center;
}
.item-form-quantity input {
  float: left;
  width: 42px;
  height: 20px;
  border: 1px solid #cacbcb;
  line-height: 18px;
  text-align: center;
  color: #333;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.item-form-sum {
  width: 100px;
  height: 20px;
  padding-left: 20px;
  color: #333;
}
.item-form-option {
  padding-left: 65px;
  cursor: pointer;
}
.checkbox {
  position: absolute;
  top: 50px;
  left: 11px;
}
</style>