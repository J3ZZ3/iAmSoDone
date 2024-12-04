import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAPTUDF_Aiy4Am7KadVROLTCWyX7z2ErOg",
  authDomain: "audiorecorder-6170a.firebaseapp.com",
  projectId: "audiorecorder-6170a",
  storageBucket: "audiorecorder-6170a.firebasestorage.app",
  messagingSenderId: "430774858098",
  appId: "1:430774858098:web:5fea15e8ecad23c0496deb"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); 
}

export { firebase };