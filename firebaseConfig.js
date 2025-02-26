import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    query,
    where,
    doc,
    getDoc,
    persistentLocalCache,
    persistentSingleTabManager,
    initializeFirestore
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import firestore from "@react-native-firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAsn3FCwYt8x_19pKOvCRrxSNPohPNp2ok",
    authDomain: "lthc-web.firebaseapp.com",
    projectId: "lthc-web",
    storageBucket: "lthc-web.appspot.com",
    messagingSenderId: "1018509370599",
    appId: "1:1018509370599:web:26531f58ae7492f8bc6e42",
};

const app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager(), // Single-tab persistence (multi-tab not supported in React Native)
        storage: AsyncStorage, // Use AsyncStorage instead of IndexedDB
    }),
});

// firestore().settings({
//     persistence: true, // Uses SQLite instead of IndexedDB
// });

export {
    firestore,
    app,
    collection,
    getDocs,
    addDoc,
    setDoc,
    query,
    where,
    doc,
    getDoc,
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
