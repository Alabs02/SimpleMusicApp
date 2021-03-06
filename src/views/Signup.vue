<template>
    <div name="Signin">
        <div class="sheet-bar">
            <div class="sheet-bar__brand">
                <img src="@/assets/logo.png" alt="museon logo">
            </div>
            <div class="sheet-bar__action">
                <div>Already have an account?</div>
                <v-btn
                    small
                    rounded
                    color="btnColor"
                    router to="/signin"
                >
                    <span class="text-none white--text">Sign in</span>
                </v-btn>
            </div>         
        </div>
        <div class="main__content mb-8">
            
            <v-sheet class="main__sheet" max-width="100%" elevation="3">
                <v-row>
                    <v-col sm="12" md="7" cols="12">
                        <v-container class="px-6">
                            <v-card-text class="title black--text">Start using MuseOn</v-card-text>
                            <v-card-text class="body-1 secondary--text">Use an existing account</v-card-text>
                            <v-row class="px-6 pt-2 pb-6">
                                <v-btn
                                    v-for="(item, i) in existingAccts"
                                    :key="i"
                                    outlined
                                    class="mr-2"
                                    @click="alertSnackbar(item.vendor)"
                                >
                                    <v-icon :class=item.color>{{item.icon}}</v-icon>
                                </v-btn>
                            </v-row>
                            <v-card-text class="body-1 secondary--text">or Sign up with</v-card-text>

                            <v-form @submit.prevent class="form">
                                <p class="overline text-capitalise form__desc">Your Name</p>
                                <v-text-field
                                    v-model.trim="signupForm.name"
                                    outlined
                                    type="text"
                                    label="Full Name"
                                    hint="John Snow"
                                ></v-text-field>

                                <p class="overline text-capitalise form__desc">Your Username</p>
                                <v-text-field
                                    v-model.trim="signupForm.username"
                                    outlined
                                    type="text"
                                    label="Username"
                                    hint="Snow"
                                ></v-text-field>

                                <p class="overline text-capitalise form__desc">Your Email</p>
                                <v-text-field
                                    v-model.trim="signupForm.email"
                                    outlined
                                    type="email"
                                    label="Email"
                                    hint="johnsnow@gmail.com"
                                ></v-text-field>

                                <p class="overline text-capitalise form__desc">Create a password</p>
                                <v-text-field
                                    v-model.trim="signupForm.password"
                                    outlined
                                    :type="showSignupP ? 'text' : 'password'"
                                    label="Password"
                                    hint="********"
                                    :append-icon="showSignupP ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showSignupP = !showSignupP"
                                    @keydown.enter="signup"
                                ></v-text-field>
                                
                                <v-btn
                                    block
                                    large
                                    color="btnColor"
                                    class="white--text mb-4"
                                    rounded
                                    type="submit"
                                    :loading="isSignupLoading"
                                    @click="signup"
                                >
                                    <span class="text-capitalize">Start using MuseOn</span>
                                </v-btn>
                            </v-form>
                        </v-container>
                    </v-col>

                    <v-col sm="12" md="5" cols="12" class="accent" style="padding-right: 2rem; position: relative;">
                        <div class="main__section secondary">
                            <div>
                                <span class="white--text">"Music that keeps you going"</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    color="white"
                    top
                >
                    <span class="primary--text" v-text="snackbarText"></span>

                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="blue"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-sheet>
        </div>
    </div>
</template>

<script> 
import { mapState } from 'vuex'

export default {
    name: "Signup",

    components: {
    },

    computed: {
        ...mapState(['isSignupLoading'])
    },

    data() {
        return {
            showSignupP: false,
            snackbar: false,
            timeout: 2000,
            snackbarText: "",
            existingAccts: [
                { icon: "mdi-google", color: "color__google", vendor: "Google" },
                { icon: "mdi-facebook", color: "color__fb", vendor: "Facebook" },
                { icon: "mdi-twitter", color: "color__twitter", vendor: "Twitter" },
                { icon: "mdi-spotify", color: "color__spotify", vendor: "Spotify" },
            ],

            btn: {
                disable: false,
                loading: false,
            },

            signupForm: {
                username: '',
                name: '',
                email: '',
                password: '',
            }
        }
    },

    methods: {
        signup() {
            var vm = this;
            vm.$store.dispatch('signup', {
                username: vm.signupForm.username,
                name: vm.signupForm.name,
                email: vm.signupForm.email,
                password: vm.signupForm.password,
            })
        },

        alertSnackbar(vendor) {
            var vm = this
            vm.snackbarText = `${vendor} authentication is not implemented at the moment!`
            vm.snackbar = true
        },
    }
}
</script>

<style lang="scss" scoped>
    // Sheet bar
    .sheet-bar {
        // border: 1px solid red;
        display: flex;
        justify-content: space-between !important;
        align-items: center;

        margin: 0 auto;
        width: 60%;

        padding: 2rem 0;

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

        &__action {
            display: flex;
            align-items: center;

            div {
                padding-right: 1rem;
            }
        }

        
    }

    // Form custom styles
    .form {
        width: 90%;
        // border: 1px solid blue;

        &__container {
            padding: 0 1.2rem;
            text-align: center;
            margin: 0 auto;
            // max-width: 40% !important;
            // min-width: 100% !important;
        }

        &__desc {
            text-align: left !important;
            font-weight: 300;
            font-size: 0.7rem !important;
            letter-spacing: 0.5pt !important;
            margin: 0 !important;
        }
    }

    .main {
        &__content {
            margin: 0 auto;
            width: 60%;
        }

        &__section {
            position: absolute;
            bottom: 0;
            right: 0;

            height: 300px;
            width: 80%;
            border-top-left-radius: 60%;
            overflow: hidden;

            div {
                position: absolute;
                top: 90px;
                left: 15%;

                span {
                    text-align: center !important;
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 25pt !important;
                    font-family: cursive !important;
                }
            }
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

    // Mobile
    @media screen and (min-width: 0px) and (max-width: 868px) {
        .sheet-bar {
            // border: 1px solid blue;
            width: 100% !important;
            padding: 1rem 0 !important;

            &__brand {
                width: 8rem;
                // height: 3;
                margin-left: .5rem !important;
            }

            &__action {
                margin-right: .5rem !important;
                div {
                    display: none !important;
                }
            }
        }
        .main {
            &__section {
                display: none !important;
            }

            &__content {
                width: 90%;
                margin-top: 1rem;
            }
        } 
    }

    // tablet
    @media screen and (min-width: 768px) {
        
    }
</style>