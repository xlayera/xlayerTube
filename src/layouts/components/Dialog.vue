<script setup>
const props = defineProps({
    show: Boolean,
    title: String,
    content: String,
})

</script> 

<template>
    <transition name="Dialog">
        <div v-if="show" >
            <div class="dialog-container">
                <div class="dialog-header">
                    <h1>{{ title }}</h1>
                </div>
                <div class="dialog-body">
                    <p>
                        {{ content }}
                    </p>
                </div>
                <div class="dialog-footer">
                    <button class="btn modal-default-button" @click="$emit('close')">
                        Ok
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
@media (max-width: 1024px) {

    .dialog-container {
        width: 80vw;
    }
}


.dialog-container {
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}


.dialog-header h3 {
    margin-top: 0;
    color: #42b983;
}

.dialog-body {
    margin: 20px 0;
}

.dialog-default-button {
    float: right;
}
</style>