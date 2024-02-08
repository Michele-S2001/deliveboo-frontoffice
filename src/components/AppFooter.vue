<script>
export default {
  methods: {
    scrollToTop() {
      const duration = 500; // Durata dello scorrimento in millisecondi
      const start = window.scrollY; // Posizione di scorrimento verticale corrente della finestra
      const distance = -start; // Distanza calcolata come l'opposto della posizione di scorrimento verticale corrente (verso l'alto)
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime; // Tempo iniziale/corrente passato da requestAnimationFrame
        const timeLapsed = currentTime - startTime;
        const run = this.ease(timeLapsed, start, distance, duration); // Calcoliamo la posizione corrente di scorrimento utilizzando la funzione di easing, passando gli argomenti 
        window.scrollTo(0, run); // Posizionare la finestra del browser verticalmente calcolato dall'ease
        if (timeLapsed < duration) requestAnimationFrame(animation); // Se il tempo trascorso è inferiore alla durata dell'animazione, richiediamo il prossimo frame di animazione tramite requestAnimationFrame, passando la funzione animation 
      };

      requestAnimationFrame(animation);
    },

    ease(t, b, c, d) {
      t /= d; // Normalizza il tempo t dividendo per la durata totale d / T varia da 0 a 1 durante l'intera durata dell'animazione.
      return c * t * t + b;
    }
  }
}
</script>



<template>
  <svg class="footer-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#1d1d1d" fill-opacity="1"
      d="M0,192L80,181.3C160,171,320,149,480,149.3C640,149,800,171,960,165.3C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
    </path>
  </svg>
  <footer class="page-footer px-10">
    <div class="footer_logo container">
      <a href="#top" @click="scrollToTop">
        <img class="navbar__logo" src="/img/logo.png" alt="logo">
      </a>
    </div>
    <div class="container px-10 pb-10">
      <div class="row_1">
        <div class="col-3">
          <ul>
            <li class="title-li">Uniamo le forze</li>
            <li class="text-li">
              <a href="#">Lavora con noi</a>
            </li>
            <li class="text-li">
              <a href="#">Patner TasteIT</a>
            </li>
            <li class="text-li">
              <a href="#">Corrieri</a>
            </li>
            <li class="text-li">
              <a href="#">TasteIT Business</a>
            </li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li class="title-li">Link di interesse</li>
            <li class="text-li">
              <a href="#">Chi siamo</a>
            </li>
            <li class="text-li">
              <a href="#">FAQ</a>
            </li>
            <li class="text-li">
              <a href="#">TasteIT Prime</a>
            </li>
            <li class="text-li">
              <a href="#">Contattaci</a>
            </li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li class="title-li">Seguici</li>
            <li class="text-li">
              <a href="#">Facebook</a>
            </li>
            <li class="text-li">
              <a href="#">Twitter</a>
            </li>
            <li class="text-li">
              <a href="#">Instagram</a>
            </li>
            <li class="text-li">
              <a href="#">X</a>
            </li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li>
              <a href="#">
                <img class="img-store" src="/img/appleStore.svg" alt="Apple Store" />
              </a>
            </li>
            <li>
              <a href="#">
                <img class="img-store" src="/img/googleStore.svg" alt="Google Store" />
              </a>
            </li>
            <li class="text-li">
              <a href="#">Termini e condizioni</a>
            </li>
            <li class="text-li">
              <a href="#">Politica sulla privacy</a>
            </li>
            <li class="text-li">
              <a href="#">Politica sui cookie</a>
            </li>
            <li class="text-li">
              <a href="#">Conformità</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
  
<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.footer-svg {
  position: relative;
  bottom: -20px;
}

.footer_logo {
  margin-bottom: 30px;
}

.page-footer {
  background-color: #1d1d1d;
  color: $white;
  padding-top: 40px;
  padding-bottom: 40px;
}

.svg {
  background-color: $white;
}

.row_1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.col-3 {
  flex: 0 0 calc(25% - 20px);
}

.title-li {
  font-weight: 400;
  font-size: 23px;
  padding-bottom: 5px;
}

.text-li {
  color: rgb(162, 155, 155);
  font-size: 19px;
  padding-top: 5px;
}

.img-store {
  width: 90px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .col-3 {
    flex: 0 0 100%;
  }

  .title-li {
    font-weight: 300;
    font-size: 17px;
  }

  .text-li {
    font-size: 14px;
  }

  .img-store {
    width: 70px;
    margin-bottom: 5px;
  }

}
</style>
  