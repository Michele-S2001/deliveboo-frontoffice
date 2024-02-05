<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppHeader from '../components/AppHeader.vue';



export default {
  components: {
    DefaultLayout,
    AppHeader
  },

  data() {
    return {
      page: 'Home page di TasteIT'
    }
  }
}
</script>

<template>
  <DefaultLayout>
    <main class="content">
      <section class="hero">
        <!-- Contenitore principale della pagina -->
        <div class="container">
          <!-- Div con  ID 'wrapper' che avrà la classe 'show' solo se la variabile 'isExpanded' è true -->
          <div id="wrapper">
            <!-- Ciclo v-for che itera attraverso l'array 'categories' e crea un blocco per ciascuna categoria -->
            <div class="icon">
              <!-- Input di tipo checkbox e una classe 'search' -->
              <input type="checkbox" class="search">
              <div class="circle">
                <!-- Immagine che mostra l'icona della categoria. La sorgente dell'immagine è ottenuta dalla funzione getCategoryIcon -->
                <img src="\img\biryani.png" alt="Category Icon" />
              </div>
              <!-- Nome della categoria -->
              <span class="category-name">Italiano</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </DefaultLayout>
</template>


<style lang="scss" scoped>
.wrapper {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  .icon {
    position: relative;
    box-shadow: -4px 0px 0px 2px #f0b12e;
    max-width: 50px;
  }

  &:hover {
    transform: scale(1.1);
  }

  .circle {
    background-color: white;
    padding: 20px 25px;
    border: 3px solid #e19f17;
    border-radius: 56% 44% 45% 55%/58% 53% 47% 42%;
  }

  input[type="checkbox"] {
    position: absolute;
    inset: 0;
    max-width: 80%;
    margin: auto;
    z-index: 10;
    opacity: 0;
  }
}

/*.hero {
  background-color: #ffc244;
}*/

.container {
  max-width: 964px;
  margin: 0 auto;
}

img {
  display: block;
  max-width: 100%;
}

@media (min-width: 674px) {
  .wrapper {
    gap: 30px;
    //justify-content: space-around;
  }
}
</style>