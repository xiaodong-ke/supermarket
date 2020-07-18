<template>
  <div class="w">
    <i class="el-icon-back" @click="backClick"> 返回</i>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    backClick() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.el-icon-back {
  font-size: 20px;
  cursor: pointer;
}
</style>