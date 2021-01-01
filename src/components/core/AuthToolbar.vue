<template>
    <div name="AuthToolbar">
        <v-app-bar
            absolute
            color="white"
            min-height="80"
            flat
            class="app-bar"
        >
            <div class="app-bar__brand">
                <img src="@/assets/logo.png" alt="museon logo">
            </div>

            <v-spacer></v-spacer>
            <div class="app-bar__link">
                <div class="pr-4">Don't have an account?</div>
                <v-btn
                    small
                    rounded
                    color="btnColor"
                    class="white--text"
                    router to="/signup"
                >
                    <span class="text-capitalize">get started</span>
                </v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: "auth_toolbar",
}
</script>

<style lang="scss" scoped>
    .app-bar {
        padding: 0 10rem;

        &__brand {
            // border: 1px solid red;
            width: 12rem;
            height: 4rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &__link {
            display: flex;
            align-items: center;
        }
    }
</style>