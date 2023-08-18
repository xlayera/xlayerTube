<script setup>
import modal from '../../layouts/components/Modal.vue';
import cards from '../../layouts/components/Cards.vue';
import { notify } from "@kyvg/vue3-notification";
import { ref } from 'vue'

const message = ref(null)
const showModal = ref(false)


if (message) {
    console.log("message", message);
}

function request(method, body) {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
}

//deafult content directly from api
const videos = ref(null);
var deafultContent = ref(null)
function getDeafultContent() {
    fetch('http://3.210.117.144:2000/v1/search-api', request("POST", { searchQuery: "cutes swiss shepherd" }))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                videos.value = data.data.items
                deafultContent = data.data.items

                deafultContent.forEach(element => {
                    fetch('http://3.210.117.144:2000/v1/info-byId-api', request("POST", { idVideo: element.id.videoId }))
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                // console.log("data2", data.idVideo, "== ", data.time);
                                element.id.time = data.time
                            } else {
                                console.log("error", data.msg);
                                notify({
                                    title: "Warning",
                                    text: data.msg,
                                });
                            }

                        });
                });
                videos.value = deafultContent
                console.log("content", deafultContent);
            } else {
                console.log("error", data.msg);
                notify({
                    title: "Warning",
                    text: data.msg,
                });
            }

        });

}
//getDeafultContent() 

//all my saved videos in DB
const myVideos = ref(null);
function myAllVideos() {
    fetch('http://3.210.117.144:2000/v1/all-video')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("myVideos data", data.data);
                myVideos.value = data.data
            } else {
                console.log("error", data.msg);
                notify({
                    title: "Warning",
                    text: data.msg,
                });
            }

        });
}
myAllVideos()


</script>

<template scoped>
    <h1>
        Your videos
    </h1>

    <div class="container-grid">
        <cards v-for="myVideo in myVideos" id="show-card"
            @click="showModal = true, videoId = myVideo.idVideo, title = myVideo.title, description = myVideo.description"
            v-bind:title=myVideo.title v-bind:videoId=myVideo.idVideo v-bind:description="myVideo.description"
            v-bind:miniaturaId=myVideo.idVideo v-bind:time=myVideo.timeDuration>
        </cards>

        <cards v-for="video in videos" id="show-card"
            @click="showModal = true, videoId = video.id.videoId, title = video.snippet.title, description = video.snippet.description"
            v-bind:title=video.snippet.title v-bind:videoId=video.id.videoId v-bind:description="video.snippet.description"
            v-bind:miniaturaId=video.id.videoId v-bind:time=video.id.time>
        </cards>

    </div>


    <!-- use the modal component, pass in the prop -->
    <Teleport to="body">
        <modal :show="showModal" :videoId="videoId" :title="title" :description="description" @close="showModal = false">
            <template #header>
                <h3>custom header</h3>
            </template>
        </modal>
    </Teleport>
</template>

<style>
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

@media (min-width: 1024px) {

    .container-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
            ". ."
            ". ."
            ". .";
        width: 50%;
    }
}
</style>