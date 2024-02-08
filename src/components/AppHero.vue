<template>
    <section class="page_hero px-10">
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <h1 class="page_hero-title">Dal nostro cuore alla tua porta, scopri il gusto della consegna a domicilio</h1>
                </div>
                <div class="col-4">
                    <video autoplay loop muted class="page_hero-video" src="/img/hero-video.mp4"></video>
                </div>
            </div>
        </div>
    </section>
</template>
  
<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.page_hero {

    background-color: $orange;
    padding-top: 80px;
    padding-bottom: 80px;

    .page_hero-video {
        max-width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        box-shadow: -4px 0px 0px 2px #f0b12e;
        border: 3px solid #e19f17;
        border-radius: 56% 44% 45% 55%/58% 53% 47% 42%
    }
}

// media query


// fino a 576px
@media (max-width: 576px) {

    .page_hero-title {
        font-size: $title-sm;
        text-align: center;
    }

    .col-4,
    .col-8 {
        flex: 0 0 100%
    }

    .row {
        flex-wrap: wrap;
        gap: 20px;
    }

}

// da 576px in su
@media (min-width: 576px) {
    .page_hero-title {
        font-size: $title-md;
        padding-right: 20px;
    }
}



// da 768px in su 
@media (min-width: 768px) {
    .page_hero-title {
        font-size: $title-md;
        padding-right: 20px;
    }
}

// da 768 in su 
@media (min-width: 992px) {

    .page_hero-title {
        font-size: $title-lg;
    }

}


// debug
.debug .col-4,
.debug .col-8,
.page_hero.debug {

    border: 1px solid red;

}
</style>
  