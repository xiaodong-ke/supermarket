<template>
  <div class="main">
    <div class="hd">
      <!-- <ul>
        <li class="current">商品详情</li>
        <li>累计评价</li>
      </ul>-->
      <ul>
        <li
          v-for="(item, index) in lis"
          :key="index"
          @click="liClick(index)"
          :class="{current:currentIndex===index}"
        >{{ item }}</li>
      </ul>
    </div>
    <div v-if="currentIndex == 0">
      <div class="content">
        <div class="content-title">
          <em>产品参数</em>
        </div>
        <!-- <ul>
        <li>品牌: 迪威阁</li>
        <li>材质: 涤纶</li>
        <li>尺码: 4XL 5XL 6XL M L XL 2XL 3XL 7XL 8XL</li>
        <li>颜色分类: 红色 白色 黑色 蓝色 绿色</li>
        <li>货号: DWG-KJUN902</li>
        <li>适用季节: 夏季</li>
        <li>上市年份季节: 2020年夏季</li>
        <li>袖长: 短袖</li>
        <li>适用对象: 大码</li>
        <li>裤长: 短裤</li>
        <li>材质成分: 聚酯纤维100%</li>
        <li>上衣款式: T恤</li>
        </ul>-->
        <ul>
          <li v-for="(item, index) in parameterList" :key="index">{{item.name}} : {{ item.value}}</li>
        </ul>
      </div>
      <!-- <div>{{detailsImageList}}</div> -->
      <div class="images-list">
        <div v-for="(item, index) in detailsImageList" :key="index">
          <img :src="item.imageUrl" alt />
        </div>
        <!-- <img src="~assets/images/detail11.jpg" alt />
      <img src="~assets/images/detail22.jpg" alt />
      <img src="~assets/images/detail33.jpg" alt />
      <img src="~assets/images/detail44.jpg" alt />
        <img src="~assets/images/detail55.jpg" alt />-->
      </div>
    </div>
    <div v-else>
      <div class="content">
        <div v-if="commentList.length == 0">暂无评价</div>
        <div v-else class="comment">
          <div v-for="(item, index) in commentList" :key="index">
            <span>{{item.comment}}</span>
            <span>{{item.userPhone | hidePhone}}</span>
          </div>
          <el-pagination
            :hide-on-single-page="isHidePage"
            :total="total"
            layout="prev, pager, next"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommentCount, getCommentList } from "api/user";

export default {
  name: "DetailBody",
  props: {
    parameterList: {
      type: Array,
      default() {
        return [];
      }
    },
    productId: {
      type: String,
      default: ""
    },
    detailsImageList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    getCommentCount(this.productId).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        this.count = res.data.data;
        this.lis[1] = this.lis[1] + " " + this.count;
      } else {
        this.$message.error(res.data.message);
      }
    }),
    this.getCommentByPage();
  },
  filters: {
    hidePhone: function(phone) {
      return phone.substr(0, 3) + "****" + phone.substr(7);
    }
  },
  data() {
    return {
      lis: ["商品详情", "累计评价"],
      currentIndex: 0,
      count: 0,
      commentList: [],
      isHidePage: true
    };
  },
  methods: {
    liClick(index) {
      this.currentIndex = index;
    },
    getCommentByPage() {
      getCommentList(this.productId, 1, 10).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.commentList = res.data.data.commentList;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message)
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 800px;
  margin-left: 230px;
}
.hd {
  height: 41px;
  border: 1px solid #dfdfdf;
}
.hd ul li {
  float: left;
  padding: 0 20px;
  text-align: center;
  line-height: 38px;
  border-top: 2px solid transparent;
  cursor: pointer;
}
.current {
  position: relative;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-top-color: #ff0036 !important;
  font-weight: 700;
  color: #ff0036;
}
.current::after {
  content: " ";
  display: block;
  border-width: 5px;
  border-style: solid;
  border-color: #ff0036 transparent transparent;
  width: 0;
  height: 0;
  font-family: arial;
  position: absolute;
  top: -1px;
  left: 50%;
  margin-left: -5px;
}
.content {
  /* height: 160px; */
  margin-bottom: 20px;
  border: 1px solid #dfdfdf;
}
.content-title {
  height: 40px;
  font-weight: 700;
  padding: 10px 20px;
  line-height: 20px;
}
.content ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.content ul li {
  width: 33.33%;
  height: 25px;
  color: #666;
}
.images-list img {
  width: 800px;
  vertical-align: top;
}
.comment div {
  display: flex;
  width: 100%;
  height: 70px;
  padding: 10px;
  font-size: 16px;
  color: #333;
}
.comment div span {
  flex: 1;
}
.comment div span:nth-child(2) {
  text-align: right;
}
</style>