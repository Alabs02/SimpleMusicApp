<template>
    <div name="Signin">
        <div class="sheet-bar">
            <div class="sheet-bar__brand">
                <img src="@/assets/logo.png" alt="museon logo">
            </div>
            <div class="sheet-bar__action">
                <div>Don't have an account?</div>
                <v-btn
                    rounded
                    color="btnColor"
                    router to="/signup"
                >
                    <span class="text-capitalize white--text">get started</span>
                </v-btn>
            </div>         
        </div>
        <div class="main__content mb-8">
            
            <v-sheet class="main__sheet" max-width="100%" elevation="0">
                <v-container class="px-6">
                    <v-card-text class="headline black--text main__title" style="text-align: center !important;">We all forget sometimes</v-card-text>
                    
                    <v-card-text class="body-1 secondary--text">Enter your email. We 'll send you instructions to reset your password</v-card-text>

                    <v-form @submit.prevent class="form">
                        <p class="overline text-capitalise form__desc">Your Email</p>
                        <v-text-field
                            v-model.trim="resetForm.email"
                            outlined
                            type="email"
                            label="Email"
                            hint="johnsnow@gmail.com"
                        ></v-text-field>
                        
                        <v-btn
                            block
                            large
                            color="btnColor"
                            class="white--text mb-4"
                            type="submit"
                            :disabled="btn.disable"
                            :loading=btn.loading
                            @click="resetPassword"
                        >
                            <span class="text-capitalize">request password reset</span>
                        </v-btn>

                        <div class="pt-4" style="text-align: center;">
                            <v-btn
                                text
                                rounded
                                color="btnColor"
                                router to="/signin"
                            >
                                <v-icon>mdi-chevron-left</v-icon>
                                <span class="text-capitalize">Back</span>
                            </v-btn>
                        </div>
                    </v-form>
                </v-container>
            </v-sheet>
        </div>
    </div>
</template>

<script> 
import { auth } from '../firebaseConfig'
import router from '../router/index'

export default {
    name: "signin",

    components: {
    },

    data() {
        return {
            btn: {
                disable: false,
                loading: false,
            },

            resetForm: {
                email: '',
            },

            errMsg: '',
            successMsg: '',

            showSuccess: false,
        }
    },

    methods: {
        async resetPassword() {
            var vm = this;
            try {
                await auth.sendPasswordResetEmail(vm.resetForm.email)
                vm.showSuccess = true

                setTimeout(() => {
                    router.replace('/signin')
                }, 2000);
            } catch (err) {
                this.errMsg = err.message
            }
        }
    },
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
            width: 50%;
        }

        &__title {
            font-size: 2rem;
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
</style>