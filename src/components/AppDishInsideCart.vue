<template>
  <div class="dish-in-cart">
    <div class="dish-in-cart__top">
      <div class="name-and-quantity">
        <h4 class="dish-name">{{ dish.name }}</h4>
        <span class="quantity-per-dish">{{ dish.quantity }}x</span>
      </div>
      <div class="price">{{ dish.price }} &euro;</div>
    </div>
    <div class="dish-in-cart__bottom">
      <img @click="add(dish)" class="action action--add" src="../../img/plus.png">
      <img @click="remove(dish)" class="action action--detuct" src="../../img/minus-sign.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dish: {
        type: Object,
        required: true
      }
    },

    methods: {
      remove(obj) {
        this.$emit('decrease', obj);
      },
      add(obj) {
        this.$emit('adding', obj);
      }
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
  .dish-in-cart {
    margin: 10px;
    border-bottom: 2px solid $lightGreen;
    padding: 10px;
    border-radius: 20px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .price {
        font-size: 15px;
      }
      .name-and-quantity {
        display: flex;
        gap: 10px;

        .dish-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;

      .action {
        cursor: pointer;
      }
    }
  }
</style>