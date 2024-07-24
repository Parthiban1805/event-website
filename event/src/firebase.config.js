// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY1RuwUbAuZBBeq1KUh-8ISoEoURVlyYY",
  authDomain: "eventotp-932c0.firebaseapp.com",
  projectId: "eventotp-932c0",
  storageBucket: "eventotp-932c0.appspot.com",
  messagingSenderId: "924500786679",
  appId: "1:924500786679:web:7e78d15993fb2bb2aec2f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)