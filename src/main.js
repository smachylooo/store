import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import store from "./store";

import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import CartView from "./views/CartView.vue";
import OrderView from "./views/OrderView.vue";
import NotFound from "./views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: HomeView },
    { name: "Cart", path: "/cart", component: CartView },
    { name: "Order", path: "/order", component: OrderView },
    { name: "NotFound", path: "/:catchAll(.*)", component: NotFound },
  ],
});

createApp(App).use(router).use(BootstrapVue3).use(store).mount("#app");
