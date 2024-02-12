<template>
  <!-- start card -->
  <div class="dish-card">
    <div class="dish-card__header">
      <img :src="`http://127.0.0.1:8000/storage/${dish.image}`">
    </div>
    <div class="dish-card__body">
      <h4 class="dish-name">{{ dish.name }}</h4>
      <p class="dish-description">{{ dish.description }}</p>
      <div class="tools">
        <div class="price">{{ dish.price }} &euro;</div>
        <div class="add-to-cart" @click="addItem(dish)" v-if="isInCart">
          <img src="../../img/add.png">
        </div>
        <div class="already-in" v-else>
          <img src="../../img/prohibition.png">
        </div>
      </div>
    </div>
  </div>
  <!-- end card -->
</template>

<script>
  export default {
    props: {
      dish: {
        type: Object,
        required: true
      },
      isInCart: {
        type: Boolean,
        required: true
      }
    },

    methods: {
      addItem(obj) {
        this.$emit('add', obj);
      }
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.dish-card {
  border-bottom: 2px solid rgba($lightGreen, $alpha: 0.4);
  border-radius: 20px;
  

  &__header {
    padding: 10px;
    
    img {
      border-radius: 15px;
      object-fit: cover;
      height: 250px;
      width: 100%;
    }
  }

  &__body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .dish-name {
      font-size: 24px;
    }
    .tools {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price {
        font-weight: 600;
      }

      .add-to-cart {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
}

@media (min-width: 610px) {
  .dish-card {
    display: flex;

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 30%;
      img {
        height: 150px;
        width: 100%;
        object-fit: cover;
      }
    }

    &__body {
      flex-basis: 70%;
      .tools {
        margin-top: auto;
      }
    }
  } 
}

</style>