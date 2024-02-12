<script>
export default {
  data() {
    return {
      page: 'App.vue'
    }
  }
}


</script>

<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">
@use './styles/global.scss'

</style>
