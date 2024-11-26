<template>
  <div>
    <b-card
      :title="title"
      :img-alt="title"
      img-top
      tag="article"
      style="max-width: 20rem; height: 100%; display: flex; flex-direction: column; justify-content: space-between;"
      class="mb-2"
    >
      <img
        :src="image"
        :alt="title"
        class="card-img"
        style="width: 100%; height: 200px; object-fit: cover;"
      />
      <b-card-text>
        {{ price }}$
      </b-card-text>
      <div class="card-footer">
        <b-button @click="handleAddToCart" variant="primary" class="btn-add-to-cart">
          Add to Cart
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(['addToCart']),
    handleAddToCart() {
      console.log('Adding to Cart:', this.title, this.price, this.image, this.id);
      this.addToCart({
        id: this.id,
        title: this.title,
        price: this.price,
        image: this.image,
      });
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
