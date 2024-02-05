<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>


<template>
 <AppHeader />
  <slot></slot>
  <AppFooter />
</template>