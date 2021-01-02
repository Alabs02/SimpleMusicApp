<template>
    <v-app-bar
        absolute
        color="white"
        elevation="0"
        class="app-bar"
        min-height="80"
    >
        <!-- <v-toolbar-title class="app-bar__title">MuseOn</v-toolbar-title> -->
        <div class="app-bar__brand">
            <img src="@/assets/logo.png" alt="museon logo">
        </div>
        <div class="app-bar__spacer"></div>
        <v-divider
            vertical
        ></v-divider>

        <div class="app-bar__items">
            <v-btn
                v-for="(item, i) in appbarItems"
                :key="i"
                text
                rounded
                router :to=item.to
                color="primary"
                class="text-capitalize"
            >
                <span class="app-bar__text">{{ item.title }}</span>
            </v-btn>
        </div>
        <v-spacer></v-spacer>
        <!-- <div> -->
            <v-btn
                rounded
                outlined
                color="black mr-2"
                class="text-capitalize d-sm-none"
            >
                <v-img
                width="20"
                height="20"
                cover
                src="../../assets/uk.png"
                id="flag"
                class="mr-2"
                ></v-img>
                <span>English</span>
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <div class="spacer__2"></div>
            <v-btn
                rounded
                color="primary"
                class="text-capitalize"
                router to="/signin"
            >
                Sign in
            </v-btn>
        <!-- </div> -->
        
    </v-app-bar>
</template>

<script>
export default {
    name: "app_bar",
    data()  {
        return {
            appbarItems: [
                { title: "About", to: "/about" },
                { title: "Team", to: "#!" },
                { title: "Our programs", to: "#@" },
                { title: "Plans", to: "#" },
            ],
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .app-bar {
        padding-top: 0.5rem;

        &__brand {
            // border: 1px solid red;
            width: 9rem;
            height: 9rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &__spacer {
            padding-right: 2rem;
        }

        &__text {
            font-weight: 600;
        }

        &__items {
            padding-left: 2rem;
        }

        &__item {
            margin-right: 2rem;
        }

        &__title {
            font-weight: bold;
        }

    }
    .spacer__2 {
        padding-right: 1rem;
    }
    #flag {
        border-radius: 50% !important;
    }

    @media screen and (min-width: 0px) and (max-width: 668px) {
        .app-bar {
            margin-bottom: 2rem;
            
            &__items {
                display: none;
            }
        }
        .d-sm-none {
            display: none;
        }
    }
    
</style>