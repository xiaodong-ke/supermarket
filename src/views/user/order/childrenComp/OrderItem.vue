<template>
  <div>
    <div class="clearfix head">
      <div class="fl">
        <!-- <span>2020-05-11</span> -->
        <span>{{ item.createTime | setDateFilter }}</span>
      </div>
      <div class="fl">
        <span>订单号</span>
      </div>
      <div class="fl">
        <!-- <span>994248131132167116</span> -->
        <span>{{ item.orderId }}</span>
      </div>
      <div class="icon">
        <i class="el-icon-delete" title="删除订单" @click="deleteOrder"></i>
      </div>
      <div class="refund" v-if="isShowRefund">
        <span @click="userRefund">退款</span>
      </div>
    </div>
    <div class="body">
      <div class="fl info">
        <!-- <img src="~assets/images/order.jpg" alt /> -->
        <!-- <span>炊大皇平底不粘锅油炸牛排煎锅早餐煎蛋千层</span> -->
        <img :src="item.image" alt class="fl" />
        <span>{{ item.title }}</span>
      </div>
      <!-- <div class="fl price">￥42.90</div> -->
      <div class="fl price">￥ {{ unitPrice }}</div>
      <!-- <div class="fl num">1</div> -->
      <div class="fl num">{{ item.count }}</div>
      <!-- <div class="fl total">￥42.90</div> -->
      <div class="fl total">￥{{ item.payMoney }}</div>
      <!-- <div class="fl status">交易成功</div> -->
      <div class="fl status">{{ item.orderStatus }}</div>
      <div class="fl operation">
        <button v-if="isShowAppraised" @click="Evaluations">{{ isComment }}</button>
      </div>
    </div>

    <el-dialog title="评价" :visible.sync="appraiseDialog" width="30%">
      <el-input
        type="textarea"
        v-model="comment"
        placeholder="请输入对本商品的看法或建议"
        maxlength="150"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appraiseDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { returnProduct, deleteUserOrder, addComment } from "api/user";

import axios from "axios";

export default {
  name: "OrderItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    unitPrice() {
      let price = this.item.payMoney / this.item.count;
      return price.toFixed(2);
    },
    // 显示退款
    isShowRefund() {
      let flag = false;
      if (this.item.orderStatus == "未发货") {
        flag = true;
      }
      return flag;
    },
    // 显示评价
    isShowAppraised() {
      let flag = false;
      if (this.item.orderStatus == "已发货") {
        flag = true;
      }
      return flag;
    },
    isComment() {
      return this.item.isComment == 0 ? '评价' : '已评价'
    }
  },
  filters: {
    setDateFilter(data) {
      return data.slice(0, 10);
    }
  },
  data() {
    return {
      appraiseDialog: false,
      comment: ""
    };
  },
  methods: {
    // 用户退款
    userRefund() {
      returnProduct(this.item.orderId).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("退款成功，等待商家审核");
          this.$emit("success");
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    // 用户删除订单
    deleteOrder() {
      // console.log("删除");
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUserOrder(this.item.orderId).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.$emit("success");
            } else {
              this.$message.error(res.data.message)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // axios.post("http://106.55.151.225:8888/user/register", {
      //   params: {
      //     username: "111",
      //     password: "222"
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
    },
    // 用户评价
    addUserComment() {
      if (this.comment.trim() == "") {
        this.$message('您没有输入评论哦');
        this.appraiseDialog = false;
        return ;
      }
      addComment(this.item.productId, 'kkk', '13411919260', this.comment).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success('发表成功');
          this.appraiseDialog = false;
          this.$emit("success");
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    Evaluations() {
      if (this.item.isComment == 1) {
        this.$message.success('您已经评价过了，请勿再次评价')
        return ;
      } else {
        this.appraiseDialog = true;
      }
    }
  }
};
</script>

<style scoped>
.head {
  position: relative;
  height: 30px;
  margin-top: 5px;
  border: 1px solid #f5f5f5;
  background-color: #fff;
  line-height: 28px;
  text-align: center;
}
.head div {
  width: 100px;
}
.icon {
  position: absolute;
  top: 3px;
  right: -15px;
}
.el-icon-delete {
  width: 20px;
  height: 20px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.refund {
  position: absolute;
  top: 1px;
  right: 45px;
  width: 50px !important;
}
.refund span {
  font-size: 12px;
  cursor: pointer;
  color: #333;
}
.body {
  height: 100px;
  padding: 10px 0;
  border: 1px solid #f5f5f5;
  border-top: 0;
  text-align: center;
}
.info {
  width: 400px;
}
.info img {
  width: 80px;
  height: 80px;
  margin-left: 30px;
}
.info span {
  margin: 0 10px;
  vertical-align: top;
  text-align: left !important;
}
.price {
  width: 100px;
  padding-left: 10px;
}
.num {
  width: 100px;
}
.total {
  width: 130px;
}
.status {
  width: 130px;
}
.operation {
  width: 130px;
}
</style>