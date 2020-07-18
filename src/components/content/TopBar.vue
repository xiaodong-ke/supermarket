<template>
  <div class="top-bar">
    <div class="w">
      <div class="fl"><slot name="left"></slot></div>
      <div class="fr"><slot name="right"></slot></div>   
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar"
};
</script>

<style scoped>
.top-bar {
  background-color: #f2f2f2;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
}
</style>