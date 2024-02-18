<template>
    <div class="order">
        <h1 class="red">Grazie per aver acquistato da noi </h1>
        
        <p class="green"><strong>Il tuo ordine è stato preso in carico.</strong></p>
        <router-link class=" btn" :to="{ name: 'home' }">Torna alla Home</router-link>
    </div>
</template> 

<script>
export default {
    name: 'Order'
}
</script>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.order {
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    min-height: 100vh;
    background-color: #ffc244;
    padding: 20px;
}

.gif {
    margin: 0 auto;
}

.green {
    color: #00a082;
}

.red {

    color: rgb(162, 17, 17);
}

.btn {
    @include primaryButton;
}
</style>