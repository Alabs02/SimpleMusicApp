<template>
    <v-navigation-drawer
    v-model="drawer"
    permanent
    color="accent"
    class="drawer"
    >
    <v-list-item class="px-2 py-2">
        <div class="drawer__brand">
        <img src="@/assets/logo.png" alt="museon logo">
        </div>
        <v-spacer></v-spacer>
        <v-btn
        icon
        @click.stop="mini = !mini"
        >
        <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
    </v-list-item>

    <v-divider></v-divider>

        <v-list flat dense class="px-8 pt-4">
            <v-list-item-group
                v-model="selectedItem"
                color="btnColor"
                style="margin: 0 !important;"
            >
                <v-list-item
                    v-for="(item, i) in one_items"
                    :key="i"
                    style="margin: 0 !important;"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>


        <v-list flat dense class="px-8 pt-4">
            <div class="text-uppercase" style="text-align: center !important;">Your library</div>

            <v-list-item-group
                color="btnColor"
            >
                <v-list-item
                    v-for="(item, i) in two_items"
                    :key="i"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-list flat dense class="px-8 pt-4">
            <div class="text-uppercase" style="text-align: center !important;">Your playlist</div>
            <v-list-item-group
                color="btnColor"
            >
                <v-list-item
                    v-for="(item, i) in three_items"
                    :key="i"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>


<script>
  export default {
    data () {
      return {
        drawer: true,
        one_items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'Browse', icon: 'mdi-magnify' },
          { title: 'Radio', icon: 'mdi-radio' },
          { title: 'Favourites', icon: 'mdi-heart-outline' },
        ],

        two_items: [
          { title: 'Artists', icon: 'mdi-account-music' },
          { title: 'Songs', icon: 'mdi-music' },
          { title: 'Albums', icon: 'mdi-album' },
        ],

        three_items: [
          { title: 'Believer', icon: 'mdi-playlist-music' },
          { title: 'Code', icon: 'mdi-playlist-music' },
        ],

        selectedItem: 0,
        mini: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
    .drawer {   
        // height: 100vh !important;

        &__brand {
            width: 9rem;
            height: 3rem;
            // border: 1px solid red;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        
    }
</style>