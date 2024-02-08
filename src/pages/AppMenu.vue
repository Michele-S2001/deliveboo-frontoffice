<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppDishCard from '../components/AppDishCard.vue';
import AppLoader from '../components/AppLoader.vue';
import store from '../store';
import axios from 'axios';

export default {
  components: {
    DefaultLayout,
    AppDishCard,
    AppLoader
  },

  props: {
    slug: String
  },

  data() {
    return {
      restaurant: null
    }
  },

  methods: {
    fetchRestaurant() {
      axios
        .get(`${store.BASE_URL}/restaurants/${this.slug}`)
        .then((res) => {
          this.restaurant = res.data.result;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            //this.$router.push({ name: 'not-found'}); 
            //TODO: Pagina not found 
          }
        })
    }
  },

  created() {
    this.fetchRestaurant();
  },

  computed: {
    categories() {
      return this.restaurant.categories;
    },

    dishes() {
      return this.restaurant.dishes;
    },
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="restaurant-window">
      <img v-if="restaurant" :src="`http://127.0.0.1:8000/storage/${restaurant.thumb}`" alt="">
      <div class="restaurant-window__overlay"></div>
    </div>
    <main v-if="restaurant" class="content px-10">
      <div class="container">
        <div class="menu">
          <div class="menu__banner">
            <h1 class="name">{{ restaurant.name }}</h1>
            <p class="address">{{ restaurant.address}}</p>
            <div class="categories">
              <span v-for="category in categories" :key="category.id">{{category.name}}</span>
            </div>
          </div>
          <div class="menu__cart-desktop-wrapper">
            <div class="menu-cart">
                <!-- TODO: Carrello ordine, con placeholder se non c'è nessun piatto selezionato -->
                <h2 class="menu-cart__title">Il tuo ordine</h2>
                <div class="menu-cart__empty">
                  <img src="../../img/grocery-cart.png">
                  <p class="message">Ancora non hai aggiunto nulla al carrello, appena lo farai i prodotti e le quantità appariranno qui</p>
                </div>
            </div>
          </div>
          <div class="menu__cart-mobile"></div>
          <div class="menu__list">
            <!-- start card -->
            <AppDishCard :dish="dish" v-for="dish in dishes" :key="dish.id"/>
            <!-- end card -->
          </div>
        </div>
      </div>
    </main>
    <AppLoader v-else />
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
.restaurant-window {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  position: relative;
  max-height: 270px;

  img {
    width: 100%;
    object-fit: cover;
    max-height: 270px;
  }

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
      padding: 20px;
      grid-area: banner;
      border-radius: 20px 60px 20px 20px;
      box-shadow: 5px 5px 12px 5px rgba(0,0,0,0.2);

      .name {
        margin-bottom: 24px;
      }

      .address { 
        margin-bottom: 16px;
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
        padding: 10px 20px;

        &__title {
          text-align: center;
          margin-bottom: 34px;
          font-size: 34px;
        }

        &__empty {
          img {
            margin: 0 auto;
            margin-bottom: 24px;
          }
          
          .message {
            text-align: center;
            font-size: 21px;
            padding: 20px 0;
          }
        }
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