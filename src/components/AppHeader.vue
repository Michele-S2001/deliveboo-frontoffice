<script>
  export default {
    
  }
</script>

<template>
  <header class="page-header px-10">
    <div class="container">
      <nav class="navbar">
        <img class="navbar__logo" src="/img/logo.png" alt="logo">
        <div class="navbar__access-group">
          <a href="http://127.0.0.1:8000/login">Accedi</a>
          <a href="http://127.0.0.1:8000/register">Registrati</a>
        </div>
      </nav>
    </div>
  </header>
</template>


<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
.page-header {
  background-color: $orange;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    &__access-group {
      display: flex;
      gap: 15px;

      & > * {
        @include primaryButton;
      }
    }

    &__logo {
      width: 150px;
    }
  }
}

@media (min-width: 768px) {

  .page-header {
    .navbar {
      &__logo {
        width: 200px;
      }
    }

  }
}

</style>