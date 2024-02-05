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
      filter: [],
      categories: null
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

      return this.categories.map((el) => {
        return {
          name: el.name,
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
          <div class="wrapper">
            <div class="icon">
              <input v-model="filter" type="checkbox" class="search" value="">
              <img src="/img/biryani.png" alt="Category Icon"/>
              <span class="category-name">Italiano</span>
            </div>

            <!-- <div class="icon">
              <input v-model="filter" type="checkbox" class="search" value="2">
              <img src="\img\biryani.png" alt="Category Icon"/>
              <span class="category-name">Italiano</span>
            </div> -->
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
    gap: 10px;
    justify-content: center;

    .icon {
      position: relative;
      box-shadow: -4px 0px 0px 2px #f0b12e;
      background-color: white;
      padding: 20px 25px;
      border: 3px solid #e19f17;
      border-radius: 56% 44% 45% 55%/58% 53% 47% 42%;
      text-align: center;

      input[type="checkbox"] {
        position: absolute;
        inset: 0;
        max-width: 80%;
        margin: auto;
        z-index: 10;
        opacity: 0;
      }
    }
  }
}

@media (min-width: 674px) {

  .hero {
    .wrapper {
      gap: 30px;
    }

  }
}
</style>