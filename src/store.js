import { reactive } from "vue";

export const store = reactive({
  cart: [],
  addToCart(product) {
    const existingItem = store.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      store.cart.push({ ...product, quantity: 1 });
    }
  },
  get totalItems() {
    return store.cart.reduce((sum, item) => sum + item.quantity, 0);
  },
});
