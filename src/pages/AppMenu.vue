<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';

export default {
  components: {
    DefaultLayout
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="restaurant-window">
      <div class="restaurant-window__overlay"></div>
    </div>
    <main class="content">
      <div class="container">
        <div class="menu">
          <div class="menu__banner"></div>
          <div class="menu__cart-desktop-wrapper">
            <div class="menu-cart"></div>
          </div>
          <div class="menu__cart-mobile"></div>
          <div class="menu__body">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic impedit cum enim quaerat distinctio aliquid beatae temporibus voluptates! Natus, consequuntur doloribus. Iste laborum fugit perspiciatis! Alias excepturi sit culpa quia, facere explicabo cumque ducimus, eum illo dignissimos delectus mollitia quaerat reiciendis! Officia explicabo deserunt distinctio temporibus, labore amet, veritatis nam voluptatum reiciendis quas quae corrupti minus tempora quod aspernatur rerum est. Id, optio animi molestiae aperiam nihil necessitatibus doloremque quis et magni veritatis pariatur reprehenderit sit asperiores, sapiente omnis. Iusto eligendi quod possimus voluptatum.
            orem ipsum dolor sit amet consectetur, adipisicing elit. Hic impedit cum enim quaerat distinctio aliquid beatae temporibus voluptates! Natus, consequuntur doloribus. Iste laborum fugit perspiciatis! Alias excepturi sit culpa quia, facere explicabo cumque ducimus, eum illo dignissimos delectus mollitia quaerat reiciendis! Officia explicabo deserunt distinctio temporibus, labore amet, veritatis nam voluptatum reiciendis quas quae corrupti minus tempora quod aspernatur rerum est. Id, optio animi molestiae aperiam nihil necessitatibus doloremque quis et magni veritatis pariatur reprehenderit sit asperiores, sapiente omnis. Iusto eligendi quod possimus voluptatum.
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
.restaurant-window {
  background-image: url(../../img/placeHolder.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  padding: 100px 0;
  position: relative;

  &__overlay {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(10px);
    box-shadow: inset 0px 0px 17px 5px #FFFFFF;
  }
}

.content {
  .menu {
    top: -50px;
    position: relative;
    z-index: 99;
    display: grid;
    grid-template-areas: 
      "banner"
      "body"
      "cart";
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto auto;


    // banner 
    &__banner {
      background-color: $white;
      min-height: 100px;
      grid-area: banner;
      border-radius: 20px 60px 20px 20px;
      box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.44);
    }

    //cart vista desktop
    &__cart-desktop-wrapper {
      display: none;
      position: relative;
      .menu-cart {
        background-color: $white;
        box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.44);
        border-radius: 20px;
        min-height: 200px;
      }
    }

    //cart vista mobile
    &__cart-mobile {
      position: fixed;  
      bottom: 20px;
      left: 0;
      right: 0;
      min-height: 50px;
      max-width: 80%;
      background-color: $green;
      margin: 0 auto;
      border-radius: 20px;
    }

    //corpo del menu
    &__body {
      grid-area: body;
      background-color: red;
    }
  }
}

@media (min-width: 800px) {
  .content {
    .menu {
      grid-template-areas: 
        "banner cart"
        "body cart";
      grid-template-columns: 1fr 380px;

      &__cart-desktop-wrapper {
        grid-area: cart;
        display: block;
        position: relative;
        .menu-cart {
          top: 20px;
          position: sticky;
        }

      }

      &__cart-mobile {
        display: none;
      }
    }
  }
}

</style>