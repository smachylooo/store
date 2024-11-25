<script>
import { store } from '../store';

export default {
  name: 'Card',
  props: {
    title: String,
    image: String,
    price: Number,
    id: Number,
  },
  methods: {
    handleAddToCart() {
      store.addToCart({
        id: this.id,
        title: this.title,
        price: this.price,
        image: this.image,
      });
    },
  },
};
</script>

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
        <b-button @click="handleAddToCart" variant="primary">Add to Cart</b-button>
      </div>
    </b-card>
  </div>
</template>
