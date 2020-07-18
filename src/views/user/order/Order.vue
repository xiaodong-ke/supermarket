<template>
  <div>
    <order-list />
  </div>
</template>

<script>
import OrderList from "./childrenComp/OrderList";

export default {
  name: "Order",
  components: {
    OrderList
  }
};
</script>

<style scoped>
</style>