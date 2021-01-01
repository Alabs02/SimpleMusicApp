import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDHOq2q7Zy3TGegr_Kae8qyFcwJrX5rr2g",
    authDomain: "clanex-53ed4.firebaseapp.com",
    databaseURL: "https://clanex-53ed4.firebaseio.com",
    projectId: "clanex-53ed4",
    storageBucket: "clanex-53ed4.appspot.com",
    messagingSenderId: "236494139748",
    appId: "1:236494139748:web:fec454a02917376cd2ca71",
};
firebase.initializeApp(firebaseConfig)

// => utils
const db = firebase.firestore()
const auth = firebase.auth()
const storageRef = firebase.storage().ref()
const storage = firebase.storage

// =>  collection references
const usersCollection = db.collection('users')
const musicCollection = db.collection('musics')
const playlistCollection = db.collection('playlist')


// export utils/refs
export {
  db,
  auth,
  usersCollection,
  musicCollection,
  playlistCollection,
}