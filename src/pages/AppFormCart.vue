<script>

import DefaultLayout from '../layouts/DefaultLayout.vue';
import axios from 'axios';
import store from '../store';

export default {
  DefaultLayout,
  components: { DefaultLayout },
  data() {

    return {
      hostedFieldInstance: false,
      nonce: '',
      error: '',
      cardOwner: '',
      nameSurname: '',
      address: '',
      notes: '',
      email: '',
      phoneNumber: '',
      cart: [],
      cartDetails: [],
      currRestaurantCartSlug: null,
    }

  },
  
  methods: {
    
    dropIn(){
      var button = document.querySelector('#submit-button');
  
      braintree.dropin.create({
        authorization: 'sandbox_24fs54xn_k6wtcbd6dhy78psc',
        selector: '#dropin-container'
      }, function (err, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
            if(err) {
              console.error('Errore durante la richiesta di pagamento', err);
            } else {
              // chiamata POST al server al quale inviamo il token del payload e l'id dell'ordine
              console.log('Payload del pagamento:', payload);
              // TODO: gestire l'invio del token e degli ordini 
              axios.post(`${store.BASE_URL}/payment/process`, {
                token: payload.nonce,
                orderId: 3
              })
              .then((response)=>{
                console.log('Risposta al server:', response.data)
              })
            }
          });
        })
      });
    },
    
    fetchAuth() {
      axios
        .get(`${store.BASE_URL}/payment/token`)
        .then((res) => {
          console.log(res);
          this.token = res.data.data.token;
        })
        .catch((error) => {
          console.log('Authorization Key not found!', error.response);
        });
    },


    getCartDetails() {
      this.cartDetails = this.cart.map((el) => {
        return {
          id: el.id,
          quantity: el.quantity
        }
      });
    },

    //se è salvato il carrello lo recupero dal localstorage
    recoverCartItems() {
      const storage = localStorage.getItem('cart');
      if (storage) {
        this.cart = JSON.parse(storage);
      }
    },
    recoverRestaurantSlug() {
      const currRestaurantCartSlug = localStorage.getItem('currRestaurantSlug');
      if (currRestaurantCartSlug) {
        this.currRestaurantCartSlug = JSON.parse(currRestaurantCartSlug);
      }
    },

  },
  computed: {
    totalAmount() {
      return this.cart
        .map((el) => {
          return parseFloat(el.price) * el.quantity
        })
        .reduce((acc, currValue) => (acc + currValue), 0);
    }
  },
  mounted() {
    this.recoverCartItems();
    this.recoverRestaurantSlug();
    this.fetchAuth();
    this.dropIn();
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div id="dropin-container"></div>
      <button id="submit-button" class="button button--small button--green">Purchase</button>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}


@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-6 {
    width: 100%;
  }

  form {
    width: 300px;
    margin: 50px auto;
    background: $orange;
    padding: 30px;
    border-radius: 20px;
  }

  .payment {
    margin-top: 10px;
  }

  .dish_name {
    width: 75%;
  }
}
</style>