// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8SBe4EpLN8T2YjwOPRzz6vVLu7UPE-rY",
  authDomain: "eventzone-efaa8.firebaseapp.com",
  projectId: "eventzone-efaa8",
  storageBucket: "eventzone-efaa8.appspot.com",
  messagingSenderId: "580127032725",
  appId: "1:580127032725:web:fec1198a9a66725600229c",
  measurementId: "G-RP4E9WSMP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
