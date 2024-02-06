<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import store from '../store';
import axios from 'axios';



export default {
  components: {
    DefaultLayout,
    AppHeader
  },

  data() {
    return {
      page: 'Home page di TasteIT',
      selectedCategories: [],
      categories: []
    }
  },

  methods: {
    fetchCategories() {
      axios
        .get(`${store.BASE_URL}/categories`)
        .then((res) => {
          this.categories = res.data.results;
        })
    }
  },

  created() {
    this.fetchCategories();
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
      <!-- hero section -->
      <section class="hero">
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
    </main>
  </DefaultLayout>
</template>


<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.hero {
  background-color: $orange;
  padding: 50px 0;
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

@media (min-width: 674px) {

  .hero {
    .wrapper {
      gap: 30px;
    }

  }
}
</style>