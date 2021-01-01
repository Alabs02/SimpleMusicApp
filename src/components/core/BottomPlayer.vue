<!-- eslint-disable -->
<template>
<!-- eslint-disable -->
    <v-bottom-navigation
        fixed
        min-height="150"
        background-color="accent"
    >
        <div class="bottom-plyr">
            <div class="bottom-plyr__media">
                <div class="bottom-plyr__img">
                    <img :src="tracks[currentTrackId].imgUrl" alt="image">
                </div>
                <div class="bottom-plyr__content">
                    <div class="title black--text">{{ tracks[currentTrackId].title }}</div>
                    <div class="subtitle black--text">{{ tracks[currentTrackId].artist }}</div>
                </div>
            </div>
            <div class="bottom-plyr__btns">
                <v-btn
                    ref="prevBtn"
                    icon
                    @click="playPrevSong()"
                >
                    <v-icon class="icon">mdi-skip-previous</v-icon>
                </v-btn>

                <v-btn
                    v-if="isPlaying"
                    icon
                    @click="pauseSong()"
                >
                    <v-icon class="icon">mdi-pause</v-icon>
                </v-btn>
                <v-btn
                    v-else
                    icon
                    @click="playCurrentSong()"
                >
                    <v-icon class="icon">mdi-play</v-icon>
                </v-btn>

                <v-btn
                    ref="nextBtn"
                    icon
                    @click="playNextSong()"
                >
                    <v-icon class="icon">mdi-skip-next</v-icon>
                </v-btn>
            </div>
        </div>
    </v-bottom-navigation>
</template>

<script>
export default {
    components: {
    },

    filters: {
        doubleDigits(val) {
            if (!val) return ""
            else return parseFloat((val / 10).toFixed(2));

        }
    },

    computed: {
        // ...mapState([ 'tracks' ])
    },

    created() {
        
    },

    data() {
        return {
            
        }
    },

    methods: {
        
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
</style>