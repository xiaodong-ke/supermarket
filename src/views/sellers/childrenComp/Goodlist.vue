<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.productName"
              class="input-with-select"
              clearable
              @clear="this.getGoodlist"
            >
              <el-select
                v-model="queryInfo.categoryName"
                slot="prepend"
                placeholder="种类"
                @change="currentSel"
              >
                <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="this.getGoodlist"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goodAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodList" border stripe style="width: 100%">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-col :span="10">
                <el-form-item label="商品ID">
                  <span>{{ props.row.product.productId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="商品名称">
                  <span>{{ props.row.product.productName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="店名">
                  <span>{{ props.row.product.shopName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="商品所属用户">
                  <span>{{ props.row.product.userId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="商品上架时间">
                  <span>{{ props.row.product.uploadTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <!-- 重传图片 -->
                <!-- <el-form-item label="商品图片">
                  <span>
                    <el-upload
                      :action="uploadURL"
                      :data="data"
                      :file-list="imageList"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      list-type="picture"
                      :on-success="handleSuccess"
                      :before-upload="updateImage"
                    >
                      <el-button size="small" type="primary">重传图片</el-button>
                    </el-upload>
                  </span>
                </el-form-item>-->
                <el-form-item label="修改图片详情">
                  <span>
                    <el-button type="primary" @click="photoDialog = true">重新上传</el-button>
                  </span>
                  <!-- 重传图片对话框 -->
                  <el-dialog title="上传图片" :visible.sync="photoDialog" width="30%">
                    <el-form-item label="商品Id">
                      <el-input :value="props.row.product.productId" :disabled="true"></el-input>
                    </el-form-item>
                    <p>product</p>
                    <el-upload
                      :action="uploadURL"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :before-upload="beforeProductUpload"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                    <p>details</p>
                    <el-upload
                      :action="uploadURL"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :before-upload="beforeDetailUpload"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="photoDialog = false">取 消</el-button>
                      <el-button
                        type="primary"
                        @click="uploadImage(props.row.product.productId)"
                      >确 定</el-button>
                    </span>
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="种类名称" prop="product.categoryName"></el-table-column>
        <el-table-column label="库存" prop="product.stock"></el-table-column>
        <el-table-column label="商品标题" prop="product.title"></el-table-column>
        <el-table-column label="进货价" prop="product.inPrice"></el-table-column>
        <el-table-column label="售价" prop="product.outPrice"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editGoods(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
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
    <!-- 编辑商品对话框 -->
    <el-dialog title="编辑商品" :visible.sync="editDialog" width="50%">
      <el-form
        :model="editList"
        :rules="editRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品Id">
          <el-input v-model="editList.productId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="种类名称" prop="categoryName">
          <el-input v-model="editList.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="editList.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="editList.title"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="inPrice">
          <el-input v-model="editList.inPrice"></el-input>
        </el-form-item>
        <el-form-item label="出货价" prop="outPrice">
          <el-input v-model="editList.outPrice"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClosed">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 图片预览 -->
    <!-- <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt class="previewImg" />
    </el-dialog>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        // shopName: "Apple旗舰店",
        productName: "",
        categoryName: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 10,
      /* 获取商品列表 */
      goodList: [],
      /* 编辑商品列表 */
      editList: {
        productId: "",
        categoryName: "",
        stock: "",
        title: "",
        inPrice: "",
        outPrice: ""
      },
      /* 商品种类 */
      categoryList: [],
      /* 编辑商品规则 */
      editRules: {
        categoryName: [
          { required: true, message: "请输入要修改的商品价格", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "请输入要修改的商品分类", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入要修改的商品分类", trigger: "blur" }
        ],
        inPrice: [
          { required: true, message: "请输入要修改的商品分类", trigger: "blur" }
        ],
        outPrice: [
          { required: true, message: "请输入要修改的商品分类", trigger: "blur" }
        ]
      },
      /* 编辑商品对话框 */
      editDialog: false,
      /* 图片重重地url */
      uploadURL: "http://106.55.151.225:8888/product/reUploadFile",
      // 图片上传组件的headers请求头对象
      /* headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }, */
      imageList: [
        {
          name: "",
          url: ""
        }
      ],
      data: {
        productId: ""
      },
      /* 预览图片 */
      previewPath: "",
      previewVisible: false,
      changeflag: "true",
      photoDialog: false,
      dialogImageUrl: "",
      dialogVisible: false,
      productFile: [],
      detailsFile: [],
      formdata: new FormData()
    };
  },
  created() {
    this.getGoodlist();
  },
  computed: {
    shopName() {
      return sessionStorage.getItem("shopName");
    }
  },
  methods: {
    /* 获取商品列表 */
    async getGoodlist() {
      const { data: res } = await this.$http.get("product/getMyProduct", {
        params: {
          shopName: this.shopName,
          productName: this.queryInfo.productName,
          categoryName: this.queryInfo.categoryName,
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize
        }
      });
      // console.log(res);
      if (res.code == 200) {
        this.$message.success("获取成功");
      } else {
        this.$message.error(res.data.message);
        return;
      }
      this.goodList = res.data.productList;
      this.total = res.data.total;
      /* 重传图片 */
      // for (var i = 0; i < res.data.productList.length; i++) {
      //   this.imageList[i].name =
      //     res.data.productList[i].product.productImageList[i].imageName;
      //   this.imageList[i].url =
      //     res.data.productList[i].product.productImageList[i].imageUrl;
      // }
      console.log(this.goodList);
      /* 获取商品种类数组 ,changeflag是为了选择某个种类的时候，重新调用getGoodlist方法时，不再执行这段代码 */
      if (this.changeflag) {
        var productList = this.goodList;
        let arrayList = [];
        productList.forEach(value => {
          arrayList.push(value.product.categoryName);
        });
        const set = new Set(arrayList);
        arrayList = [...set];
        this.categoryList = arrayList;
      }
      this.changeflag = true;
    },
    /* 添加商品 */
    goodAddPage() {
      // console.log("添加商品");
      this.$router.push("/sellers/addGoods");
    },
    /* 编辑商品信息 */
    /* 点击编辑按钮获取当前商品的详细信息 */
    async editGoods(row) {
      const { data: res } = await this.$http.get(
        "product/getProductById/" + row.product.productId
      );
      // console.log(res);
      if (res.code != 200) {
        this.$message.error(res.message);
        return;
      }
      this.editList = res.data.product;
      this.editDialog = true;
    },
    /* 提交编辑的信息，完成修改商品数据的操作 */
    submitEdit() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        var fd = new FormData();
        fd.append("productId", this.editList.productId);
        fd.append("categoryName", this.editList.categoryName);
        fd.append("stock", this.editList.stock);
        fd.append("title", this.editList.title);
        fd.append("inPrice", this.editList.inPrice);
        fd.append("outPrice", this.editList.outPrice);
        const { data: res } = await this.$http.put("product/updateProduct", fd);
        if (res.code == 200) {
          this.$message.success(res.message);
          this.getGoodlist();
        } else {
          this.$message.error(res.message);
        }
        this.editDialog = false;
      });
    },
    /* 关闭编辑商品的对话框 */
    editDialogClosed() {
      this.editDialog = false;
      this.$refs.editFormRef.resetFields();
    },
    /* 删除商品 */
    removeById(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "product/deleteByProductId/" + row.product.productId
          );
          if (res.code == 200) {
            this.getGoodlist();
            this.$message({
              type: "success",
              message: "删除商品成功!"
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 分页功能 */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getGoodlist();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getGoodlist();
    },
    // 处理图片预览效果
    handlePictureCardPreview(file) {
      // console.log(file);
      this.previewPath = file.url;
      this.previewVisible = true;
    },
    // 处理移除图片的操作
    handleRemove(file) {
      // console.log(file, fileList);
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      // console.log(response);
    },
    /* 上传图片之前的钩子 */
    updateImage(file) {
      /* file.name = this.imageList[0].name */
      // console.log(file.name);
    },
    /* select 组件的 change事件 */
    currentSel(curSel) {
      this.changeflag = false;
      this.queryInfo.categoryName = curSel;
      this.getGoodlist();
    },
    /* 重传图片 */
    updateProductImage(row) {
      // console.log(row);
    },
    beforeProductUpload(file) {
      // console.log(file);
      this.productFile.push(file);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    beforeDetailUpload(file) {
      // console.log(file);
      this.detailsFile.push(file);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    uploadImage(productId) {
      // console.log(this.productFile);
      // console.log(this.detailsFile);
      // console.log(productId);
      for (let i = 0; i < this.productFile.length; i++) {
        this.formdata.append("productFile", this.productFile[i]);
      }
      for (let i = 0; i < this.detailsFile.length; i++) {
        this.formdata.append("detailsFile", this.detailsFile[i]);
      }
      this.formdata.append("productId", productId);
      this.$http.post("product/reUploadFile", this.formdata).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("更新成功");
          this.formdata = new FormData();
          this.photoDialog = false;
        } else {
          this.$message.error(res.data.message)
        }
      });
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
}
.el-aside > .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.el-select {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
