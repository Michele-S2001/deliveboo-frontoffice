import { reactive } from "vue";

const store = reactive({
  BASE_URL: 'http://127.0.0.1:8000/api',
  categoriesPaths: [
    '/img/spaghetti.png',
    '/img/thai-food.png',
    '/img/buns.png',
    '/img/sushi.png',
    '/img/taco.png',
    '/img/biryani.png',
    '/img/burger.png',
    '/img/salad.png',
    '/img/pad-thai.png',
    '/img/bunny-chow.png'
  ]
});

export default store;