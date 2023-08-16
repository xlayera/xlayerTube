<script setup >

const props = defineProps({
    show: Boolean,
    title: String,
    videoId: String,
    description: String
})

</script>

<template>
    <transition name="Modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <h1>{{ title }}</h1>
                </div>
                <div class="modal-body">
                    <VueYtframe class="iFrame" :video-id="videoId"
                        :player-vars="{ autoplay: 0, listType: 'user_uploads' }" />

                </div>
                <div class="modal-footer">
                    <p v-if="description">
                        {{ description }}
                    </p>
                    <p v-else>
                        This video doesn't contain description
                    </p>
                    <button class="btn modal-default-button" @click="$emit('close')">
                        Ok
                    </button>
                </div>

            </div>
        </div>
    </transition>
</template>

<style>
@media (min-width: 1024px) {

    .iFrame {
        width: 65vw;
        height: 405px
    }


}

@media (max-width: 1024px) {
    .iFrame {
        width: 100%;
        height: 405px
    }

    .modal-container {
        width: 80vw;
    }
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 70vw;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>