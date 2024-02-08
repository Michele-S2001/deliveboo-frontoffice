<template>
  <!-- start card -->
  <div class="dish-card">
    <div class="dish-card__header">
      <img src="../../img/placeHolder.jpg">
    </div>
    <div class="dish-card__body">
      <h4 class="dish-name">Lorem ipsum man</h4>
      <p class="dish-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quam voluptate accusantium, corrupti libero beatae est aliquam. Sint, molestias autem.</p>
      <div class="tools">
        <div class="price">14.00 &euro;</div>
        <div class="add-to-cart">
          <img src="../../img/add.png">
        </div>
      </div>
    </div>
  </div>
  <!-- end card -->
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.dish-card {
  border-bottom: 2px solid rgba($lightGreen, $alpha: 0.4);
  border-radius: 20px;

  &__header {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      border-radius: 15px;
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
      }
    }
  }
}

@media (min-width: 610px) {
  .dish-card {
    display: flex;

    &__body {
      .tools {
        margin-top: auto;
      }
    }
  } 
}

</style>