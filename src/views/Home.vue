
<script setup>

</script>

<template>
    <div class="greetings">
        <h1 class="title">Welcome</h1>
        <h3>It's my pleasure to show you, the best app to watch your favorites YouTube videos of pets!</h3>
        <h3>Here you can search and add your favorite pet videos from YouTube, to watch them over and over again</h3>


        <router-link to="/dashboard" custom v-slot="{ navigate }">
            <button class='btn btn-center' id="get-started" @click="navigate" role="link">Get Started!</button>
        </router-link>
    </div>
</template>
   

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}


@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}

@media (max-width: 1024px) {

    .greetings button {
        display: block;
        padding: 0.5rem 1rem;
        width: 200px;
        margin: 0 auto;
    }
}
</style>