<!-- Vue 2 -->

<template>
  <div>
    <h1>Order Summary</h1>
    <div v-if="orders.length === 0">No orders yet.</div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order">
        <h3>Order ID: {{ order.id }}</h3>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.title }} - {{ item.quantity }} pcs - ${{ item.price * item.quantity }}
          </li>
        </ul>
        <p>Total: ${{ order.total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Directly accessing the store's state
    orders() {
      return this.$store.getters.allOrders || [];
    },
  },
};
</script>

<style scoped>
.order {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
