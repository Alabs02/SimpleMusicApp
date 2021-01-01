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
    },
    actions: {
        // Login logic
        async login({ dispatch }, form) {
            console.log(form);
            // Sign User in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            dispatch('fetchUserProfile', user);
        },
        // signup logic
        async signup({ dispatch }, form) {
            console.log(form)
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
