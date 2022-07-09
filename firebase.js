// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB101WE5aedzvjlh1DJJWxbEWkmnW2uuBo",
    authDomain: "instagram-clone-web-3c06e.firebaseapp.com",
    projectId: "instagram-clone-web-3c06e",
    storageBucket: "instagram-clone-web-3c06e.appspot.com",
    messagingSenderId: "53751950232",
    appId: "1:53751950232:web:0684eca269f3d2f01499ed"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};