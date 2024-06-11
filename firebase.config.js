// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMCYNV4cHZWjAlGm7U-wZO6UB69060EXE",
  authDomain: "practice-c1aa4.firebaseapp.com",
  databaseURL: "https://practice-c1aa4-default-rtdb.firebaseio.com",
  projectId: "practice-c1aa4",
  storageBucket: "practice-c1aa4.appspot.com",
  messagingSenderId: "267570730587",
  appId: "1:267570730587:web:76b6108875d9d3c50cd17e",
  measurementId: "G-FJW4NTC1FS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
