import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebaseConfig'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // user datat
        userProfile: {},
        username: "",

        // audio track list
        tracks: [],
        tracksCount: 0,

        // => bools - playback helpers
        isPlaying: false,
        isPaused: false,
        isStopped: false,

        // => auth
        isSigninLoading: false,
        isSignupLoading: false,
        isForgotLoading: false,
        
        selectedTrack: {
            title: "",
            artist: "",
            imgUrl: "",
            src: ""
        }

    },

    getters: {
        
    },
    mutations: {
        SET_USER_PROFILE(state, payload) {
            state.userProfile = payload
        },
        SET_USERNAME(state, payload) {
            state.username = payload
        },
        SET_TRACK_LIST(state, payload) {
            state.tracks = payload
        },
        UPDATE_TRACK(state, payload) {
            state.selectedTrack.title = payload.title,
            state.selectedTrack.artist = payload.artist,
            state.selectedTrack.imgUrl = payload.imgUrl,
            state.selectedTrack.src = payload.src
        },
        UPDATE_SIGNIN_BTN(state, payload) {
            state.isSigninLoading = payload
        },
        UPDATE_SIGNUP_BTN(state, payload) {
            state.isSignupLoading = payload
        },
        UPDATE_NAV_VISIBILITY(state, payload) {
            state.isPlaying = payload
        }

    },
    actions: {
        playTrack({ commit }, data) {
            console.log("Data track in state: ", data)
            commit('UPDATE_TRACK', data)
            commit('UPDATE_NAV_VISIBILITY', true)
        },

        audioFinished({ commit }) {
            commit('UPDATE_NAV_VISIBILITY', false)
        },
        // Login logic
        async login({ dispatch, commit }, form) {
            console.log(form);

            commit('UPDATE_SIGNIN_BTN', true)
            // Sign User in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            dispatch('fetchUserProfile', user);
        },
        // signup logic
        async signup({ dispatch, commit }, form) {
            console.log(form)

            commit('UPDATE_SIGNUP_BTN', true);
            // Signup user
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await user.updateProfile({
                displayName: form.username,
            })

            // Create other user data and store in firestore
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)   
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get();
            console.log(userProfile)
            let username = user.displayName

            // set profile in state
            commit('SET_USER_PROFILE', userProfile.data())
            commit('SET_USERNAME', username)

            // change route to dashboard
            if (router.currentRoute.path === '/signin' || router.currentRoute.path === '/signup' || router.currentRoute.path === '/') {
                commit('UPDATE_SIGNIN_BTN', false);
                commit('UPDATE_SIGNUP_BTN', false);
                router.push('/dashboard')
            }
        },

        async fetchMusicCollection({ commit }) {
            fb.musicCollection.onSnapshot(snapshot => {
                let tracksArray = []

                snapshot.forEach(doc => {
                    let track = doc.data()
                    track.id = doc.id

                    tracksArray.push(track)
                })

                commit('SET_TRACK_LIST', tracksArray)
                console.log(tracksArray[0])
            })
        },
        
        // logout logic
        async logout({ commit }) {
            await fb.auth.signOut()
          
            // clear userProfile and redirect to /signin
            commit('SET_USER_PROFILE', {})
            router.push('/signin')
        },

    },
    modules: {
    }
})
