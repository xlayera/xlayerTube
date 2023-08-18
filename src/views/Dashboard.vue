<script setup>
import Favoritevideos from './components/Favorite-videos.vue';
import cards from '../layouts/components/Cards.vue';
import modal from '../layouts/components/Modal.vue';
import { ref } from 'vue'

const open = ref(false)
const message = ref('')
var isUrl = ref(false)

function getImgUrl(id) {
    return "https://img.youtube.com/vi/" + id + "/0.jpg"
}

function getMinutes(milisegundos) {
    const minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    const segundos = milisegundos / 1000;
    return `${minutos}:${segundos}`;
};

function clearDataSearch(data) {
    if (data.includes("https://youtu.be/")) {
        isUrl = true
        return data.split("https://youtu.be/")[1]
    } else if (data.includes("https://www.youtube.com/watch?")) {
        let splitPart = data.split("https://www.youtube.com/watch?v=")[1]
        isUrl = true
        return splitPart.split("&")[0]
    } else {
        isUrl = false
        return data
    }
}

function request(method, body) {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
}

const videosFromSearch = ref(null);
var deafultContent = ref(null)
function search(message) {
    let dataSearch = clearDataSearch(message)
    if (isUrl) {
        fetch('http://3.210.117.144:2000/v1/byId-api', request("POST", { idVideo: dataSearch }))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    videosFromSearch.value = data.data.items
                    deafultContent = data.data.items

                    deafultContent
                    if (deafultContent[0].id) {
                        fetch('http://3.210.117.144:2000/v1/info-byId-api', request("POST", { idVideo: deafultContent[0].id }))
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    console.log("data2", data.idVideo, "== ", data.time);
                                    deafultContent[0].time = data.time
                                } else {
                                    console.log("error", data.msg);
                                }

                            });
                    }
                    videosFromSearch.value = deafultContent
                    console.log("content", deafultContent);
                } else {
                    console.log("error", data.msg);
                }

            });
    } else {
        fetch('http://3.210.117.144:2000/v1/search-api', request("POST", { searchQuery: dataSearch }))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("dataaaaaaaa", data.data.items[0]);
                    videosFromSearch.value = data.data.items[0]
                    deafultContent = data.data.items[0]

                    fetch('http://3.210.117.144:2000/v1/info-byId-api', request("POST", { idVideo: deafultContent.id.videoId }))
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                deafultContent.id.time = data.time
                            } else {
                                console.log("error", data.msg);
                            }

                        });
                    videosFromSearch.value = deafultContent
                    console.log("content", deafultContent);
                } else {
                    console.log("error", data.msg);
                }

            });
    }

}


function addVideo(data) {

    let dataToRequest = {
        "idVideo": data.length > 0 ? data[0].id : data.id.videoId,
        "title": data.length > 0 ? data[0].snippet.title : data.snippet.title,
        "timeDuration": data.length > 0 ? data[0].time : data.id.time,
        "description": data.length > 0 ? data[0].snippet.description : data.snippet.description
    }

    fetch('http://3.210.117.144:2000/v1/add-video', request("POST", dataToRequest))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("add video", data);
                myAllVideos()
                open = false
            } else {
                console.log("error", data.msg);
                open = false
            }

        });
}

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
            }

        });
}
</script>

<template>
    <div>
        <div class="container pulse">
            <h1>
                Looking for a new video?
            </h1>

            <h3>
                now you can search for your favorite pet videos from youtube and bring them directly to your page! ;)
            </h3>

            <form action class="form" @submit.prevent="contact">
                <div class="modal-body">
                    <input v-model="message" class="form-input" type="text" id="message" required placeholder="Search" />
                    <button class='btn' @click="open = true, message = message, search(message)" :disabled=!message>Search
                        Now!</button>

                    <p class="error" v-if="!message && !open">
                        This field is required
                    </p>
                </div>

            </form>

            <!-- use the modal component, pass in the prop -->
            <Teleport to="body">
                <transition name="modal">
                    <div v-if="open" class="modal-mask">
                        <div class="modal-container2">
                            <div class="modal-header">
                                <h1>{{ title }}</h1>
                            </div>


                            <div class="modal-body" v-if="isUrl">
                                <cards id="show-card" v-bind:title=v.snippet.title v-bind:videoId=v.id
                                    v-bind:description=v.snippet.description v-bind:time=v.time
                                    v-for="v in videosFromSearch">
                                </cards>

                                <button class="btn-close" @click="open = false">Close</button>
                                <button class='btn' @click="addVideo(deafultContent)">Add</button>
                            </div>

                            <div class="modal-body" v-else>
                                <cards id="show-card" v-bind:title=videosFromSearch.snippet.title
                                    v-bind:videoId=videosFromSearch.id.videoId
                                    v-bind:description=videosFromSearch.snippet.description
                                    v-bind:time=videosFromSearch.id.time>
                                </cards>

                                <button class="btn-close" @click="open = false">Close</button>
                                <button class='btn' v-on:click="open = false, addVideo(deafultContent)">Add</button>
                            </div>


                        </div>

                    </div>
                </transition>
            </Teleport>
        </div>

        <br>
        <Favoritevideos />
    </div>
</template>

<style>
.grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: center;
    /* align-items: center; */
    align-items: stretch;
}

.card2:hover {
    transition: 0.2s;
    box-shadow: 0px 1px 9px darkgrey;
}

@media (min-width: 1024px) {

    .iFrame-img {
        width: 40vw;
        height: 405px
    }

    .card2 {
        margin-bottom: 50px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        width: 700px;
        height: auto;

    }



}

@media (max-width: 1024px) {
    .iFrame-img {
        width: 100%;
        height: 405px
    }

    .card2 {
        margin-bottom: 50px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        width: 60vw;
        height: auto;
    }
}

.error {
    margin-left: 10px;
    font-size: 12px;
}

.form-input {
    margin: 10px;
    /* border: transparent; */
    border-radius: var(--border-radius);
    padding: 10px;
    font-size: 16px;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    display: inline-block;
    width: 40vw;
}

.modal-container2 {
    overflow: hidden;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}


@media (min-width: 1024px) {

    .modal-container2 {
        width: 68w;
        height: 90vh;
        overflow-y: auto;
    }


}

@media (max-width: 1024px) {

    .modal-container2 {
        width: 70vw;
        overflow-y: auto;
    }


}

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