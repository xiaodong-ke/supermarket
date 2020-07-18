<template>
  <div>
    <div class="detail-preview">
      <!-- <img src="~assets/images/detail.jpg" alt /> -->
      <img :src="imgUrl || imageUrl" alt />
      <!-- <div>{{obje[0].imageUrl}}</div> -->
      <!-- <div>{{obj.productImageList}}</div> -->
      <ul>
        <li v-for="(item, index) in obj.productImageList" :key="index">
          <!-- <img src="~assets/images/detail1.jpg" alt class="current" /> -->
          <img
            :src="item.imageUrl"
            alt
            :class="{current: currentIndex===index}"
            @mouseenter="showImg(index)"
          />
        </li>
        <!-- <li>
          <img src="~assets/images/detail2.jpg" alt />
        </li>-->
      </ul>
    </div>
    <div class="detail-info">
      <div class="detail-info-hd">
        <!-- <h1>运动服套装男夏季韩版潮流休闲跑步健身短袖短裤宽松速干两件套</h1> -->
        <h1>{{ obj.title }}</h1>
        <!-- <p>【速干透气】【宽松舒适】【吸湿排汗】</p> -->
      </div>
      <div class="detail-info-price">
        <span>价格：</span>
        <!-- <span>59.00</span> -->
        <span>{{obj.outPrice}}</span>
      </div>
      <div class="detail-sales">
        <ul>
          <li>月销量 {{ obj.sales }}</li>
          <li>累计评价 {{ count }}</li>
        </ul>
      </div>
      <div class="detail-choose">
        <div v-for="(item, index1) in specificationList" :key="index1" class="detail-choose-option">
          <div class="title">{{item.name}}</div>
          <span
            v-for="(item, index2) in item.value.split(',')"
            :key="index2"
            @click="valueClick(index1,index2)"
          >{{item}}</span>
        </div>
        <!-- <div class="detail-choose-size">
          <div class="title">尺码</div>
          <span>S</span>
          <span>M</span>
          <span>L</span>
          <span>XL</span>
          <span>XXL</span>
        </div>
        <div class="detail-choose-color">
          <div class="title">颜色分类</div>
          <span>红色</span>
          <span>白色</span>
          <span>黑色</span>
          <span>蓝色</span>
          <span>青色</span>
        </div>-->
        <div class="detail-choose-num">
          <div class="title">数量</div>
          <input type="number" min="1" :max="obj.stock" :value="sum" @change="valueChange($event)" />
          <div class="btn">
            <div class="decrease" @click="decrease">-</div>
            <div class="increase" @click="increase">+</div>
          </div>
          <div class="stock">( 库存 {{obj.stock}} )</div>
        </div>
        <div class="detail-choose-purchase">
          <div class="purchase" @click="purchase">立即购买</div>
          <div class="cart" @click="addToCart">加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addProductToCart, getCommentCount } from "api/user";

export default {
  name: "DetailHead",
  props: {
    obj: {
      type: Object,
      default() {
        return {};
      }
    },
    productId: {
      type: String,
      default: ""
    },
    specificationList: {
      type: Array,
      default() {
        return [];
      }
    },
    imageUrl: {
      type: String,
      default: ""
    },
    shopName: {
      type: String,
      default: ""
    }
  },
  computed: {
    userId() {
      return sessionStorage.getItem("userId");
    }
  },
  created() {
    getCommentCount(this.productId).then(res => {
      // console.log(res)
      if (res.data.code == 200) {
        this.count = res.data.data;
      } else {
        this.$message.error(res.data.message)
      }
    });
  },
  beforeDestroy() {
    this.$bus.$emit("confirmOrder", this.arr);
  },
  data() {
    return {
      specificationArr: [],
      sum: 1,
      imgUrl: this.imageUrl,
      currentIndex: 0,
      count: 0,
      arr: []
    };
  },
  methods: {
    valueClick(index1, index2) {
      // console.log(index1, index2);
      let divs = document.querySelectorAll(
        ".detail-choose>.detail-choose-option"
      );
      // console.log(divs[index1]);
      let spans = divs[index1].querySelectorAll("span");
      // console.log(spans[index2]);
      for (let i = 0; i < spans.length; i++) {
        spans[i].classList.remove("selected");
      }
      spans[index2].classList.add("selected");

      let title = divs[index1].querySelector(".title").innerHTML;
      this.specificationArr[index1] = title + ":" + spans[index2].innerHTML;
      // console.log(title);
      // console.log(spans[index2].innerHTML);
      // console.log(this.specificationArr);
    },
    decrease() {
      if (this.sum <= 1) {
        this.$message.warning("不能再减了哦");
        return;
      }
      this.sum--;
    },
    increase() {
      this.sum++;
    },
    valueChange(e) {
      // console.log(e.target.value);
      if (e.target.value <= 0) {
        this.$message.error("请不要输入1以下的数字");
        this.sum = 1;
        return;
      } else {
        this.sum = e.target.value * 1;
      }
    },
    addToCart() {
      // console.log(this.productId);
      // console.log(this.specificationList.length);
      // console.log(this.specificationArr.length);
      for (let i = 0; i < this.specificationArr.length; i++) {
        // console.log(this.specificationArr[i]);
        if (this.specificationArr[i] == undefined) {
          this.$message.warning("您还有规格没有选择呢！");
          return;
        }
      }
      if (this.specificationArr.length !== this.specificationList.length) {
        this.$message.warning("您还有规格没有选择呢！");
        return;
      }
      let specification = this.specificationArr.join();
      // console.log(specification)
      // console.log(this.sum)
      addProductToCart(
        this.userId,
        this.productId,
        this.sum,
        specification
      ).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("加入购物车成功!");
        } else {
          this.$message(res.data.message);
        }
      });
    },
    purchase() {
      for (let i = 0; i < this.specificationArr.length; i++) {
        // console.log(this.specificationArr[i]);
        if (this.specificationArr[i] == undefined) {
          this.$message.warning("您还有规格没有选择呢！");
          return;
        }
      }

      if (this.specificationArr.length !== this.specificationList.length) {
        this.$message.warning("您还有规格没有选择呢！");
        return;
      }
      let specification = this.specificationArr.join();
      // console.log(specification);
      // console.log("立即购买");
      // console.log(this.obj);
      let product = {};
      product.count = this.sum;
      product.image = this.obj.productImageList[0].imageUrl;
      product.payMoney = this.obj.outPrice * this.sum;
      product.productId = this.productId;
      product.shopName = this.shopName;
      product.specification = specification;
      product.title = this.obj.title;
      // console.log(product);
      this.arr.push(product);
      // console.log(this.arr);
      this.$router.push("/confirm");
    },
    showImg(index) {
      // console.log(index);
      // console.log(this.obj.productImageList[index]);
      this.currentIndex = index;
      this.imgUrl = this.obj.productImageList[index].imageUrl;
    }
  }
};
</script>

