<script>

import DefaultLayout from '../layouts/DefaultLayout.vue';
export default {
    DefaultLayout,
    components: { DefaultLayout }
}
</script>

<template>
<DefaultLayout>
  <form id="form">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="delivery-info">
            <ul>
              <h3>DATI ORDINE </h3>
              <li>
                <label for="name">Nome e Cognome</label>
                <input name="name"  type="text" id="name" placeholder="Nome e Cognome..." required />
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
        </div>
        <div class="col-6">
          <div class="payment">
            <ul>
              <h3>DATI PAGAMENTO</h3>
              <li>
                <label for="intestatario">Intestatario Carta</label>
                <input name="intestatario" type="text" id="intestatario" placeholder="Nome e Cognome..." required/>
              </li>
              <li>
                <label for="card-number">Numero della carta</label>
                <input name="card-number" type="number" id="card-number" placeholder="0000-0000-0000-0000" required />
              </li>
              <li>
                <label for="expiry-date">Data di scadenza</label>
                <input name="expiry-date" type="date" id="expiry-date" placeholder="Data..." required />
              </li>
              <li>
                <label for="cvv">CVV</label>
                <input name="cvv" type="number" id="cvv" placeholder="CVV..." required />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input class="button" type="submit" value="Paga"/>
    </div>
  </form>
</DefaultLayout>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

form {
  width: 500px;
  margin: 50px auto;
  background: $orange;
  padding: 30px;
  border-radius: 20px;
}

input {
  margin-top: 5px;
  padding: 5px;
  width: 90%;
}

.button {
  justify-content: center;
  cursor: pointer;
  text-align: center;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  width: 20%;
  color: $white;
  border: none;
  background-color: $green;
  padding: 0 30px;
  line-height: 40px;
  border-radius: 20px;
  font-weight: 600;
  &:hover {
  background-color: $lightGreen;
  }
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
}

</style>