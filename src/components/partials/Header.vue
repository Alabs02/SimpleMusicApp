<template>
    <div name="header">
        <v-container class="white header__container">
            <v-row class="pt-6">
                <v-col cols="5">
                    <div class="primary--text header__heading">
                        Rhythms that Enriches the Soul
                    </div>

                    <v-card-text class="body-1 header__subtitle mt-4">Listen to music that entertains and keep you going, with highly customizable playlist.</v-card-text>

                    <v-btn
                        color="btnColor"
                        rounded
                        class="white--text mt-4 text-capitalize"
                        large
                        router to="/signup"
                    >   
                        <v-icon left>mdi-speedometer</v-icon>
                        <span>Get Started</span>
                    </v-btn>
                </v-col>
                <v-col cols="7">
                    <div class="header__hero">
                        <img src="../../assets/hero.png" alt="hero.png"/>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
export default {
    name: "Header",
}
</script>


<style lang="scss" scoped>
    .header {
        margin-top: 100px;

        &__container {
            margin-top: 5rem;
        }

        &__heading {
            // font-family: 'Nunito', sans-serif;
            font-size: 4rem;
            font-weight: 800;
            line-height: 60pt;
        }

        &__subtitle {
            font-family: 'Nunito', sans-serif;

        }

        &__hero {
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
    }
</style>