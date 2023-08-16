<script setup>
import FavoriteVideos from './components/Favorite-videos.vue';
</script>

<template>
    <div>
        <div class="container pulse">
            <h1>
                Looking for a new video?
            </h1>

            <h3>
                now you can search for your favorite pet videos from youtube and bring them directly to your page
            </h3>
            <button class='btn' id="show-modal">Search Now!</button>

            <div class="card" style="background-color: red;">
                <!-- <button class='btn' id="show-modal" @click="showModal = true"></button> -->

                <Teleport to="body">
                    <!-- use the modal component, pass in the prop -->
                    <modal :show="showModal" v-bind:title=videoTitle v-bind:url="urlYoutuve"
                        v-bind:description="description" @close="showModal = false">
                        <template #header>
                            <h3>custom header</h3>
                        </template>
                    </modal>
                </Teleport>
            </div>
        </div>

        <br>
        <FavoriteVideos />
    </div>
</template>

<style>
.img {
    width: 100%;
    display: left;
}

.pulse {
    -webkit-animation-name: pulse;
    animation-name: pulse;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes pulse {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }

    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}

@keyframes pulse {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }

    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}
</style>