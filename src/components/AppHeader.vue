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
        <router-link :to="{ name: 'home' }">
          <img class="navbar__logo" src="/img/logo.png" alt="logo">
        </router-link>
        <div class="navbar__access-group ">
          <a class="display_none" href="http://127.0.0.1:8000/">Area ristoratore</a>
        </div>
        <button class="display-none-button" @click="BurgerToggle">
          <span>
            <img class="burger-menu" src="/img/hamburger.png" />
          </span>
        </button>
        <div class="navbar__access-group burger-links" v-show="Burger && isMobileViewport">
          <a href="http://127.0.0.1:8000/">Area ristoratore</a>
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

      & > a {
        @include primaryButton;
        &:hover {
          background-color: $lightGreen;
        }
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
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
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
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 12vh;
    border-bottom: 5px solid $green;
    background: rgb(255,194,68);
    background: linear-gradient(180deg, rgba(255,194,68,1) 0%, rgba(254,151,56,1) 100%);

    & > a:hover {
      background-color: $lightGreen;
    }
  }


}
</style>
