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
            <h1>{{ title }}</h1>

           
        </div>
        <div class="content">
            <h3 class="time"> Duration: {{ time ? getMinutes(time) : "No time provided" }}</h3>
            <img class="iFrame" :src="getImgUrl(miniaturaId)" alt="alt" />
        </div>
        <div class="description">
            <p v-if="description">
                {{ description }}
            </p>
            <p v-else>
                This video doesn't contain description
            </p>
        </div>
    </div>
</template>

<style>

.time{

}
.title,
.description {
    text-align: center;
}

.title {
    padding: 16px;
    border-bottom: 1px solid silver;
}

.title {
    font-size: 0.7em;
}

.card:hover {
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0px 1px 9px darkgrey;
}

@media (min-width: 1024px) {

    .iFrame {
        width: 700px;
        height: 405px
    }

    .card {
        margin-bottom: 50px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        max-width: 700px;
        width: auto;
        height: auto;
    }
}

@media (max-width: 1024px) {
    .iFrame {
        width: 100%;
        height: 405px
    }

    .card {
        margin-bottom: 50px;
        background-color: #f1f5f9;
        border: 1pxs solid silver;
        border-radius: 8px;
        box-shadow: 0px 1px 3px darkgrey;
        transition: 0.2s;
        width: 90vw;
        height: auto;
    }
}
</style>