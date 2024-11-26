<template>
  <div class="container my-5">
    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else>
      <div class="filters mb-4 d-flex justify-content-end">
        <label for="sortBy" class="mr-2">Sort By: </label>
        <select v-model="sortBy" @change="sortProducts" class="form-select w-auto">
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 justify-content-center g-4">
        <Card
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :image="product.image"
        />
      </div>

      <div class="text-center mt-4">
        <button @click="loadMore" :disabled="!hasMoreProducts" class="btn btn-primary btn-lg">
          Load More
        </button>
      </div>

      <div class="cart mt-5">
        <h3>Shopping Cart</h3>
        <ul>
          <li v-for="(item, index) in cart" :key="index">
            {{ item.title }} - ${{ item.price }} x {{ item.quantity }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';


export default {
  components: {
    Card,
  },
  data() {
    return {
      products: [],
      loading: false,
      itemsPerPage: 10,
      currentPage: 1,
      sortBy: 'nameAsc',
      cart: [], // This will store the products added to the cart
    };
  },
  computed: {
    sortedProducts() {
      let sorted = [...this.products];
      if (this.sortBy === 'nameAsc') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'nameDesc') {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
      } else if (this.sortBy === 'priceAsc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'priceDesc') {
        sorted.sort((a, b) => b.price - a.price);
      }
      return sorted;
    },
    paginatedProducts() {
      return this.sortedProducts.slice(0, this.currentPage * this.itemsPerPage);
    },
    hasMoreProducts() {
      return this.products.length > this.paginatedProducts.length;
    },
  },
  methods: {
    loadMore() {
      if (this.hasMoreProducts) {
        this.currentPage++;
      }
    },
    sortProducts() {
      this.currentPage = 1;
    },
    addToCart(product) {
      // Check if the product is already in the cart
      const existingProduct = this.cart.find(item => item.id === product.id);
      
      if (existingProduct) {
        // If it exists, increase the quantity
        existingProduct.quantity++;
      } else {
        // If it doesn't exist, add it to the cart with quantity 1
        this.cart.push({ ...product, quantity: 1 });
      }
    },
  },
  mounted() {
    this.loading = true;
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.row-cols-1, .row-cols-sm-2, .row-cols-md-3, .row-cols-lg-5 {
  gap: 20px;
}

.filters {
  margin-left: auto;
  text-align: right;
}

.btn-add-to-cart {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.btn-add-to-cart:hover {
  background-color: #0056b3;
  transform: translateY(-5px);
}

.btn-add-to-cart:active {
  transform: translateY(2px);
}
</style>