<!-- Vue 2 -->

<template>
  <div class="container my-5">
    <h1 class="text-center mb-4 text-primary">Order Summary</h1>

    <div v-if="orders.length === 0" class="alert alert-info">
      No orders yet.
    </div>
    
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order mb-4 p-4 border rounded shadow-sm">
        <h3 class="text-info">Order ID: {{ order.id }}</h3>
        
        <div class="mb-3">
          <p><strong>Buyer:</strong> {{ order.firstName }} {{ order.lastName }}</p>
          <p><strong>Phone:</strong> {{ order.countryCode }}{{ order.phoneNumber }}</p>
        </div>

        <h4 class="text-secondary">Products:</h4>
        <ul class="list-group mb-3">
          <li v-for="item in order.productList" :key="item.id" class="list-group-item">
            {{ item.title }} - {{ item.count }} pcs - ${{ (item.price * item.count).toFixed(2) }}
          </li>
        </ul>
        
        <p class="font-weight-bold">
          <strong>Total:</strong> ${{ order.total }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      // Access all orders from the Vuex store
      return this.$store.getters.allOrders || [];
    },
  },
};
</script>

<style scoped>
.order {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-group-item {
  background-color: #f8f9fa;
  border: none;
}

.list-group-item:nth-child(odd) {
  background-color: #f1f3f5;
}

h3, h4 {
  color: #495057;
}

.font-weight-bold {
  font-weight: 600;
}

.alert-info {
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}
</style>
