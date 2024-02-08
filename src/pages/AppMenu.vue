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
    <main class="content px-10">
      <div class="container">
        <div class="menu">
          <div class="menu__banner">
            <h1 class="name">Restaurant name</h1>
            <div class="categories">
              <span>lorem</span>
              <span>lorem</span>
              <span>lorem</span>
            </div>
          </div>
          <div class="menu__cart-desktop-wrapper">
            <div class="menu-cart">
                <!-- TODO: Carrello ordine, con placeholder se non c'è nessun piatto selezionato -->
            </div>
          </div>
          <div class="menu__cart-mobile"></div>
          <div class="menu__list">
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
    z-index: 90;
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
      padding: 20px 10px;
      grid-area: banner;
      border-radius: 20px 60px 20px 20px;
      box-shadow: 5px 5px 12px 5px rgba(0,0,0,0.2);

      .name {
        margin-bottom: 24px;
      }
      .categories {
        display: flex;
        gap: 15px;
      }
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
    &__list {
      grid-area: body;
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

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
    }
  }
}

@media (min-width: 610px) {

  .content {
    .menu {

      &__list {
        
        .dish-card {
          display: flex;

          &__body {
            .tools {
              margin-top: auto;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1000px) {
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