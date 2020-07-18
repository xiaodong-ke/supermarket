<template>
  <div>
    <ul class="elevator-list" :class="{show: flag}">
      <li
        v-for="(title, index) in titles"
        :key="index"
        @click="titleClick(index)"
        :class="{on: currentIndex === index}"
      >{{title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Elevator",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      flag: false,
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('eleClick', this.currentIndex);
    }
  }
};
</script>

<style scoped>
.elevator-list {
  display: none;
  bottom: 400px;
  left: 50%;
  width: 70px;
  margin-left: 530px;
  border: 1px solid #ddd;
  border-bottom: 0px;
}
.elevator-list li {
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: #fff;
}
.elevator-list li:hover {
  color: #fff;
  background-color: #f90 !important;
}
.show {
  display: block;
  position: fixed;
}
.on,
.hover {
  color: #fff;
  background-color: #f90 !important;
}
</style>