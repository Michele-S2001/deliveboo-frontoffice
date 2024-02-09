<template>
  <router-link :to="{ name: 'menu', params: { slug: currRestaurant.slug}}">
    <div @click="scrollToTop" class="restaurant-card">
      <div class="restaurant-card__header">
        <img class="restaurant-img" :src="`http://127.0.0.1:8000/storage/${currRestaurant.thumb}`">
        <div class="categories">
          <p class="category" v-for="category in currRestaurant.categories" :key="currRestaurant.id">{{ category.name }}</p>
        </div>
      </div>
      <div class="restaurant-card__body">
        <p class="restaurant-name">{{ currRestaurant.name }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      currRestaurant: Object
    },
    
    methods: {
    scrollToTop() {
      const duration = 0.1; // Durata dello scorrimento in millisecondi
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

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
.restaurant-card {

  &__header {
    position: relative;
    .restaurant-img {
      border-radius: 20px;
      object-fit: cover;
      height: 250px;
      width: 100%;
    }
    .categories {
      position: absolute;
      bottom: 5px;
      left: 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .category {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 7px;
        color: $white;
        background-color: rgba($black, $alpha: 0.6);
      }
    }
  }

  &__body {
    padding: 15px 0;

    .restaurant-name {
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>