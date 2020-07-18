<template>
  <div class="goods">
    <el-form ref="form" :model="form" label-width="100px" v-loading="loading" element-loading-text="正在上传，请稍等片刻">
      <el-row class="row">
        <el-col :span="5" :offset="2">
          <el-form-item label="商品名称">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="商品种类">
            <el-select v-model="form.categoryName" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryName"
              ></el-option>
            </el-select>
            <i class="el-icon-circle-plus-outline" @click="categoryDialog = true" title="添加新的种类"></i>

            <!-- 添加种类对话框 -->
            <el-dialog title="种类" :visible.sync="categoryDialog" width="30%">
              <el-input placeholder="请输入新种类" v-model="newCategory" clearable></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="categoryDialog = false">取 消</el-button>
                <el-button type="primary" @click="addCategoryName">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="商品标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>

        <!-- 规格 -->
        <el-col :span="9" :offset="2">
          <add-parameter-table :tableData.sync="tableData" :thead="'规格'" @btn="btn" />
        </el-col>

        <!-- 参数 -->
        <el-col :span="9" :offset="2">
          <add-parameter-table :tableData.sync="productData" :thead="'参数'" @btn="btn1" />
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6" :offset="2">
          <el-form-item label="商品库存">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="商品进货价">
            <el-input v-model="form.inPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="商品售价">
            <el-input v-model="form.outPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 上传商品图片 -->
      <el-row class="row">
        <el-col :offset="2" :span="22">
          <div class="title">上传商品图片(最多 5 张)</div>
          <el-upload
            action="http://106.55.151.225:8888/product/addProduct"
            list-type="picture-card"
            :file-list="fileList"
            :before-upload="beforeProductUpload"
            :limit="5"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  ref="pro"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 上传详情图片 -->
      <el-row>
        <el-col :offset="2" :span="22">
          <div class="title">上传详情图片(最多 7 张)</div>
          <el-upload
            action="http://106.55.151.225:8888/product/addProduct"
            list-type="picture-card"
            :file-list="fileList"
            :before-upload="beforeDetailUpload"
            :limit="7"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  ref="det"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="11" :span="13">
          <el-button type="primary" @click="add" class="btn">提交</el-button>
        </el-col>
      </el-row>

    </el-form>

    <Dialog ref="dialog" @pushObj="pushObj" />
  </div>
</template>

<script>
import { getCategory, addProduct, addCategory } from "api/admin";

import Dialog from "./Dialog";
import AddParameterTable from "./AddParameterTable";

export default {
  name: "AddGoods",
  components: {
    AddParameterTable,
    Dialog
  },
  data() {
    return {
      form: {
        productName: "",
        categoryName: "",
        stock: 0,
        title: "",
        inPrice: 0,
        outPrice: 0
      },
      options: [],
      value: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      tableData: [],
      productData: [],
      formData: new FormData(),
      categoryDialog: false,
      newCategory: "",
      imageArr: [],
      productFile: [],
      detailsFile: [],
      loading: false
    };
  },
  methods: {
    handleRemove(file) {
      // console.log(file);
      // console.log("删除");
      this.fileList = this.fileList.filter(item => item !== file);
      // console.log(this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(this.fileList);
    },

    beforeProductUpload(file) {
      // console.log(file);
      // this.formData.append("file", file);
      this.productFile.push(file);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    beforeDetailUpload(file) {
      console.log(file);
      // this.formData.append("file", file);
      this.detailsFile.push(file);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    // 添加新的种类
    addCategoryName() {
      let newCate = this.newCategory.trim();
      // console.log(this.newCategory.length);
      // console.log(newCate.length);
      this.categoryDialog = false;
      if (newCate !== "") {
        addCategory(newCate).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success('添加新种类成功');
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message("您没有输入新的种类");
      }
    },

    btn() {
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.title = "规格";
      this.$refs.dialog.flag = true;
    },

    btn1() {
      this.$refs.dialog.dialogVisible = true;
      this.$refs.dialog.title = "产品";
      this.$refs.dialog.flag = false;
    },

    pushObj(obj, flag) {
      if (flag) {
        this.tableData.push(obj);
      } else {
        this.productData.push(obj);
      }
    },

    add() {
      // console.log(this.$refs.form);
      this.loading = true
      this.$refs.form.validate(valid => {
        this.formData.append("categoryName", this.form.categoryName);
        this.formData.append("productName", this.form.productName);
        this.formData.append("stock", this.form.stock);
        // console.log(this.form.stock);
        this.formData.append("title", this.form.title);
        this.formData.append("inPrice", this.form.inPrice);
        // console.log(typeof this.form.inPrice);
        this.formData.append("outPrice", this.form.outPrice);
        // console.log(typeof this.form.outPrice);
        this.formData.append("userId", this.userId);
        this.formData.append("shopName", this.shopName);
        this.formData.append(
          "specificationData",
          JSON.stringify(this.tableData)
        );
        // console.log(JSON.stringify(this.tableData));
        this.formData.append("parameterData", JSON.stringify(this.productData));
        // this.formData.append("productFile", this.productFile);
        // this.formData.append("detailsFile", this.detailsFile);
        for (let i = 0; i < this.productFile.length; i++) {
          // this.formData.append(`productFile[${i}]`, this.productFile[i]);
          this.formData.append("productFile", this.productFile[i]);
          // console.log(this.productFile[i])
        }
        for (let i = 0; i < this.detailsFile.length; i++) {
          // this.formData.append(`detailsFile[${i}]`, this.detailsFile[i]);
          this.formData.append("detailsFile", this.detailsFile[i]);
          // console.log(this.detailsFile[i])
        }
        // console.log(this.formData.getAll("productFile"));
        // console.log(this.formData.getAll("detailsFile"));
        // console.log(this.formData instanceof Object);
        addProduct(this.formData).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.formData = new FormData();
            this.form = {};
            this.detailsFile = [];
            this.productFile = [];
            this.tableData = [];
            this.productData = [];
            this.$refs.pro.click();
            this.$refs.det.click();
            this.loading = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    }
  },
  created() {
    // 获取商品种类
    getCategory().then(res => {
      // console.log(res.data.data);
      if (res.data.code == 200) {
        this.options = res.data.data;
      } else {
        this.$message.error(res.data.message);
      }     
    });
  },
  computed: {
    userId() {
      return sessionStorage.getItem("userId");
    },
    shopName() {
      return sessionStorage.getItem("shopName");
    }
  }
};
</script> 

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.el-icon-circle-plus-outline {
  position: absolute;
  top: 14px;
  right: -18px;
  cursor: pointer;
}
.row {
  margin: 10px 0;
}
.title {
  width: 500px;
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
}
.btn {
  width: 150px;
}
</style>