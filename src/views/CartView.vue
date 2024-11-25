<script>
import { store } from '../store';

export default {
  computed: {
    // Get unique cart items grouped by ID
    groupedCartItems() {
      const grouped = {};
      store.cart.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { ...item, quantity: 0 };
        }
        grouped[item.id].quantity += item.quantity;
      });
      return Object.values(grouped);
    },
    // Calculate total cost of all items in the cart
    totalCost() {
      return this.groupedCartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    // Remove a specific item from the cart
    removeItem(item) {
      store.cart = store.cart.filter((cartItem) => cartItem.id !== item.id);
    },
    // Increment the quantity of a specific item
    addItem(item) {
      const existingItem = store.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    // Decrement the quantity of a specific item
    subtractItem(item) {
      const existingItem = store.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          this.removeItem(item); 
        }
      }
    },
  },
};
</script>

<template>
  <div class="cart-view">
    <h1>Cart</h1>
    <div v-if="groupedCartItems.length === 0">Your cart is empty.</div>
    <div v-else>
      <div v-for="item in groupedCartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.title }}</h3>
          <p>Price per unit: {{ item.price }}$</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Total: {{ (item.price * item.quantity).toFixed(2) }}$</p>
          <div class="quantity-controls">
            <button @click="subtractItem(item)" class="subtract-btn">-</button>
            <button @click="addItem(item)" class="add-btn">+</button>
          </div>
          <button @click="removeItem(item)" class="remove-btn">Remove</button>
        </div>
      </div>
      <h2>Total: {{ totalCost }}$</h2>
    </div>
  </div>
</template>


<style>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h3 {
  margin: 0;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.remove-btn:hover {
  background-color: #c82333;
}

.quantity-controls {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.subtract-btn, .add-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.subtract-btn:hover, .add-btn:hover {
  background-color: #0056b3;
}

</style>
