<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Your Cart</h1>
    
    <div v-if="!cartItems || cartItems.length === 0" class="alert alert-info text-center">
      Your cart is empty.
    </div>

    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="row mb-4 border-bottom pb-4">
        <div class="col-md-3">
          <img :src="item.image" :alt="item.title" class="img-fluid rounded">
        </div>
        <div class="col-md-7">
          <h3>{{ item.title }}</h3>
          <p><strong>Price:</strong> ${{ item.price }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        </div>
        <div class="col-md-2 d-flex align-items-center">
          <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm">
            Remove
          </button>
        </div>
      </div>

      <div class="text-end mt-4">
        <h4>Total: ${{ totalCartPrice }}</h4>
        <button @click="placeOrder" class="btn btn-success btn-lg">
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'totalCartPrice']),
  },
  methods: {
    ...mapActions(['removeFromCart', 'placeOrder']),
  },
};
</script>

<style scoped>
.cart-item-image {
  max-height: 150px;
  object-fit: cover;
}
</style>
