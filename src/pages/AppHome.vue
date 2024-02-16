<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppRestaurantCard from '../components/AppRestaurantCard.vue';
import AppHero from '../components/AppHero.vue';
import AppLoader from '../components/AppLoader.vue';
import store from '../store';
import axios from 'axios';

export default {
  components: {
    DefaultLayout,
    AppRestaurantCard,
    AppHero,
    AppLoader
  },

  data() {
    return {
      page: 'Home page di TasteIT',
      selectedCategories: [],
      categories: [],
      restaurants: [],
      currPage: 1,
      lastPage: -1,
      totalResults: 0,
    }
  },

  methods: {
    fetchCategories() {
      axios
        .get(`${store.BASE_URL}/categories`)
        .then((res) => {
          this.categories = res.data.results;
        })
    },

    fetchRestaurants() {
      axios 
        .get(`${store.BASE_URL}/restaurants`, {
          params: {
            page: this.currPage,
            arrOfSelectedCat: this.selectedCategories
          }
        })
        .then((res) => {
          this.lastPage = res.data.results.last_page;
          this.restaurants = res.data.results.data;
          this.totalResults = res.data.results.total;
        })
    },
    

    changePageRight() {
      console.log('click destra');
      if(this.currPage === this.lastPage) {
        this.currPage = 1;
      } else {
        this.currPage++;
      }
    },

    changePageLeft() {
      console.log('click sinistra');
      if(this.currPage === 1) {
        this.currPage = this.lastPage;
      } else {
        this.currPage--;
      }
    },

    scrollToRestaurants() {
      const targetElement = document.getElementById('restaurant-list');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    },

    scrollToFilters() {
      const targetElement = document.getElementById('filters');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },

  created() {
    this.fetchCategories();
    this.fetchRestaurants();
  },

  watch: {
    currPage() {
      this.fetchRestaurants();
    },

    selectedCategories() {
      this.fetchRestaurants();
      this.currPage = 1;
    }
  },

  computed: {
    categoriesWithImages() {

      return this.categories.map((el, i) => {
        return {
          id: el.id,
          name: el.name,
          path: store.categoriesPaths[i]
        }
      })

    }
  },

 
}
</script>

<template>
  <DefaultLayout>
    <main class="content">
      <!-- hero -->
      <AppHero></AppHero>
      <!-- search section -->
      <section class="search px-10">
        <div class="container">
          <h2 id="filters">Clicca per filtrare secondo i tuoi gusti !</h2>
          <!-- recuperiamo il numero di ristoranti per categorie -->
          <h4>Totale risultati: {{ totalResults }}</h4>
          <button class="button">
            <a @click="scrollToRestaurants">Vai alla lista</a>
          </button>
          <!-- filtri delle categorie ristorante -->
          <div v-if="!(categories.length === 0)" class="wrapper">
            <!-- categorie ciclate -->
            <div v-for="category in categoriesWithImages" class="icon">
              <div class="icon__img" :class="[selectedCategories.includes(category.id) ? 'selected' : '']">
                <input v-model="selectedCategories" type="checkbox" class="search" :value="category.id">
                <img :src="category.path" alt="Category Icon"/>
              </div>
              <span class="icon__text">{{ category.name }}</span>
            </div>
          </div>
          <AppLoader v-else/>
        </div>
      </section>
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260" transform="scale(-1, -1)"> <path fill="#ffc244" fill-opacity="1" d="M0,160L80,186.7C160,213,320,267,480,250.7C640,235,800,149,960,128C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

     

      <!-- sezione ristoranti -->
      <section v-if="restaurants.length !== 0" class="showcase px-10">
        <div class="container">
          <h1 id="restaurant-list" class="px-10 mb-15">I tuoi ristoranti:</h1>
          <div class="restaurants">
            <AppRestaurantCard class="res-card" v-for="restaurant in restaurants" :currRestaurant="restaurant" :key="restaurant.id"/>
          </div>
          <div class="pages">
            <img class="arrow" src="/img/arrow-left.png" @click="changePageLeft">
            <strong class="counter">{{ currPage }}</strong>
            <img class="arrow" src="/img/arrow-right.png" @click="changePageRight">
            <!-- <span class="page-number" @click="changePage(n)" v-for="n in lastPage" :key="n">{{ n }}</span> -->
          </div>
          <div class="back-to-filter">
            <a @click="scrollToFilters">Torna ai filtri</a>
          </div>
        </div>
      </section>
      <section v-else class="not-restaurants px-10">
        <div class="container">
          <h3>Nessun ristorante corrispondente</h3>
        </div>
      </section>
    </main>
  </DefaultLayout>
</template>


<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

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
.svg {
  margin-top: -1px;
}
.mb-15 {
  margin-bottom: 15px;
}

.search {
  background-color: $orange;
  padding-top: 50px;
  padding-bottom: 30px;

  h2, h4 {
    text-align: center;
    margin-bottom: 30px;
  }

  .button {
    margin-bottom: 30px;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    .icon {
      position: relative;
      text-align: center;
      transition: 0.1s ease-in;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
      &:hover .icon__img {
        background-color: $lightGreen;
      }

      &__text {
        font-weight: 600;
      }

      &__img {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        box-shadow: -4px 0px 0px 2px $mdOrange;
        background-color: white;
        padding: 20px 15px;
        border: 3px solid $darkOrange;
        border-radius: 56% 44% 45% 55%/58% 53% 47% 42%;
        text-align: center;
        margin-bottom: 15px;

        input[type="checkbox"] {
          position: absolute;
          inset: 0;
          max-width: 80%;
          margin: auto;
          z-index: 10;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
}

.wrapper .icon > .selected {
  background-color: $lightGreen;
}
.showcase {
  padding-top: 20px;
  .restaurants {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 40px;

    .res-card {
      transition: 200ms ease-in;
    }
    &:has(.res-card:hover) .res-card:not(:hover) {
      filter: grayscale(80%) brightness(50%);
      transform: scale(0.95);
    }
  }

  .back-to-filter {
    text-align: center;
    cursor: pointer;
    a {
      color: $white;
      display: inline-block;
      background-color: $darkOrange;
      padding: 0 30px;
      line-height: 40px;
      border-radius: 20px;
      font-weight: 600;

      &:hover {
        background-color: $orange;
      }
    }
  }
  .pages {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;

    .counter {
      font-size: 24px;
    }
    .arrow {
      cursor: pointer;
      width: 45px;
      aspect-ratio: 1;
    }
    .page-number {
      display: block;
      cursor: pointer;
      @include primaryButton();

      &:hover {
        background-color: $lightGreen;
      }
    }
  }
}

.not-restaurants {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

@media (min-width: 674px) {

  .search {
    .wrapper {
      gap: 30px;
    }
  }
}
</style>