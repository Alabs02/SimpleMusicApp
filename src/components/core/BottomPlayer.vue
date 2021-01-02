<!-- eslint-disable -->
<template>
<!-- eslint-disable -->
    <v-bottom-navigation
        v-show="isPlaying"
        fixed
        min-height="150"
        background-color="white"
    >
        <div class="bottom-plyr">
            <div class="bottom-plyr__media">
                <div class="bottom-plyr__img">
                    <img :src="selectedTrack.imgUrl" alt="image">
                </div>
                <div class="bottom-plyr__content">
                    <div class="title black--text">{{ selectedTrack.title }}</div>
                    <div class="subtitle black--text">{{ selectedTrack.artist }}</div>
                </div>
            </div>
            <div class="bottom-plyr__btns">
                
            </div>

            <div>
                <vuetify-audio :file="selectedTrack.src" :ended="audioFinished"   downloadable color="btnColor" class="accent" style="background: transparent !important;"></vuetify-audio>
            </div>
        </div>
    </v-bottom-navigation>
</template>

<script>
import VuetifyAudio from 'vuetify-audio'
import { mapState } from 'vuex'

export default {
    components: {
        'vuetify-audio': VuetifyAudio,
    },


    computed: {
        ...mapState(['selectedTrack', 'isPlaying'])
    },

    created() {
        
    },

    data() {
        return {
            
        }
    },

    methods: {
        audioFinished() {
            var vm = this
            vm.$store.dispatch('audioFinished')
        }
    }
}
</script>

<style lang="scss" scoped>
  .bottom-plyr {
    height: 100%;
    width: 100%;
    overflow: hidden !important;
    // border: 1px solid red;
    padding: .5rem 1rem;

    display: flex;
    align-items: center;
    

    &__media {
        display: flex;
        align-items: center;
        width: 20%;
        overflow: hidden !important;
        // border: 1px solid blue;
    }

    &__img {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 5px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__content {
        padding-left: 1rem;
        overflow: hidden !important;
    }

    &__btns {
        display: flex;
        align-items: center;
        overflow: hidden !important;

        // border: 1px solid green;
        width: 20%;

        .v-btn {
            // border: 1px solid crimson;
            overflow: hidden !important;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            // background: red;

            .icon {
                padding: 0 !important;
            }
        }
    }

    &__slide {
        display: flex;
        align-items: center;
        width: 40%;
        overflow: hidden !important;
        // border: 2px solid blue;

        span {
            font-size: 1rem;
            font-weight: 500;
        }

        .span-one {
            padding-right: 1rem !important;
        }

        .span-two {
            padding-left: 1rem !important;
        }
    }

    &__progress {
        width: 80%;
        overflow: hidden !important;
        // border: 1px solid yellow;

        &--shorter {
            width: 100% !important;
            overflow: hidden !important;
            // border: 1px solid blue;
        }
    }

    &__vol {
        display: flex;
        align-items: center;

        padding-left: 1.4rem;
        overflow: hidden !important;
        width: 15% !important;
        // border: 1px solid purple;
    }

  }
  @media screen and (min-width: 0px) and (max-width: 768px) {
    .bottom-plyr__media {
        display: none;
    }
}
</style>