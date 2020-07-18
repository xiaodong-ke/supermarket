<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户评价</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="leaveMessageList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="留言Id" prop="leaveMessageId"></el-table-column>
        <el-table-column label="商品Id" prop="productId"></el-table-column>
        <el-table-column label="店名" prop="shopName"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="留言时间" prop="time"></el-table-column>
        <el-table-column label="留言内容" prop="message"></el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        // shopName: 'apple旗舰店',
        pageNum: 1,
        pageSize: 5
      },
      total: 1,
      leaveMessageList: []
    };
  },
  computed: {
    shopName() {
      return sessionStorage.getItem("shopName");
    }
  },
  created() {
    this.getLeaveMessageList();
  },
  methods: {
    /* 获取留言列表 */
    async getLeaveMessageList() {
      const { data: res } = await this.$http
        .get(`leave-message/getLeaveMessageList/${this.queryInfo.pageNum}
      /${this.queryInfo.pageSize}/${this.shopName}`);
      if (res.code == 200) {
        this.total = res.data.total;
        this.leaveMessageList = res.data.leaveMessageList;
        this.queryInfo.shopName = "";
      } else {
        this.$message.error(res.data.message)
      }
    },
    /* 分页功能 */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getLeaveMessageList();
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.pageNum = newPageNum;
      this.getLeaveMessageList();
    }
  }
};
</script>
<style scoped>
</style>
