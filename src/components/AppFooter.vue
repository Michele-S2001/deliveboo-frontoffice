<template>
    <footer class="page-footer">
      <svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 70" preserveAspectRatio="none">
        <path
          class="wavePath-haxJK1 animationPaused-2hZ4IO"
          d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
          fill="#1d1d1d"
        ></path>
      </svg>
      <div class="container px-10 pb-10">
        <div class="row_1">
          <div class="col-3">
            <ul>
              <li class="title-li">Uniamo le forze</li>
              <li class="text-li">
                <a href="#">Lavora con noi</a>
              </li>
              <li class="text-li">
                <a href="#">Patner TasteIT</a></li>
              <li class="text-li">
                <a href="#">Corrieri</a></li>
              <li class="text-li">
                <a href="#">TasteIT Business</a></li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
                <li class="title-li">Link di interesse</li>
                <li class="text-li">
                    <a href="#">Chi siamo</a>
                </li>
                <li class="text-li">
                    <a href="#">FAQ</a>
                </li>
                <li class="text-li">
                    <a href="#">TasteIT Prime</a>
                </li>
                <li class="text-li">
                    <a href="#">Contattaci</a></li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
                <li class="title-li">Seguici</li>
                <li class="text-li">
                    <a href="#">Facebook</a>
                </li>
                <li class="text-li">
                    <a href="#">Twitter</a>
                </li>
                <li class="text-li">
                    <a href="#">Instagram</a>
                </li>
                <li class="text-li">
                    <a href="#">X</a>
                </li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
                <li>
                    <a href="#">
                      <img class="img-store" src="/img/appleStore.svg" alt="Apple Store" />   
                    </a>
                </li>
                <li>
                    <a href="#">
                    <img class="img-store" src="/img/googleStore.svg" alt="Google Store" />    
                    </a>
                </li>
                <li class="text-li">
                    <a href="#">Termini e condizioni</a>
                </li>
                <li class="text-li">
                    <a href="#">Politica sulla privacy</a>
                </li>
                <li class="text-li">
                    <a href="#">Politica sui cookie</a></li>
                <li class="text-li">
                    <a href="#">Conformità</a>
                </li>
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
.row_1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }
  
.col-3{
    flex: 0 0 calc(25% - 20px); 
  }
.title-li {
    font-weight: 400;
    font-size: 23px;
    padding-bottom: 5px;
  }
.text-li {
    color: rgb(162, 155, 155);
    font-size: 19px;
    padding-top: 5px;
  }
.img-store {
    width: 90px; 
    margin-bottom: 10px;
  }
  
@media (max-width: 768px) {
    .col-3{
      flex: 0 0 100%;
    }
    .title-li {
    font-weight: 300;
    font-size: 17px;
    }

    .text-li {
    font-size: 14px;
    }
    .img-store {
    width: 70px; 
    margin-bottom: 5px;
    }

  }
  </style>
  