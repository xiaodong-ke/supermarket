<template>
  <div class="container">
    <div class="bg">
      <div class="mine w">
        <el-card class="box-card">
          <router-view />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine"
};
</script>

<style scoped>
.container {
  /* padding-top: 200px; */
  width: 100%;
  height: 100%;
  display:flex;
}
.bg {
  align-self:center;
  position: relative;
  width: 100%;
  background-color: #e93854;
}
.mine {
  position: relative;
  height: 500px;
  background: url(../../assets/images/bg.png) no-repeat;
}
.box-card {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 350px;
  transform: translate(-100%, -50%);
}
</style>