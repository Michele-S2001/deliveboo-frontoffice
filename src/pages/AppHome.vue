<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppRestaurantCard from '../components/AppRestaurantCard.vue';
import store from '../store';
import axios from 'axios';

export default {
  components: {
    DefaultLayout,
    AppRestaurantCard
  },

  data() {
    return {
      page: 'Home page di TasteIT',
      selectedCategories: [],
      categories: [],
      restaurants: [],
      currPage: 1,
      lastPage: -1
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
        })
    },

    changePage(i) {
      this.currPage = i;
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
  } 
}
</script>

<template>
  <DefaultLayout>
    <main class="content">
      <!-- search section -->
      <section class="search px-10">
        <div class="container">
          <h2>Clicca per filtrare secondo i tuoi gusti !</h2>
          <!-- filtri delle categorie ristorante -->
          <div v-if="categories" class="wrapper">
            <!-- categorie ciclate -->
            <div v-for="category in categoriesWithImages" class="icon">
              <div class="icon__img" :class="[selectedCategories.includes(category.id) ? 'selected' : '']">
                <input v-model="selectedCategories" type="checkbox" class="search" :value="category.id">
                <img :src="category.path" alt="Category Icon"/>
              </div>
              <span class="icon__text">{{ category.name }}</span>
            </div>
          </div>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffc244" fill-opacity="1" d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,218.7C672,203,768,117,864,122.7C960,128,1056,224,1152,266.7C1248,309,1344,299,1392,293.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

      <!-- sezione ristoranti -->
      <section v-if="restaurants.length !== 0" class="showcase px-10">
        <div class="container">
          <div class="restaurants">
            <AppRestaurantCard v-for="restaurant in restaurants" :currRestaurant="restaurant" :key="restaurant.id"/>
          </div>
          <div class="pages">
            <span class="page-number" @click="changePage(n)" v-for="n in lastPage" :key="n">{{ n }}</span>
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

.search {
  background-color: $orange;
  padding-top: 80px;

  h2 {
    text-align: center;
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
  padding-top: 50px;
  padding-bottom: 100px;
  .restaurants {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 40px;
  }

  .pages {
    padding: 20px 0;
    display: flex;
    gap: 10px;
    justify-content: center;
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