// // firebaseConfig.ts
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCBnGQrk8xo7hFr8ayBTBLmi9fAIHQoNS8",
//   authDomain: "shop-list-b4f29.firebaseapp.com",
//   projectId: "shop-list-b4f29",
//   storageBucket: "shop-list-b4f29.firebasestorage.app",
//   messagingSenderId: "354550866840",
//   appId: "1:354550866840:android:f1280bbcb5d7cf4cf381ed"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export {auth, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtq45nP7TrUAvfsBQDd0PMP_hW1x36Rpo",
  authDomain: "shop-list-b4f29.firebaseapp.com",
  projectId: "shop-list-b4f29",
  storageBucket: "shop-list-b4f29.firebasestorage.app",
  messagingSenderId: "354550866840",
  appId: "1:354550866840:web:211817980d85ff74f381ed",
  measurementId: "G-XRBSDV0YNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

// const analytics = getAnalytics(app);

  import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, db };
