<script>
export default {
  data() {
    return {
      Burger: false,
      isMobileViewport: false,
    };
  },
  methods: {
    BurgerToggle() {
      this.Burger = !this.Burger;
    },
    checkMobileViewport() {
      this.isMobileViewport = window.innerWidth <= 768;
    },
  },
  mounted() {
    this.checkMobileViewport();
    window.addEventListener('resize', this.checkMobileViewport);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobileViewport);
  },
};
</script>

<template>
  <header class="page-header px-10">
    <div class="container">
      <nav class="navbar">
        <img class="navbar__logo" src="/img/logo.png" alt="logo">
        <div class="navbar__access-group ">
          <a class="display_none" href="http://127.0.0.1:8000/login">Accedi</a>
          <a class="display_none" href="http://127.0.0.1:8000/register">Registrati</a>
        </div>
        <button class="display-none-button" @click="BurgerToggle">
          <span>
            <img class="burger-menu" src="/img/hamburger.png" />
          </span>
        </button>
        <div class="navbar__access-group burger-links" v-show="Burger && isMobileViewport">
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

.burger-menu {
  width: 50%;
}

.display-none-button {
  background: none;
  border: none;
  cursor: pointer;
}

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
  .display-none-button {
    display: none;
  }
}

@media (max-width: 768px) {
  .page-header {
    .navbar {
      &__logo {
        width: 120px;
      }
    }
  }

  .display_none {
    display: none;
  }

  .burger-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $orange;
  }


}
</style>
