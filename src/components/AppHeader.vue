<script>
  export default {
    
  }
</script>

<!-- <template>
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
</template> -->



<template>
  <header class="page-header">
    <div class="container">
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img class="navbar__logo" src="/img/logo.png" alt="logo">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span><i class="fa-solid fa-burger burger"></i></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link costum__button" aria-current="page" href="http://127.0.0.1:8000/login">Accedi</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link costum__button " href="http://127.0.0.1:8000/register">Registrati</a>
              </li>
            </ul>
          </div>
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
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 20px 0;

    // &__access-group {
    //   display: flex;
    //   gap: 15px;

    //   & > * {
    //     @include primaryButton;
    //   }
    // }

    // &__logo {
    //   width: 150px;
    // }
  }

  .costum__button {
    @include primaryButton;
  }

  .burger {
    font-size: 30px;
    
}
}

@media (max-width: 768px) {
// .page-header {
  //   .navbar {
  //     &__logo {
  //       width: 200px;
  //     }
  //   }

  // }
  .navbar__logo {
    width: 70%;
  }

  .navbar-nav {
    .nav-item {
      .nav-link {
        background-color: transparent;
        font-size: 19px;
        font-weight: 500;
      }
    }
  }
}

</style>