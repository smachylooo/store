<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Checkout</h1>

    <form @submit.prevent="submitOrder">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          v-model="formData.firstName"
          :class="{ 'is-invalid': errors.firstName }"
          @input="clearError('firstName')"
        />
        <div class="invalid-feedback">{{ errors.firstName }}</div>
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          class="form-control"
          v-model="formData.lastName"
          :class="{ 'is-invalid': errors.lastName }"
          @input="clearError('lastName')"
        />
        <div class="invalid-feedback">{{ errors.lastName }}</div>
      </div>

      <div class="mb-3">
        <label for="countryCode" class="form-label">Country Code</label>
        <input
          type="text"
          id="countryCode"
          class="form-control"
          v-model="formData.countryCode"
          :class="{ 'is-invalid': errors.countryCode }"
          placeholder="+380"
          @input="clearError('countryCode')"
        />
        <div class="invalid-feedback">{{ errors.countryCode }}</div>
      </div>

      <div class="mb-3">
        <label for="phoneNumber" class="form-label">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          class="form-control"
          v-model="formData.phoneNumber"
          :class="{ 'is-invalid': errors.phoneNumber }"
          placeholder="0954673491"
          @input="clearError('phoneNumber')"
        />
        <div class="invalid-feedback">{{ errors.phoneNumber }}</div>
      </div>

      <h4 class="mt-4">Your Cart</h4>
      <ul class="list-group mb-4">
        <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ item.title }} (x{{ item.quantity }}) - ${{ (item.price * item.quantity).toFixed(2) }}</span>
          <img :src="item.image" :alt="item.title" class="img-thumbnail" style="max-width: 50px; max-height: 50px; object-fit: cover;"/>
        </li>
      </ul>

      <h5 class="text-end">Total: ${{ totalCartPrice }}</h5>

      <button
        type="submit"
        class="btn btn-success w-100"
        :disabled="!isFormValid"
      >
        Place Order
      </button>
    </form>

    <div v-if="confirmationMessage" class="alert alert-success mt-3">
      {{ confirmationMessage }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
      },
      errors: {},
      confirmationMessage: "",
    };
  },
  computed: {
  ...mapGetters(["cartItems", "totalCartPrice"]),
  

    isFormValid() {
      return (
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.countryCode &&
        this.formData.phoneNumber &&
        this.cartItems.length > 0
      );
    },
  },

  methods: {
    ...mapActions(["placeOrder", "clearCart", "setCartItems"]),

    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        this.setCartItems(JSON.parse(savedCart));
      }
    },

    saveCartToLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },

    validateForm() {
      this.errors = {};

      if (!this.formData.firstName) this.errors.firstName = "First Name is required.";

      if (!this.formData.lastName) this.errors.lastName = "Last Name is required.";

      const countryCodeRegex = /^\+\d+/;
      if (!this.formData.countryCode || !countryCodeRegex.test(this.formData.countryCode)) {
        this.errors.countryCode = "Country code must start with +.";
      }

      const phoneRegex = /^\d{10}$/;
      if (!this.formData.phoneNumber) {
        this.errors.phoneNumber = "Phone number is required.";
      } else if (!phoneRegex.test(this.formData.phoneNumber)) {
        this.errors.phoneNumber = "Phone number must be 10 digits and start with 0.";
      }

      return Object.keys(this.errors).length === 0;
    },

    clearError(field) {
  
      this.errors[field] = null;

      this.$forceUpdate(); 
    },


    async submitOrder() {
      if (!this.validateForm()) return;

      try {
        await this.$store.dispatch("placeOrder", this.formData);
      
        this.confirmationMessage = "Order successfully placed!";
        this.clearCart();
        localStorage.removeItem("cartItems");
      } catch (error) {
        this.confirmationMessage = "Error placing order. Please try again.";
      }
    },

  },

  mounted() {
    this.loadCartFromLocalStorage();
  },

  watch: {
    cartItems: {
      handler() {
        this.saveCartToLocalStorage();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.order img {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
}
</style>
