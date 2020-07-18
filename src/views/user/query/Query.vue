<template>
  <div class="w query">
    <recommend-item v-for="(item, index) in productList" :key="index" :item="item" />
    <div v-if="isEmpty">找不到您搜索的商品</div>
  </div>
</template>

<script>
import { getProductListByKeyWord } from 'api/user'

import RecommendItem from 'components/content/recommend/RecommendItem'

export default {
  name: "Query",
  created() {
    this.product = this.$route.query.product
    this.getProductList(this.product);
  },
  components: {
    RecommendItem
  },
  watch: {
    '$route': 'getProductList'
  },
  data() {
    return {
      product: '',
      productList: []
    }
  },
  methods:{
    getProductList() {
      this.product = this.$route.query.product
      // console.log(this.product);
      this.productList = [];
      getProductListByKeyWord(1, 40, this.product).then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          // console.log(res.data.data)
          let list = res.data.data;
          list.data.forEach( (value) => {
            // console.log(value);
            value.list.forEach( (item) => {
              // console.log(item);
              this.productList.push(item);
            })
          })
          // console.log(this.productList);
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
  computed: {
    isEmpty() {
      if (this.productList.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style scoped>
.query {
  display: flex;
  flex-wrap: wrap
}
</style>