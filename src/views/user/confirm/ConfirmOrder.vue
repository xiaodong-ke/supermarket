<template>
  <div class="w">
    <div class="header-title">
      <h2>确认收货地址</h2>
    </div>
    <div class="container">
      <span>{{ address.province }} {{ address.city }} {{ address.area }} {{ address.detailAddress }}</span>
      <span @click="addressDialog = true">修改本地址</span>

      <el-dialog title="修改地址" :visible.sync="addressDialog" width="30%">
        <el-form label-position="right" label-width="80px" :model="formAddress">
          <el-form-item label="地址信息">
            <v-distpicker province="广东省" city="广州市" area="海珠区" @selected="onSelected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="formAddress.detailAddress"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressDialog = false">取 消</el-button>
          <el-button type="primary" @click="holdAddress">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="header-title">
      <h2>确认订单信息</h2>
    </div>
    <div class="item-headers">
      <div class="item-headers-content item-headers-0">店铺宝贝</div>
      <div class="item-headers-content item-headers-1">商品属性</div>
      <div class="item-headers-content item-headers-2">单价</div>
      <div class="item-headers-content item-headers-3">数量</div>
      <div class="item-headers-content item-headers-4">小计</div>
    </div>

    <confirm-item ref="confirmItem" v-for="(item, index) in goodsList" :key="index" :item="item" />

    <div class="order-payInfo">
      <div class="box">
        <div class="box-wrapper">
          <div class="box-shadow">
            <div>
              <span class="pay-title">实付款: </span>
              <span class="pay-price-symbol">¥ </span>
              <span class="pay-price">{{ totalMoney }}</span>
            </div>
            <div class="confirmAddr">
              <span class="confirmAddr-title">寄送到:</span>
              <span>{{ address.province }} {{ address.city }} {{ address.area }} {{ address.detailAddress }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="submitOrder">
      <div class="wrapper">
        <a href="javascript:;" @click="toCart">
          <i class="el-icon-refresh-right"></i> 返回购物车
        </a>
        <a href="javascript:;" @click="addUserOrder">提交订单</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddress, updateAddress, addOrder } from "api/user";

import VDistpicker from "v-distpicker";

import ConfirmItem from "./childrenComp/ConfirmItem";

export default {
  name: "confirmOrder",
  components: {
    ConfirmItem,
    VDistpicker
  },
  created() {
    this.$bus.$on("confirmOrder", goods => {
      // console.log(goods);
      this.goodsList = goods;
      // console.log(this.goodsList);
    });
    this.getUserAddress();
  },
  computed: {
    totalMoney() {
      let sum = 0;
      this.goodsList.forEach(value => {
        sum += value.payMoney;
      });
      return sum;
    },
    userId() {
      return sessionStorage.getItem("userId");
    }
  },
  data() {
    return {
      goodsList: [],
      address: {},
      addressDialog: false,
      formAddress: {
        address: {
          province: "",
          city: "",
          county: ""
        },
        detailAddress: ""
      },
      productList: []
    };
  },
  methods: {
    toCart() {
      this.$router.push("/cart/" + this.userId);
    },
    getUserAddress() {
      getAddress(this.userId).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // console.log(res.data.data);
          this.address = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    holdAddress() {
      // console.log(this.formAddress);
      updateAddress(
        this.formAddress.address.province,
        this.formAddress.address.city,
        this.formAddress.address.county,
        this.formAddress.detailAddress,
        this.userId
      ).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.addressDialog = false;
          this.getUserAddress();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    onSelected(data) {
      this.formAddress.address.province = data.province.value;
      this.formAddress.address.city = data.city.value;
      this.formAddress.address.county = data.area.value;
    },
    addUserOrder() {
      // console.log(this.$refs.confirmItem);
      this.productList = [];
      this.$refs.confirmItem.forEach(value => {
        // console.log(value);
        let obj = {};
        obj.productId = value.item.productId;
        obj.count = value.item.count;
        obj.message = value.message;
        this.productList.push(obj);
      });
      // console.log(this.productList);
      // console.log(JSON.stringify(this.productList));
      // console.log(this.totalMoney)
      // addOrder('1272443982005145601', JSON.stringify(this.productList), this.totalMoney).then(res => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //     this.$message.success("购买成功")
      //   }
      // })
      let formdata = new FormData();
      formdata.append("userId", this.userId);
      formdata.append("productList", JSON.stringify(this.productList));
      formdata.append("totalMoney", this.totalMoney);
      addOrder(formdata).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("购买成功");
          this.$router.replace("/order");
        } else {
          this.$message.error(res.data.message);
          // this.$router.push("/cart/" + this.userId);
        }
      });
    }
  }
};
</script>

<style scoped>
.header-title {
  height: 25px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 5px;
}
.header-title h2 {
  font-weight: 700;
  font-family: verdana;
  font-size: 14px;
  color: #333;
  line-height: 26px;
}
.container {
  position: relative;
  height: 30px;
  padding-left: 100px;
  line-height: 32px;
  margin-bottom: 20px;
  border: 1px solid #f3f3f3;
}
.container span:nth-child(2) {
  position: absolute;
  top: 0;
  right: 15px;
  cursor: pointer;
}
.item-headers {
  margin-top: 20px;
  color: #6c6c6c;
}
.item-headers-content {
  height: 25px;
  line-height: 20px;
  text-align: center;
  display: inline-block;
  border-bottom: 3px solid #b2d1ff;
  font-size: 12px;
  margin-left: 1px;
  margin-bottom: 10px;
}
.item-headers-0 {
  width: 400px;
  margin-left: 0;
}
.item-headers-1 {
  width: 180px;
}
.item-headers-2 {
  width: 180px;
}
.item-headers-3 {
  width: 140px;
}
.item-headers-4 {
  width: 120px;
}

.order-payInfo {
  height: 130px;
  border-top: 1px dotted rgb(221, 221, 221);
}
.order-payInfo .box {
  margin-top: 15px;
  text-align: right;
}
.box-wrapper {
  height: 115px;
  border: 1px solid #ff0036;
  display: inline-block;
}
.box-shadow {
  height: 112px;
  border: 3px solid #fff0e8;
  min-width: 231px;
  padding: 10px 5px 10px 20px;
}
.pay-title {
  font-weight: 700;
  color: #333;
  font-size: 12px;
}
.pay-price-symbol {
  font-size: 26px;
  margin-right: 4px;
  color: #999;
}
.pay-price {
  color: rgb(255, 0, 54);
  font: 700 26px tahoma;
  line-height: 1.5;
}
.confirmAddr {
  margin-top: 10px;
  line-height: 1.6;
  color: #333;
}
.confirmAddr .confirmAddr-title {
  font-weight: 700;
}

.submitOrder {
  height: 44px;
  text-align: right;
}
.submitOrder .wrapper {
  width: 320px;
  height: 44px;
  display: inline-block;
}
.submitOrder .wrapper a:nth-child(1) {
  color: #36c;
  text-decoration: none;
  margin-right: 50px;
  line-height: 34px;
}
.submitOrder .wrapper a:nth-child(2) {
  display: inline-block;
  width: 182px;
  height: 39px;
  position: relative;
  vertical-align: middle;
  line-height: 39px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  background: #ff0036;
  color: #fff;
}
</style>
