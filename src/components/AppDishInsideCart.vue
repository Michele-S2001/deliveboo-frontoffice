<template>
  <div class="dish-in-cart">
    <div class="dish-in-cart__top">
      <div class="name-and-quantity">
        <h4 class="dish-name">Pasta alla carbonara</h4>
        <span class="quantity-per-dish">4x</span>
      </div>
      <div class="price">16.00 &euro;</div>
    </div>
    <div class="dish-in-cart__bottom">
      <img class="action action--add" src="../../img/plus.png">
      <img class="action action--detuct" src="../../img/minus-sign.png">
    </div>
  </div>
</template>

<script>
  export default {
    
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