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
    <h1>Scemo chi legge</h1>
  </main>
  </DefaultLayout>
</template>

<style lang="scss" scoped>

</style>