<style scoped>
.detail-preview {
  margin-top: 2px;
  float: left;
  width: 460px;
  height: 604px;
}
.detail-preview > img {
  width: 431px;
  height: 430px;
  margin: 0 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.detail-preview ul {
  display: flex;
  /* justify-content: flex-start;
  flex-wrap: wrap; */
  width: 420px;
  height: 85px;
  padding-left: 28px;
}
.detail-preview ul li {
  flex: 0.2;
  padding-top: 22px;
}
.detail-preview ul li img {
  width: 60px;
  height: 60px;
  margin-left: 16px;
}
.current {
  border: 2px solid #000;
}
.detail-info {
  float: left;
  width: 564px;
  height: 604px;
}
.detail-info-hd {
  height: 80px;
  padding: 20px 10px;
}
.detail-info-hd h1 {
  padding-bottom: 0.2em;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}
.detail-info-hd p {
  font-size: 14px;
  color: #ff0036;
}
.detail-info-price {
  width: 550px;
  height: 90px;
  margin: 0 auto;
  padding: 10px 20px;
}
.detail-info-price span:first-child {
  float: left;
  margin: 20px 40px 0 0;
  font-size: 14px;
  color: #999;
}
.detail-info-price span:last-child {
  float: left;
  margin-top: 10px;
  font-size: 30px;
  color: #ff0036;
  font-weight: 700;
  font-family: Arial;
}
.detail-sales {
  width: 500px;
  height: 30px;
}
.detail-sales ul {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
.detail-sales ul li {
  float: left;
  width: 200px;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  color: #ff0036;
}
.detail-choose {
  margin-top: 30px;
  height: 262px;
  padding: 10px 20px;
}
.detail-choose .title {
  float: left;
  width: 60px;
  text-align: left;
  font-size: 12px;
  color: #838383;
}
.detail-choose span {
  float: left;
  height: 20px;
  border: 2px solid #d3d3d6;
  padding: 0 10px;
  margin-right: 10px;
  line-height: 21px;
}
.detail-choose span:hover {
  border: 2px solid #ff0036;
  cursor: pointer;
}
.selected {
  border: 2px solid #ff0036 !important;
}
.detail-choose-option {
  height: 40px;
}
.detail-choose-num {
  position: relative;
  height: 40px;
}
.detail-choose-num input {
  width: 40px;
  height: 30px;
  padding: 2px 5px;
}
.decrease,
.increase {
  position: absolute;
  top: 16px;
  left: 105px;
  width: 18px;
  height: 14px;
  line-height: 14px;
  border: 1px solid #a7a6ab;
  text-align: center;
  cursor: pointer;
}
.decrease {
  top: 0px;
  left: 105px;
}
.stock {
  position: absolute;
  top: 5px;
  left: 140px;
  color: #838383;
}
.detail-choose-purchase {
  position: relative;
  height: 100px;
}
.purchase {
  position: absolute;
  top: 30px;
  left: 40px;
  width: 180px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff0036;
  border: 1px solid #ff0036;
  background-color: #ffeded;
  font-size: 16px;
  cursor: pointer;
}
.cart {
  position: absolute;
  top: 30px;
  right: 40px;
  width: 180px;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border: 1px solid #ff0036;
  background-color: #ff0036;
  font-size: 16px;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>