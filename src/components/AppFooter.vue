<template>
    <footer class="page-footer">
      <svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          class="wavePath-haxJK1 animationPaused-2hZ4IO"
          d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
          fill="#1d1d1d"
        ></path>
      </svg>
      <div class="container">
        <div class="row-my">
          <div class="col-3">
            <ul>
              <li class="title-li">Uniamo le forze</li>
              <li class="text-li">Lavora con noi</li>
              <li class="text-li">Partner TasteIT</li>
              <li class="text-li">Corrieri</li>
              <li class="text-li">TasteIT Business</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li class="title-li">Link di interesse</li>
              <li class="text-li">Chi siamo</li>
              <li class="text-li">FAQ</li>
              <li class="text-li">TasteIT Prime</li>
              <li class="text-li">Contattaci</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li class="title-li">Seguici</li>
              <li class="text-li">Facebook</li>
              <li class="text-li">Twitter</li>
              <li class="text-li">Instagram</li>
              <li class="text-li">X</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <li>
                <img class="img-store" src="/img/appleStore.svg" alt="Apple Store" />
              </li>
              <li>
                <img class="img-store" src="/img/googleStore.svg" alt="Google Store" />
              </li>
              <li class="text-li">Termini e condizioni</li>
              <li class="text-li">Politica sulla privacy</li>
              <li class="text-li">Politica sui cookie</li>
              <li class="text-li">Conformità</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
</template>
  
<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;
  
.page-footer {
    background-color: #1d1d1d;
    color: $white;
}
  
.svg {
    background-color: $white;
  }
.row-my {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }
  
.col-3{
    flex: 0 0 calc(25% - 20px); 
  }
.title-li {
    font-weight: 600;
    font-size: 23px;
    padding-bottom: 5px;
  }
.text-li {
    color: rgb(162, 155, 155);
    font-size: 19px;
  }
.img-store {
    width: 50px; 
    margin-bottom: 10px;
  }
  
@media screen and (max-width: 768px) {
    .col-3{
      flex: 0 0 100%;
    }
  }
  </style>
  