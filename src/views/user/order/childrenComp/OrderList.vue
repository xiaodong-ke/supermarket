<template>
  <div class="w">
    <div class="head">
      <ul>
        <li>所有订单</li>
      </ul>

      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button type="primary" @click="queryByDate">查找</el-button>
    </div>
    <div class="thead clearfix">
      <div class="fl info">宝贝</div>
      <div class="fl price">单价</div>
      <div class="fl num">数量</div>
      <div class="fl total">实付款</div>
      <div class="fl status">交易状态</div>
      <div class="fl operation">交易操作</div>
    </div>
    <order-item v-for="(item, index) in orderList" :key="index" :item="item" @success="success" />
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getOrderList } from "api/user";

import OrderItem from "./OrderItem";

export default {
  name: "OrderList",
  components: {
    OrderItem
  },
  created() {
    this.getUserOrder(this.pageNum, this.pageSize);
  },
  computed: {
    userId() {
      return sessionStorage.getItem("userId");
    }
  },
  data() {
    return {
      orderList: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      date: ""
    };
  },
  methods: {
    getUserOrder(pageNum, pageSize, date) {
      let obj = {};
      if (date) {
        // console.log("true");
        obj = {
          userId: this.userId,
          pageNum: pageNum,
          pageSize: pageSize,
          startDate: date[0],
          endDate: date[1]
        };
      } else {
        // console.log("false");
        obj = {
          userId: this.userId,
          pageNum: pageNum,
          pageSize: pageSize
        };
      }

      getOrderList(obj).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.orderList = res.data.data.userOrderList;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    // 重新刷新订单
    success() {
      this.getUserOrder(1, 5);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getUserOrder(this.pageNum, this.pageSize);
    },
    queryByDate() {
      this.pageNum = 1;
      this.getUserOrder(this.pageNum, this.pageSize, this.date);
    }
  }
};
</script>

<style scoped>
.head {
  position: relative;
}
.head ul li {
  width: 110px;
  height: 30px;
  border-bottom: 3px solid #ff0036;
  color: #ff0036;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.thead {
  height: 40px;
  border: 1px solid #e8e8e8;
  margin-top: 5px;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 38px;
}
.info {
  width: 400px;
}
.price {
  width: 100px;
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

.el-pagination {
  margin-top: 20px;
  text-align: center;
}

.el-range-editor.el-input__inner {
  position: absolute;
  top: -15px;
  right: 70px;
}

.el-button {
  position: absolute;
  top: -15px;
  right: 0;
}
</style>