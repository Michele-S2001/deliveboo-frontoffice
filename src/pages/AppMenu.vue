<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppDishCard from '../components/AppDishCard.vue';
import AppLoader from '../components/AppLoader.vue';
import AppDishInsideCart from '../components/AppDishInsideCart.vue';
import AppEmptyCart from '../components/AppEmptyCart.vue';
import store from '../store';
import axios from 'axios';

export default {
  components: {
    DefaultLayout,
    AppDishCard,
    AppLoader,
    AppDishInsideCart,
    AppEmptyCart
  },

  props: {
    slug: String
  },

  data() {
    return {
      restaurant: null,
      cartMobileToggle: false,
      cart: [],
      currRestaurantCartId: null,
      currRestaurantCartSlug: null,
      error: false
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
            this.$router.push({ name: 'notFound' });
          }
        })
    },

    openCart() {
      this.cartMobileToggle = !this.cartMobileToggle
    },

    //se è salvato il carrello lo recupero dal localstorage
    recoverCartItems() {
      const storage = localStorage.getItem('cart');
      if (storage) {
        this.cart = JSON.parse(storage);
      }
    },

    //di consequenza se c'è il carrello, recupero l'id del ristorante al quale stiamo facendo l'ordinazione
    recoverRestaurantId() {
      const currRestaurantCart = localStorage.getItem('currRestaurant');
      if (currRestaurantCart) {
        this.currRestaurantCartId = JSON.parse(currRestaurantCart)
      }
    },

    recoverRestaurantSlug() {
      const currRestaurantCartSlug = localStorage.getItem('currRestaurantSlug');
      if (currRestaurantCartSlug) {
        this.currRestaurantCartSlug = JSON.parse(currRestaurantCartSlug);
      }
    },

    /* 
    - Al click sul "+" del piatto aggiungo al carrello, se l'array è lunghezza 0, non faccio controlli, imposto la quantità e creo il carrello salvandolo, e memorizzo l'id del ristorante
    - Se invece è presente qualcosa nell'array del carrello, controllo che non ci sia già quel piatto e che provenga dallo stesso ristorante 
    - Se non dovesse rispettare le condizioni allora faccio apparire il messaggio di errore
    */

    addToCart(obj) {

      if (this.cart.length === 0) {
        obj.quantity = 1;
        this.cart.push(obj);
        this.saveToCart();
        this.saveCurrentRestaurant(obj.restaurant_id);
        this.saveCurrRestaurantSlug();
      } else if (
        !(this.cart.find(el => el.id === obj.id))
        && obj.restaurant_id === this.currRestaurantCartId
      ) {
        obj.quantity = 1;
        this.cart.push(obj);
        this.saveToCart();
      } else {
        this.error = true;
        this.cartMobileToggle = true;
        setTimeout(() => {
          this.error = false;
        }, 8000);
      }
    },

    /*
    - Se la quantità dell'oggetto è 1, allora lo rimuovo
    - Se no, diminuisco la quantità e vado a sovrascrivere l'oggetto allo stesso indice in qui è presente all'interno dell'array
    - e salvo il carrello sovrascrivendo i dati
    */
    removeOneItem(obj) {

      if (obj.quantity === 1) {
        this.removeItem(obj);
      } else {
        obj.quantity--;
        const index = this.cart.findIndex(el => el.id === obj.id);
        this.cart[index] = obj;
        this.saveToCart();
      }
    },

    /*
    - Aumento di 1 la quantità, trovo l'indice, sovrascrivo l'oggetto e poi il carrello
    */
    addOneMoreItem(obj) {
      obj.quantity++;
      const index = this.cart.findIndex(el => el.id === obj.id);
      this.cart[index] = obj;
      this.saveToCart();
    },

    /*
    - se la quantità è 1 allora filtro l'array ecludendo il piatto corrispondente all'id ricevuto, sovrascrivo il carrello, se il carrello a quel punto è vuoto, l'array sarà vuoto e rimuoverò anche l'id del ristorante salvato 
    */
    removeItem(obje) {
      this.cart = this.cart.filter((el) => el.id !== obje.id);
      this.saveToCart();
      if (this.cart.length === 0) {
        this.emptyCart();
      }
    },

    /* 
    - ogni volta che un elemento si aggiunge o si toglie, qui l'array viene sovrascritto nel localStorage
    */
    saveToCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    /* 
    - al primo piatto aggiunto qui viene salvato anche il risturante da cui proviene
    */
    saveCurrentRestaurant(rest) {
      this.currRestaurantCartId = rest
      localStorage.setItem('currRestaurant', JSON.stringify(rest));
    },

    saveCurrRestaurantSlug() {
      this.currRestaurantCartSlug = this.slug;
      localStorage.setItem('currRestaurantSlug', JSON.stringify(this.slug));
    },

    /*
    - in caso il carrello sia vuoto, togli l'id del ristorante
    */
    emptyCart() {
      this.currRestaurantCartSlug = null,
        this.currRestaurantCartId = null;
      localStorage.removeItem('currRestaurant');
      localStorage.removeItem('currRestaurantSlug');
    },

    checkIfItemIsInCart(itemId) {
      if (this.cart) {
        return !(this.cart.some(el => el.id === itemId));
      }
    }
  },

  created() {
    this.fetchRestaurant();
  },

  mounted() {
    /* 
    - Se è presente già un carrello, recupera questo e l'id del ristorante associato
    */
    this.recoverCartItems();
    this.recoverRestaurantId();
    this.recoverRestaurantSlug();
  },

  computed: {
    categories() {
      return this.restaurant.categories;
    },

    dishes() {
      return this.restaurant.dishes;
    },

    totalAmount() {
      return this.cart
        .map((el) => {
          return parseFloat(el.price) * el.quantity
        })
        .reduce((acc, currValue) => (acc + currValue), 0);
    }
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
            <p class="address">{{ restaurant.address }}</p>
            <div class="categories">
              <span v-for="category in categories" :key="category.id">{{ category.name }}</span>
            </div>
          </div>
          <div class="menu__cart-desktop-wrapper">
            <!-- cart nella versione desktop -->
            <div class="menu-cart">
              <h2 class="menu-cart__title">Il tuo ordine</h2>
              <div class="dishes" v-if="cart.length !== 0">
                <!--  card dentro il carrello  -->
                <AppDishInsideCart @adding="addOneMoreItem" @decrease="removeOneItem" :dish="item" v-for="item in cart"
                  :key="item.id" />
                <div class="alert" v-show="error">
                  <p>ATTENZIONE! Puoi ordinare da un solo ristorante alla volta</p>
                  <router-link :to="{ name: 'menu', params: { slug: currRestaurantCartSlug } }">
                    Torna al ristorante
                  </router-link>
                </div>
                <div class="checkout-btn">
                  <a href="#">Ordinare per {{ totalAmount.toFixed(2) }} &euro;</a>
                </div>
              </div>
              <AppEmptyCart v-else />
            </div>
          </div>
          <!-- cart nella versione mobile -->
          <div class="menu__cart-mobile">
            <div class="menu__cart-mobile__wrapper" :class="[cartMobileToggle ? 'show' : '']">
              <div class="dishes" v-if="cart.length !== 0">
                <h2 class="menu-cart__title">Il tuo ordine</h2>
                <!--  card dentro il carrello  -->
                <AppDishInsideCart @adding="addOneMoreItem" @decrease="removeOneItem" :dish="item" v-for="item in cart"
                  :key="item.id" />
                <div class="alert" v-show="error">
                  <p>ATTENZIONE! Puoi ordinare da un solo ristorante alla volta</p>
                  <router-link :to="{ name: 'menu', params: { slug: currRestaurantCartSlug } }">
                    Torna al ristorante
                  </router-link>
                </div>
                <div class="checkout-btn-mobile">
                  <a href="#">Ordinare per {{ totalAmount.toFixed(2) }} &euro;</a>
                </div>
              </div>
              <AppEmptyCart v-else />
            </div>
            <div class="menu__cart-mobile__button" @click="openCart()">
              Carrello
            </div>
          </div>
          <div class="menu__list">
            <!-- start card -->
            <AppDishCard @add="addToCart" :dish="dish" v-for="dish in dishes" :key="dish.id"
              :isInCart="checkIfItemIsInCart(dish.id)" />
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
@use '../styles/partials/mixins' as *;

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
      box-shadow: 5px 5px 12px 5px rgba(0, 0, 0, 0.2);

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
        box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.44);
        border-radius: 20px;
        padding: 10px;
        max-height: 500px;
        overflow: auto;

        &__title {
          text-align: center;
          margin-bottom: 34px;
          font-size: 34px;
        }

        .dishes {
          .checkout-btn {
            cursor: pointer;
            margin-top: 40px;
            text-align: center;
            @include primaryButton();

            &:hover {
              background-color: $lightGreen;
            }
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
      max-width: 90%;
      margin: 0 auto;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      &__button {
        padding: 10px 0;
        color: $white;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-align: center;
        cursor: pointer;
        border-radius: 20px;
        background-color: $green;
        user-select: none;

        &:hover {
          background-color: $lightGreen;
        }
      }

      &__wrapper {
        background-color: $white;
        max-height: 0;
        overflow: auto;
        border-radius: 20px;
        transition: 0.5s ease-out;

        .dishes {
          .menu-cart__title {
            text-align: center;
          }

          .checkout-btn-mobile {
            text-align: center;
            margin: 34px 24px 14px 24px;
            @include primaryButton();

            &:hover {
              background-color: $lightGreen;
            }
          }
        }

        .dishes {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
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

.content .menu .menu__cart-mobile .menu__cart-mobile__wrapper.show {
  max-height: 500px;
  box-shadow: 2px 2px 8px 5px rgba(0, 0, 0, 0.5);
}

.alert {
  text-align: center;
  color: red;

  a {
    text-decoration: underline;
  }
}

@media (min-width: 638px) {
  .content {
    .menu {
      &__cart-mobile {
        max-width: 60%;
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