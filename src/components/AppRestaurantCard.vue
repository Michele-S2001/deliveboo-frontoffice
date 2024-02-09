<template>
  <router-link :to="{ name: 'menu', params: { slug: currRestaurant.slug}}">
    <div class="restaurant-card">
      <div class="restaurant-card__header">
        <img class="restaurant-img" :src="`http://127.0.0.1:8000/storage/${currRestaurant.thumb}`">
        <div class="categories">
          <p class="category" v-for="category in currRestaurant.categories" :key="currRestaurant.id">{{ category.name }}</p>
        </div>
      </div>
      <div class="restaurant-card__body">
        <p class="restaurant-name">{{ currRestaurant.name }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      currRestaurant: Object
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
.restaurant-card {

  &__header {
    position: relative;
    .restaurant-img {
      border-radius: 20px;
      object-fit: cover;
      height: 250px;
      width: 100%;
    }
    .categories {
      position: absolute;
      bottom: 5px;
      left: 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .category {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 7px;
        color: $white;
        background-color: rgba($black, $alpha: 0.6);
      }
    }
  }

  &__body {
    padding: 15px 0;

    .restaurant-name {
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>