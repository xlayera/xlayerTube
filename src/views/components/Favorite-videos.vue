<script setup>
import modal from '../../layouts/components/Modal.vue';
import cards from '../../layouts/components/Cards.vue';
import dialog from '../../layouts/components/Dialog.vue';
import { ref } from 'vue'

const showModal = ref(false)
const videos = ref(null);

/* dialog content */
var showDialog = ref(false)
var titleDialog = ref(null)
var contentDialog = ref(null)


/* const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ searchQuery: "puppy" })
}; */

function request(body) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
}

var deafultContent = ref([])

fetch('http://localhost:2000/v1/search-api', request({ searchQuery: "cutes swiss shepherd" })) //deafult content
    .then(response => response.json())
    .then(data => {
        console.log("data", data.data.items);
        if (data.success) {
            videos.value = data.data.items
            deafultContent = data.data.items

            deafultContent.forEach(element => {
                fetch('http://localhost:2000/v1/info-byId-api', request({ idVideo: element.id.videoId }))
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // console.log("data2", data.idVideo, "== ", data.time);
                            element.id.time = data.time
                        } else {
                            console.log("error");
                        }

                    });
            });
            videos.value = deafultContent
            console.log("content", deafultContent);
        } else {
            console.log("error");
            showDialog = true;
            titleDialog.value = 'Warning'
            contentDialog.value = data.msg
        }

    });
</script>

<template scoped>
    <h1>
        Your videos
    </h1>


    <cards id="show-card"
        @click="showModal = true, videoId = video.id.videoId, title = video.snippet.title, description = video.snippet.description"
        v-bind:title=video.snippet.title v-bind:videoId=video.id.videoId v-bind:description="video.snippet.description"
        v-bind:miniaturaId=video.id.videoId :time=video.id.time v-for="video in videos"></cards>

    <!-- <button class='btn' id="show-modal" @click="showModal = true"></button> -->

    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" :videoId="videoId" :title="title" :description="description" @close="showModal = false">
        <template #header>
            <h3>custom header</h3>
        </template>
    </modal>

    <!-- <dialog :show="showDialog = true" :titleDialog="titleDialog" :contentDialog="contentDialog" @close="showDialog = false">
    </dialog> -->
</template>

<style></style>