<script>

import DefaultLayout from '../layouts/DefaultLayout.vue';
import axios from 'axios';
import store from '../store';

export default {
  DefaultLayout,
  components: { DefaultLayout },
  data() {

    return {
      customer: {
        nameSurname: '',
        email: '',
        address: '',
        phoneNumber: '',
        notes: '',
      },

      nonce: '',
      error: '',

      cardOwner: '',
      cart: [],
      cartDetails: [],
      currRestaurantCartSlug: null,

      currentOrderId: 0,
      token: '',
    }

  },

  methods: {
    // TODO: gestire invio dell'ordine nel back-end
    sendOrder(){
      let customerToSend = {
        name: this.customer.nameSurname,
        email: this.customer.email,
        address: this.customer.address,
        phone_number: this.customer.phoneNumber,
      };
      axios
        .post(`${this.BASE_URL}/orders`, {
          customer: customerToSend,
          cart: this.cart,
        })
        .then((res) => {
          this.currentOrderId = res.data.orderId;
        })
        .catch((error) => {
          console.log(error);
        });

    },

    dropIn() {
      var button = document.querySelector('#submit-button');
      var self = this;

      braintree.dropin.create({
        authorization: 'sandbox_24fs54xn_k6wtcbd6dhy78psc',
        selector: '#dropin-container'
      }, function (err, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
            if (err) {
              console.error('Errore durante la richiesta di pagamento', err);
            } else {
              // chiamata POST al server al quale inviamo il token del payload e l'id dell'ordine
              console.log('Payload del pagamento:', payload);

              axios.post(`${store.BASE_URL}/payment/process`, {
                token: payload.nonce,
                orderId: self.currentOrderId
              })
                .then((response) => {
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
    <!-- <form @submit.prevent="submitForm" id="form">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="delivery-info">
              <ul>
                <h3>DATI ORDINE </h3>
                <li>
                  <label for="name">Nome e Cognome</label>
                  <input name="name" type="text" id="name" placeholder="Nome e Cognome..." required />
                </li>
                <li>
                  <label for="email">Email</label>
                  <input name="email" type="email" id="email" placeholder="Email..." required />
                </li>
                <li>
                  <label for="number">Numero di cellulare</label>
                  <input name="number" type="number" id="number" placeholder="Numero di cellulare..." required />
                </li>
                <li>
                  <label for="address">Indirizzo</label>
                  <input name="address" type="text" id="address" placeholder="Indirizzo..." required />
                </li>
              </ul>
            </div>
            <button @click="sendOrder()" type="submit" ref="submit">
              Procedi al pagamento
            </button>
          </div>
        </div>
      </div>
    </form> -->

    <div class="container payment_form">
      <div id="dropin-container"></div>
      <button id="submit-button" class="button button--small button--green">Purchase</button>
    </div>

    <div class="container">
      <h3>Riepilogo Ordine</h3>
      <div v-for="dish in cart" :key="dish.id" class="summary_cart">
        <div class="price">
          <span>{{ dish.name }}</span>
          <span>{{ dish.price }} &euro;</span>
        </div>
        <div class="quantity">
          <span>x {{ dish.quantity }}</span>
        </div>
      </div>
      <div class="total_price">
        Totale: {{ totalAmount.toFixed(2) }}
      </div>
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

.summary_cart {
  max-width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-bottom: 2px solid $lightGreen;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;

  .price {
    display: flex;
    width: 60%;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

.total_price {
  margin-top: 10px;
  padding-left: 10px;
}

.payment_form {
  margin-bottom: 50px;
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

  .summary_cart {
    max-width: 100%;

    .price {
      width: 80%;
    }
  }
}
</style>