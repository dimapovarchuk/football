<template lang="pug">
    #note(v-if="notification.text.length" :class="notification.status")
        .body  
            .body__image
            .body__text
                h2
                    |{{notification.text}}
</template>

<script>
import{mapState} from 'vuex'

export default {
    computed: {
        ...mapState([
            'notification'
        ])
    }
}
</script>

<style lang="sass">
.success
    // text-align: center
    display: flex
    justify-content: center
    align-items: center
    // position: relative
    position: fixed
    z-index: 4
    min-width: 100vw
    min-height: 100vh
    background-color: rgba(0,0 ,0 ,.7)
    .body
        z-index: 1
        position: absolute
        border: 3px solid #fff
        height: 50%
        width: 50%
        background-color: #fff
        &__image
            height: 40%
            width: 100%
            background-color: #4dff4d
        &__text
            height: 60%
            color: #4dff4d
            text-align: center
            display: flex
            justify-content: center
            align-items: center
            h2
                align-self: center

.alert
    // text-align: center
    display: flex
    justify-content: center
    align-items: center
    // position: relative
    position: fixed
    z-index: 4
    min-width: 100vw
    min-height: 100vh
    background-color: rgba(0,0 ,0 ,.7)
    .body
        z-index: 1
        position: absolute
        border: 3px solid #fff
        height: 50%
        width: 50%
        background-color: #fff
        &__image
            height: 40%
            width: 100%
            background-color: #ff0000

        &__text
            height: 60%
            color: #ff0000
            text-align: center
            display: flex
            justify-content: center
            align-items: center
            h2
                align-self: center
</style>