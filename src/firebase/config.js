import { getFirestore } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6Y-ZREoMgE-HCVC2hoJPNRrCI0_pcCg4",
  authDomain: "miniblog-59bfa.firebaseapp.com",
  projectId: "miniblog-59bfa",
  storageBucket: "miniblog-59bfa.appspot.com",
  messagingSenderId: "27510263449",
  appId: "1:27510263449:web:a8ab93d12817c4d85c7208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}