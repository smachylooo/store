import { createStore } from "vuex";

const store = createStore({
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },

  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },

    ADD_ORDER(state, order) {
      state.orders.push(order);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },

  actions: {
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },

    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },

    clearCart({ commit }) {
      commit("CLEAR_CART");
    },

    placeOrder({ commit, state }, formData) {
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = {
        id: Date.now(),
        lastName: formData.lastName,
        firstName: formData.firstName,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        productList: state.cart.map((item) => ({
          id: item.id,
          title: item.title,
          count: item.quantity,
          price: item.price,
        })),
        total: total.toFixed(2),
      };

      commit("ADD_ORDER", order);
      commit("CLEAR_CART");
    },
  },

  getters: {
    cartItems: (state) => state.cart,
    totalCartPrice: (state) =>
      state.cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
    cartItemCount: (state) =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
    allOrders: (state) => state.orders,
  },
});

export default store;
