<script setup>

const props = defineProps({
    show: Boolean,
    title: String,
    miniaturaId: String,
    videoId: String,
    description: String,
    time: Number
})

function getImgUrl(id) {
    return "https://img.youtube.com/vi/" + id + "/0.jpg"
}

function getMinutes(milisegundos) {
    const minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    const segundos = milisegundos / 1000;
    return `${minutos}:${segundos}`;
};

console.log(getMinutes(16000));
</script>

<template>
    <div class="card">
        <div class="title">
            <h1>{{ title ? title : "no title provided" }}</h1>


        </div>
        <div class="content">
            <div v-if="miniaturaId">
                <img class="iFrame-img" :src="getImgUrl(miniaturaId)" alt="alt" />
            </div>
            <div v-else>
                <VueYtframe class="iFrame-modal" :video-id="videoId"
                    :player-vars="{ autoplay: 0, listType: 'user_uploads' }" />
            </div>
            <h3 class="time"> Duration: {{ time ? getMinutes(time) : "No time provided" }}</h3>

        </div>
        <div class="content-footer">
            <p v-if="description" class="description">
                {{ description }}
            </p>
            <p v-else>
                This video doesn't contain description
            </p>
        </div>
    </div>
</template>

<style>
.description {
    max-height: 60px;
    overflow-y: auto;
}
.content-footer{
    text-align: center;
}

.title {
    text-align: center;
    padding: 16px;
    border-bottom: 1px solid silver;
    font-size: 0.7em;
    height: 14%;
}


.card:hover {
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0px 1px 9px darkgrey;
}

@media (min-width: 1024px) {

    .iFrame-img {
        width: 700px;
        height: 340px
    }

    .card {
        margin-bottom: 50px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        max-width: 700px;
        width: 24vw;
        height: auto;
        max-height: 81vh;
        margin-right: 20px;
    }
}

@media (max-width: 1024px) {
    .iFrame-img {
        width: 100%;
        height: 405px
    }

    .card {
        margin-bottom: 10px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        width: 95%;
        height: 80vh;
    }
}
</style>