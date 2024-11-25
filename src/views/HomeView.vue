<template>
  <div class="home-view">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="filters">
        <label for="sortBy">Sort By: </label>
        <select v-model="sortBy" @change="sortProducts">
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>
      
      <div class="cards">
        <Card
          v-for="product in paginatedProducts"
          :key="product.id"
          :title="product.title"
          :image="product.image"
          :price="product.price"
        />
      </div>

      <div class="pagination">
        <button @click="loadMore" :disabled="!hasMoreProducts">Load More</button>
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
  },
  mounted() {
    this.loading = true;
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((res) => {
        this.products = res;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px; 
}

.cards > * {
  max-width: 100%; 
}

.filters {
  margin-bottom: 20px;
  text-align: center;
}

.filters select {
  padding: 5px;
  font-size: 16px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
