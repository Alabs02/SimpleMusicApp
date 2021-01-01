<template>
    <div name="dashboard" class="dashboard">
        <div class="dashboard__draw accent">
            <drawer />
        </div>
        <div class="dashboard__section">
            <div class="header">
                <div class="header__bar">
                    <v-text-field
                        flat
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        placeholder="Search for music artists"
                        solo
                        class="header__search"
                        style="::placeholder { font-weight: 800; !important}"
                    ></v-text-field>
                </div>

                <div class="header__section">
                    <div class="mr-4">
                        <v-btn
                            v-for="(item, i) in navBtns"
                            :key="i"
                            icon
                            large
                            color="black"
                            @click=item.press
                        >
                            <v-icon v-text="item.icon"></v-icon>
                        </v-btn>
                    </div>
                    <div>
                        <!-- <v-avatar
                            height="50"
                            width="50"
                            class="header__avatar"
                        >
                            <img src="@/assets/uk.png" alt="user avatar">
                        </v-avatar> -->
                        

                        <v-menu open-on-hover open-on-click>
                            <template v-slot:activator="{ on, attrs }">
                                <v-avatar
                                    height="50"
                                    width="50"
                                    class="header__avatar"
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span class="white--text headline">{{ username.slice(0,1) }}</span>
                                </v-avatar>
                            </template>
                            <v-list dense>
                                <v-list-item @click="logout">
                                    <v-list-item->
                                        <v-icon color="btnColor">mdi-logout</v-icon>
                                    </v-list-item->
                                    <v-list-item-title class="btnColor--text">Logout</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>

                </div>
            </div>

            <div class="recommend">
                <div class="recommend__title">Recommended albums</div>

                <div>
                <v-icon
                    large
                    color="black"
                >
                    mdi-album
                </v-icon>
                </div>
            </div>

            <div class="flat-card__container">
                <v-slide-group
                    multiple
                    show-arrows
                >
                    <v-slide-item
                        v-for="(track, n) in  tracks"
                        :key="n"
                    >
                        <div
                            v-if="track.recommended"
                            class="flat-card mr-6"
                        >
                            <div class="flat-card__media">
                                <img :src="track.imgUrl" draggable="false" alt="img" />
                            </div>

                            <div class="flat-card__title black--text" v-text="track.title"></div>
                            <div class="flat__card__subtitle grey--text" v-text="track.artist"></div>
                        </div>

                        <div v-else></div>
                    </v-slide-item>
                </v-slide-group>
            </div>

            <v-row>
                <v-col cols="7" class="pl-12 pt-12">
                    <div class="title text-capitalize black--text pb-6" style="font-weight: bold;">Top Songs</div>
                <div v-for="(item, n) in tracks" :key="n" class="music-card accent mb-4">
                        <div class="music-card__body">
                            <div class="music-card__media">
                                <img :src="item.imgUrl" alt="image" />
                            </div>

                            <div class="music-card__content">
                                <div class="music-card__title" v-text="item.title"></div>
                                <div class="music-card__subtitle" v-text="item.artist"></div>
                            </div>
                        </div>
                    
                    <div class="music-card__length" v-text="item.length"></div>

                    <div class="music-card__play">
                        <v-btn
                                icon
                                large
                                color="btnColor"
                                @click="item.press"
                            >
                                <v-icon>mdi-play</v-icon>
                            </v-btn>
                    </div>

                    <div class="music-card__action">
                            <v-btn                            
                                icon
                                color="grey darken-2"
                            >
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                    </div>
                </div>
                </v-col>
                <v-col cols="5" class="py-12 px-12">
                    <div class="title text-capitalize pb-6 black--text" style="font-weight: bold;">Recent Playlist</div>
                    <v-card
                        v-for="(item, i) in recentList"
                        :key="i"
                        :color="item.color"
                        dark
                        class="mb-4"
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="headline"
                            v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                            <v-card-actions>
                            <v-btn
                                v-if="item.artist === 'Ellie Goulding'"
                                class="ml-2 mt-3"
                                fab
                                icon
                                height="40px"
                                right
                                width="40px"
                            >
                                <v-icon>mdi-play</v-icon>
                            </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <bottom-player></bottom-player>            
        </div>
    </div>
