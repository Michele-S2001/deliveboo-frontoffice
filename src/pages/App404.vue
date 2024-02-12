<template>
    <div class="error-404">
        <h1 class="red">Errore 404</h1>
        <img class="gif"
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9hZ2ZyeWpvMDB4YXd2eTNxeGJqcGdoZTk4ZXVuenNubG8zMXkyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6yA0Do2HnkV4Q/giphy.gif">
        <p class="green"><strong>La pagina che stai cercando non è stata trovata.</strong></p>
        <router-link class=" btn" :to="{ name: 'home' }">Torna alla Home</router-link>
    </div>
</template> 

<script>
export default {
    name: 'Error404'
}
</script>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.error-404 {
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