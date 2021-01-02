<template>
    <div name="Signin">
       <auth-toolbar />
       <div class="main__content">
            <div class="black--text main__title">Welcome back</div>
        
            <v-card-text class="center-align mt-4 body-1">Use an existing account</v-card-text>


            <v-row justify="center" class="mt-2">
                <v-btn
                    v-for="(item, i) in existingAccts"
                    :key="i"
                    color="black"
                    outlined
                    class="px-2 mr-4 mb-2"
                >
                    <v-icon :class=item.color>{{ item.icon }}</v-icon>
                </v-btn>
            </v-row>
            <v-card-text class="center-align mt-4 body-1">Or Sign in with</v-card-text>
            
            <v-sheet id="main__sheet" class="mt-2 form__container">
                <v-form @submit.prevent>
                    <p class="overline text-capitalise form__desc">Your Email</p>
                    <v-text-field
                        v-model.trim="loginForm.email"
                        outlined
                        type="email"
                        label="Email"
                        hint="johnsnow@gmail.com"
                    ></v-text-field>

                    <div class="form__action">
                        <p class="overline text-capitalise form__desc">Your Password</p><router-link to="/forgot" style="text-decoration: none !important;"><div class="form__btn btnColor--text">Forgot?</div></router-link>
                    </div>
                    <v-text-field
                        v-model.trim="loginForm.password"
                        outlined
                        type="password"
                        label="Password"
                        append-icon="mdi-eye"
                        hint="*********"
                    ></v-text-field>

                    <v-btn
                        block
                        large
                        color="btnColor"
                        class="white--text mb-4"
                        rounded
                        type="submit"
                        :loading="isSigninLoading"
                        @click="login"
                    >
                        <span class="text-capitalize">Sign in</span>
                    </v-btn>
                </v-form>
            </v-sheet>
       </div>
    </div>
</template>

<script> 
import AuthToobar from '../components/core/AuthToolbar.vue'
import { mapState } from 'vuex'

export default {
    name: "Signin",

    components: {
        "auth-toolbar": AuthToobar,
    },

    computed: {
        ...mapState(['isSigninLoading'])
    },

    async created() {

    },

    data() {
        return {
            existingAccts: [
                { icon: "mdi-google", color: "color__google" },
                { icon: "mdi-facebook", color: "color__fb" },
                { icon: "mdi-twitter", color: "color__twitter" },
                { icon: "mdi-spotify", color: "color__spotify" },
            ],
            
            btn: {
                disable: false,
                loading: false,
            },

            loginForm: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        login() {
            var vm = this;
            vm.$store.dispatch('login', {
                email: vm.loginForm.email,
                password: vm.loginForm.password,
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .main__content {
        // margin: 0 auto !important;
        margin-top: 5.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center !important;
        text-align: center !important;
    }
    .main {

        &__title {
            font-size: 2rem;
            font-weight: 600;
        }
    }
    .form {

        &__container {
            padding: 0 1.2rem;
            text-align: center;
            margin: 0 auto;
            // max-width: 40% !important;
            // min-width: 100% !important;
        }

        &__action {
            display: flex;
            align-items: center;
        }

        &__btn {
            font-weight: 600 !important;
            padding: 0 1rem;
            cursor: pointer;

            &:hover {
                transform: scale(1.05);
            }
        }

        &__desc {
            text-align: left !important;
            font-weight: 300;
            font-size: 0.7rem !important;
            letter-spacing: 0.5pt !important;
            margin: 0 !important;
        }
    }

    .color {
        &__google {
            color: #db3236 !important;
        }

        &__fb {
            color: #4267B2 !important;
        }

        &__twitter {
            color: #1da1f2 !important;
        }

        &__spotify {
            color: rgb(8, 195, 103) !important;
        }
    }

    #main__sheet {
        width: 40%;
    }

    @media screen and (min-width: 0px) and (max-width: 868px) {
        #main__sheet {
            width: 100%;
        }
    }
</style>