</template>

<script>
import Drawer from '@/components/core/Drawer';
import BottomPlayer from '@/components/core/BottomPlayer';
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    components: {
        "drawer": Drawer,
        "bottom-player": BottomPlayer,
    },

    computed: {
        ...mapState(['userProfile', 'username', 'tracks']),
    },

    created() {
        this.getMusicCollection();
    },

    data() {
        return {
            navBtns: [
                { icon:"mdi-bell-outline",  press: () => {} },
                { icon:"mdi-cog",  press: () => {} },
            ],

            recommededList: [],

            recentList: [
                {
                    color: '#952175',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },

                {
                    color: 'blue',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },

                {
                    color: 'indigo darken-2',
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    title: 'Halcyon Days',
                    artist: 'Ellie Goulding',
                },
            ],
        }
    },

    methods: {
        // forceFileDownload(response) {
        //     const url = window.URL.createObjectURL(new Blob([response.data]))
        //     const link = document.createElement('a')
        //         link.href = url
        //         link.setAttribute('download', 'music.mp3')
        //     document.body.appendChild(link)
        //     link.click()
        // },

        // downloadTrack(url) {
        //     axios({url:url}, {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //             "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        //         }
        //     })
        //     .then(response => {
        //         this.forceFileDownload(response)
        //     })
        //     .catch(err => console.error("An error occured: ", err))
        // },

        logout() {
            var vm = this;
            vm.$store.dispatch('logout')
        },

        getMusicCollection() {
            var vm = this;
            vm.$store.dispatch('fetchMusicCollection')
        },
    },
    
}
</script>

<style lang="scss" scoped>
    .dashboard {
        position: relative;
        // border: 5px solid gold;
        display: flex;
        flex-direction: row;

        &__draw {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 18%;
        }

        &__section {
            // border: 1px solid red;
            width: 82% !important;
            margin-left: 18% !important;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;

        position: sticky !important;
        top: 0 !important;

        padding: 1rem 2rem;

        &__bar {
            width: 40%;
        }

        &__section {
            display: flex;
            align-items: center;
        }

        &__avatar {
            img {
                object-fit: cover !important;
            }
        }
    }

    .recommend {
        display: flex;
        justify-content: space-between;
        align-items: center;

        // border: 1px solid purple;
        padding: 1rem 2rem;

        &__title {
            font-weight: 700;
            font-size: 1.2rem;
        }
    }

    .flat-card {
        overflow: hidden;
        // border: 1px solid red;
        border-radius: .2rem;
        overflow: hidden;

        &__container {
            display: flex;
            flex-direction: row;
            align-items: center;

            // border: 1px solid yellow;
            // padding-left: 2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;

            overflow-x: auto;
        }

        &__media {
            width: 10rem;
            height: 8rem;
            border-radius: .2rem;
            overflow: hidden;
            box-shadow: 0px 0px 4px rgba($color: #000000, $alpha: 0.2);


            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__title {
            font-size: 1.1rem;
            font-weight: 700;
            text-transform: capitalize;

            padding-top: .4rem;
        }

        &__subtitle {
            font-size: .9rem;
            font-weight: 500;
            text-transform: capitalize;
        }
    }

    .music-card {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        overflow: hidden;
        padding: .5rem 0;
        border-radius: .4rem;
        // border: 1px solid green;
        box-shadow: 0px 0px 4px rgba($color: #202020, $alpha: 0.3);

        &__body {
            display: flex;
            justify-content: center;
            align-items: center;

            // border: 1px solid green;
            width: 40%;
        }

        &__media {
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
            width: 100%;
            // border: 1px solid red;
            padding-left: 1.5rem;
        }

        &__title {
            font-size: 1.1rem;
            font-weight: 700;
        }

         &__subtitle {
            font-size: .9rem;
            font-weight: 400;
            padding-top: .5rem;
        }

        &__length {
            font-weight: 600;
            font-size: 1.1rem;

            width: 10%;
            // border: 1px solid blue;
        }
    }
</style>