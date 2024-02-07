<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import store from '../store';
import axios from 'axios';

export default {
  components: {
    DefaultLayout
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
            <div v-for="restaurant in restaurants" class="restaurant-card">
              <img class="restaurant-img" :src="`http://127.0.0.1:8000/storage/${restaurant.thumb}`" alt="">
              <p>{{ restaurant.name }}</p>
              <div class="categories" v-for="category in restaurant.categories" :key="restaurant.id">{{ category.name }}</div>
            </div>
          </div>
          <div class="pages">
            <span class="page-number" @click="changePage(n)" v-for="n in lastPage" :key="n">{{ n }}</span>
          </div>
        </div>
      </section>
    </main>
  </DefaultLayout>
</template>


<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.search {
  background-color: $orange;
  padding-top: 80px;
  padding-bottom: 20px;
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

/**
STILE TEMPORANEO PER DISTINGUERE I RISTORANTI
*/
.showcase {
  padding-top: 100px;
  padding-bottom: 100px;

  .restaurants {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px;
    .restaurant-card {
      //border: 2px solid black;

      .restaurant-img {
        border-radius: 20px;
        //max-height: 150px;
      }
      .categories {
        background-color: cadetblue;
      }
    }
  }

}

/* FINE STILE TEMPORANEO */


@media (min-width: 674px) {

  .search {
    .wrapper {
      gap: 30px;
    }

  }
}
</style>