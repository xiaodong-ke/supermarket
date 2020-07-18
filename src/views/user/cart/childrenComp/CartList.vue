<template>
  <div>
    <div class="w">
      <div class="cart-bar">
        <div class="all">全部商品</div>
        <span class="num">{{cartList.length}}</span>
      </div>

      <div class="cart-main">
        <div class="cart-checkbox fl">
          <input type="checkbox" v-model="checkAll" @change="checkAllChange" />
          <span>全选</span>
        </div>
        <div class="cart-goods fl">商品</div>
        <div class="cart-props fl"></div>
        <div class="cart-price fl">单价</div>
        <div class="cart-quantity fl">数量</div>
        <div class="cart-sum fl">小计</div>
        <div class="cart-action fl">操作</div>
      </div>
      <cart-item
        v-for="(item,index) in cartList"
        :key="index"
        :item="item"
        @changeBox="changeBox"
        ref="cartItem"
        @changeVolume="changeVolume"
      />
      <div v-if="cartList.length == 0">购物车为空</div>
      <div class="options-box clearfix">
        <div class="select-all fl">
          <input type="checkbox" v-model="checkAll" @change="checkAllChange" /> 全选
        </div>
        <div class="select-delete fl" @click="removeSelected">
          <a href="javascript:;">删除选中商品</a>
        </div>
        <div class="normal">
          <div class="btn-area fr" @click="toAccounts">去结算</div>
          <div class="price-sum fr">
            <span>总价:</span>
            <!-- <em>¥11193.00</em> -->
            <em>¥ {{ totalMoney }}</em>
          </div>
          <!-- <div class="amount-sum fr">
            已选择
            <em>9</em> 件商品
          </div>-->
          <div class="amount-sum fr">
            已选择
            <em>{{ sum }}</em> 件商品
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeCart } from "api/user";

import CartItem from "./CartItem";

export default {
  name: "CartList",
  components: {
    CartItem
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkAll: false,
      checkboxAll: []
    };
  },
  methods: {
    changeBox(b, item) {
      // console.log(b);
      // console.log(item);
      if (b) {
        this.checkboxAll.push(item);
        // console.log(this.checkboxAll);
      } else {
        this.checkboxAll = this.checkboxAll.filter(value => {
          return value !== item;
        });
      }
    },
    // 点击全选按钮
    checkAllChange() {
      // console.log(this.$refs.cartItem);
      // cartItem 中的 checked 与 checkAll 保持一致
      // console.log(this.userId);
      this.checkboxAll = [];
      this.$refs.cartItem.forEach(value => {
        value.checked = this.checkAll;
        if (value.checked) {
          this.checkboxAll.push(value.item);
        } else {
          this.checkboxAll = [];
        }
      });
    },
    removeSelected() {
      if (this.checkboxAll.length === 0) {
        this.$message("您没有选择哦!");
      } else {
        this.checkboxAll.forEach(value => {
          // console.log(this.userId);
          removeCart(value.cartId, this.userId).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.$bus.$emit("refresh");
              this.checkAll = false;
              this.checkboxAll = []
            } else {
              this.$message.error(res.data.message)
            }
          });
        });
      }
    },
    changeVolume(cartId, flag, val) {
      // console.log(cartId);
      // console.log(flag);
      if (flag == 0) {
        this.checkboxAll = this.checkboxAll.filter(value => {
          return value.cartId !== cartId;
        });
      } else {
        // console.log("修改了数量");
        // console.log(val);
        this.checkboxAll.forEach(value => {
          // console.log(value);
          if (value.cartId == cartId) {
            value.count = val;
          }
        });
      }
    },
    // 去结算
    toAccounts() {
      // console.log('结算')
      if (this.checkboxAll.length == 0) {
        // console.log("没有勾选商品");
        this.$message.error('您没有勾选商品');
      } else {
        // console.log(this.checkboxAll);
        this.$router.push("/confirm");
      }
    }
  },
  watch: {
    // 监听 checkboxAll
    checkboxAll(newVal, oldVal) {
      // console.log(newVal);
      // console.log(oldVal)
      // console.log(newVal.length);
      if (newVal.length === this.cartList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }
  },
  computed: {
    sum() {
      let num = 0;
      this.checkboxAll.forEach(value => {
        num += value.count;
      });
      return num;
    },
    totalMoney() {
      let total = 0;
      this.checkboxAll.forEach(value => {
        total += value.payMoney;
      });
      return total;
    }
  },
  beforeDestroy() {
    this.$bus.$emit("confirmOrder", this.checkboxAll);
  }
};
</script>

<style scoped>
.cart-bar {
  position: relative;
  width: 100px;
  height: 40px;
  padding-left: 5px;
}
.all {
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
  color: #ff0036;
  text-align: left;
}
.num {
  position: absolute;
  top: 11px;
  right: 8px;
  width: 20px;
  height: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #ff0036;
}
.cart-main {
  height: 43px;
  border: 1px solid #e9e9e9;
  padding: 5px 0;
  background-color: #f3f3f3;
}
.cart-checkbox {
  width: 122px;
  height: 18px;
  padding: 7px 0 0 11px;
  line-height: 18px;
  vertical-align: middle;
}
.cart-checkbox input,
.cart-checkbox span {
  vertical-align: middle;
  margin-right: 10px;
}
.cart-goods {
  width: 208px;
  height: 32px;
  padding-top: 7px;
}
.cart-props {
  width: 170px;
  height: 32px;
  padding: 0 20px;
}
.cart-price {
  width: 160px;
  height: 32px;
  padding-top: 7px;
}
.cart-quantity {
  width: 80px;
  height: 32px;
  padding-top: 7px;
}
.cart-sum {
  width: 140px;
  height: 32px;
  padding-top: 7px;
}
.cart-action {
  width: 75px;
  height: 32px;
  padding-top: 7px;
}
.options-box {
  border: 1px solid #f0f0f0;
}
.select-all {
  width: 54px;
  padding-top: 10px;
  padding-left: 10px;
}
.select-delete {
  width: 100px;
  padding-left: 20px;
  padding-top: 10px;
}
.btn-area {
  width: 94px;
  height: 52px;
  font-size: 20px;
  text-align: center;
  line-height: 52px;
  background-color: #e64347;
  color: #fff;
  cursor: pointer;
}
.price-sum {
  width: 170px;
  text-align: right;
  padding-top: 10px;
  padding-right: 20px;
}
.price-sum span {
  color: #999;
}
.price-sum em {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
  margin: 0 5px;
}
.amount-sum {
  padding-top: 10px;
  width: 100px;
  color: #999;
}
.amount-sum em {
  font-weight: 700;
  color: #e2231a;
}
</style>