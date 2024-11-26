import { createStore } from "vuex";

const store = createStore({
  state: {
    cart: [],
    orders: [],
  },

  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

    CLEAR_CART(state) {
      state.cart = [];
    },

    ADD_ORDER(state, order) {
      state.orders.push(order);
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

    placeOrder({ commit, state }) {
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = {
        id: Date.now(),
        items: [...state.cart],
        total,
      };

      commit("ADD_ORDER", order);
      commit("CLEAR_CART");

      // Simulate saving to localStorage
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },

  getters: {
    cartItems: (state) => state.cart,
    cartItemCount: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0),
    totalCartPrice: (state) => {
      return state.cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
    allOrders: (state) => state.orders,
  },
});

export default store;
