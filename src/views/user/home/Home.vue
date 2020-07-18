<template>
  <div>
    <my-swiper></my-swiper>
    <floor :ref="item.name" v-for="(item, index) in arr" :key="index" :obj="item" :image="images[index]"></floor>
    <recommend ref="recommend" :productList="productList"></recommend>
    <elevator ref="elevator" :titles="titles" @eleClick="eleClick" />
  </div>
</template>

<script>
import { getProductList } from "api/user";

import MySwiper from "components/common/MySwiper";
import Floor from "./childComp/Floor";
import Recommend from "components/content/recommend/Recommend";

import Elevator from "components/content/Elevator";

export default {
  name: "Home",
  components: {
    MySwiper,
    Floor,
    Recommend,
    Elevator
  },
  created() {
    getProductList(1, 100).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        let data = res.data.data.data;
        for (let i = 0; i < 4; i++) {
          this.arr[i] = data[i];
          this.arr[i].name = "itemName";
          this.titles.push(data[i].categoryName);
        }
        this.titles.push("猜你喜欢", "回到顶部");
        // console.log(this.arr);
        // console.log(this.titles)

        this.getRandomList(data);
      } else {
        this.$message.error(res.data.message)
      }
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  updated() {
    this.getThemeTop();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      flag: false,
      arr: [
        // {
        //   name: "itemName",
        //   obj: {
        //     title: "手机电脑",
        //     items: [
        //       {
        //         img: "",
        //         name: "雀巢冰爽茶 经典柠檬味冰红茶粉 即溶果维",
        //         price: 36
        //       },
        //     ]
        //    }
        // }
      ],
      themeTop: [],
      titles: [],
      productList: [],
      images: ['https://image2.suning.cn/uimg/cms/img/159248430542789519.jpg', 
                'https://image2.suning.cn/uimg/cms/img/154708522623243257.jpg', 
                'https://image2.suning.cn/uimg/cms/img/158711402303815567.jpg', 
                'https://image4.suning.cn/uimg/cms/img/154653870609348462.jpg']
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      // console.log(this.$refs.itemName[0].$el.offsetTop)
      // console.log(this.$refs.itemName[1].$el.offsetTop)
      // console.log(this.$refs.itemName[2].$el.offsetTop)

      // 显示
      if (this.themeTop[0] <= scrollTop) {
        this.$refs.elevator.flag = true;
      } else {
        this.$refs.elevator.flag = false;
      }

      if (scrollTop >= this.themeTop[0] && scrollTop <= this.themeTop[1]) {
        this.$refs.elevator.currentIndex = 0;
      } else if (
        scrollTop >= this.themeTop[1] &&
        scrollTop <= this.themeTop[2]
      ) {
        this.$refs.elevator.currentIndex = 1;
      } else if (
        scrollTop >= this.themeTop[2] &&
        scrollTop <= this.themeTop[3]
      ) {
        this.$refs.elevator.currentIndex = 2;
      } else if (
        scrollTop >= this.themeTop[3] &&
        scrollTop <= this.$refs.recommend.$el.offsetTop
      ) {
        this.$refs.elevator.currentIndex = 3;
      } else {
        this.$refs.elevator.currentIndex = 4;
      }
    },
    eleClick(index) {
      // console.log(this.themeTop[index]);
      document.documentElement.scrollTop = this.themeTop[index];
    },
    getThemeTop() {
      // console.log(this.$refs.itemName.length);
      for (let i = 0; i < this.$refs.itemName.length; i++) {
        this.themeTop.push(this.$refs.itemName[i].$el.offsetTop);
      }
      this.themeTop.push(this.$refs.recommend.$el.offsetTop);
      this.themeTop.push(0);
    },
    getRandomList(data) {
      // console.log(data);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < data[i].list.length; j++) {
          this.productList.push(data[i].list[j]);
        }
      }
      // console.log(this.productList);

      function shuffle(arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
          let rIndex = Math.floor(Math.random() * (i + 1));
          // 打印交换值
          // console.log(i, rIndex);
          let temp = arr[rIndex];
          arr[rIndex] = arr[i];
          arr[i] = temp;
        }
        return arr;
      }

      shuffle(this.productList);
    }
  }
};
</script>

<style scoped>
</style>