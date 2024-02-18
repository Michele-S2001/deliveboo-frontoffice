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
        full_name: '',
        email: '',
        delivery_addres: '',
        phone_number: '',
        notes: '',
        subtotal: null,
        payment_status: false
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

    triggerClick(){
      document.getElementById('submit-button').click(); 
    },

    subTotal() {
      this.customer.subtotal = this.cart
        .map((el) => {
          return parseFloat(el.price) * el.quantity
        })
        .reduce((acc, currValue) => (acc + currValue), 0);
    },
    
    sendOrder(){
      let customerToSend = {
        name: this.customer.full_name,
        email: this.customer.email,
        address: this.customer.delivery_addres,
        phone_number: this.customer.phone_number,
        notes: this.customer.notes,
        subtotal: this.customer.subtotal,
        payment_status: this.customer.payment_status
      };
      axios
        .post(`http://127.0.0.1:8000/api/orders`, {
          customer: customerToSend,
          cart: this.cart,
        })
        .then((res) => {
          this.currentOrderId = res.data.orderId;
          if(res.data.success){
            this.triggerClick();
            setTimeout(() => {
            this.$router.push({ name: 'order' }); 
            }, 4000);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    dropIn() {
      var button = document.querySelector('#submit-button');
      var self = this;

      braintree.dropin.create({
        authorization: 'sandbox_yktgzv4b_cznsj3xkwd68x79g',
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
    this.subTotal();
  }
}
</script>

<template>
  <DefaultLayout>
    <form @submit.prevent="submitForm" id="form">
      <div class="container">
        <!-- informazioni cliente -->
        <div class="row">
          <div class="col-6-1">
            <div class="delivery-info">
              <ul>
                <h3>DATI ORDINE </h3>
                <li class="d-flex">
                  <label for="name">Nome e Cognome</label>
                  <input v-model="customer.full_name" name="name" type="text" id="name" placeholder="Nome e Cognome..." required />
                </li>
                <li class="d-flex">
                  <label for="email">Email</label>
                  <input v-model="customer.email" name="email" type="email" id="email" placeholder="Email..." required />
                </li>
                <li class="d-flex">
                  <label for="number">Numero di cellulare</label>
                  <input v-model="customer.phone_number" name="number" type="number" id="number" placeholder="Numero di cellulare..." required />
                </li>
                <li class="d-flex">
                  <label for="address">Indirizzo</label>
                  <input v-model="customer.delivery_addres" name="address" type="text" id="address" placeholder="Indirizzo..." required />
                </li>
                <li class="d-flex">
                  <label for="address">Note</label>
                  <textarea v-model="customer.notes" name="notes" id="notes" cols="30" rows="10" placeholder="Note..."></textarea>
                </li>
              </ul>
            </div>
          </div>
          <!-- pagamento -->
          <div class="col-6"> 
           <div class=" payment_form">
              <div id="dropin-container"></div>
              <button style="opacity: 0;" id="submit-button">Paga</button>
            </div> 
          </div>
         
        </div>
        <!-- bottoni -->
        <div class="align-items-center">
          <button @click="sendOrder()" class="button" type="submit" ref="submit">
            Conferma i tuoi dati
          </button>
        </div>  
      </div>
    </form>

    
    <!-- riepilogo ordine -->
    <div class="container">
      <h3 class="summary_title">Riepilogo Ordine</h3>
      <div v-for="dish in cart" :key="dish.id" class="summary_cart">
        <div class="price">
          <span>{{ dish.name }}</span>
          <span>{{ dish.price }} &euro;</span>
        </div>
        <div class="quantity">
          <span>x {{ dish.quantity }}</span>
        </div>
      </div>
      <div class="total_price summary_title">
        Totale: {{ totalAmount.toFixed(2) }}
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.align-items-center {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button {
  cursor: pointer;
  display: flex;
  margin: 0 auto;
  color: $white;
  border: none;
  background-color: $green;
  padding: 0 20px;
  line-height: 40px;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  &:hover {
  background-color: $lightGreen;
  }
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
form {
    width: 80%;
    margin: 50px auto;
    background: $orange;
    padding: 30px;
    border-radius: 20px;
  }

input {
    width: 70%;
    line-height: 40px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
  }

  textarea {
    width: 70%;
    height: 70px;
    line-height: 40px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
  }

  .d-flex {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-6 {
    width: 100%;
  }

  form {
    width: 280px;
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
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    

    .price {
      width: 50%;
    }
  }

  .align-items-center {
  display: flex;
  flex-direction: column;
  }

  input {
    width: 100%;
    line-height: 40px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
  }
  textarea {
    width: 100%;
    height: 50px;
    
  }

  .summary_title {
    margin-left: 30px;
    
  }

}
</style>