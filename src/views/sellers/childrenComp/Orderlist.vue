<template>
  <div>
    <!-- 头部区域（面包屑组件） -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search" @click="this.getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <!-- 订单列表表格区域 -->
      <el-table :data="businessOrderList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="收货地址">
                    <span>{{ props.row.userAddress }}</span>
                  </el-form-item>
                  <el-form-item label="收件人联系方式">
                    <span>{{ props.row.userPhone }}</span>
                  </el-form-item>
                  <el-form-item label="下单时间">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                </el-col>
                <el-form-item label="商品图片">
                  <span>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.image"
                      :preview-src-list="props.row.image.split()"
                    ></el-image>
                  </span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="orderId" width="210px"></el-table-column>
        <el-table-column label="商品名称" prop="productName"></el-table-column>
        <el-table-column label="商品数量" prop="count"></el-table-column>
        <el-table-column label="商品价格" prop="payMoney"></el-table-column>
        <el-table-column label="状态" prop="orderStatus"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="发货" placement="top">
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="sendProduct(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="退款" placement="top">
              <el-button
                type="warning"
                icon="el-icon-star-off"
                size="mini"
                @click="refund(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteOrderById(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // queryInfo: {
      //   // shopName: 'Apple旗舰店',
      //   shopName: this.shopName,
      //   pageNum: 1,
      //   pageSize: 5
      // },
      pageNum: 1,
      pageSize: 5,
      total: 1,
      /* 订单列表 */
      businessOrderList: []
    };
  },
  created() {
    this.getOrderList();
  },
  computed: {
    shopName() {
      return sessionStorage.getItem("shopName");
    }
  },
  methods: {
    /* 获取订单列表 */
    async getOrderList() {
      const { data: res } = await this.$http.get("order/getOrderList", {
        params: {
          shopName: this.shopName,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      });
      // console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取数据失败");
      }
      this.$message.success(res.message);
      this.total = res.data.total;
      this.businessOrderList = res.data.businessOrderList;
    },
    /* 分页功能 */
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getOrderList();
    },
    /* 发货 */
    async sendProduct(row) {
      const { data: res } = await this.$http.put(
        `order/sendProduct/${row.orderId}`
      );
      if (res.code != 200) {
        return this.$message.error(res.data.message);
      }
      this.$message.success(res.message);
      this.getOrderList();
    },
    /* 退货 */
    async refund(row) {
      const { data: res } = await this.$http.put(`order/refund/${row.orderId}`);
      if (res.code != 200) {
        return this.$message.error(res.data.message);
      }
      this.$message.success(res.message);
      this.getOrderList();
    },
    /* 删除订单 */
    deleteOrderById(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "order/deleteBusinessOrder/" + row.orderId
          );
          if (res.code == 200) {
            this.getOrderList();
            this.$message({
              type: "success",
              message: "删除订单成功!"
            });
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style  scoped>
</style>
