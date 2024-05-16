import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFIK538dptLaJFM3Gm05R6iHUjoklCD_Y",
  authDomain: "veda-8e6a9.firebaseapp.com",
  projectId: "veda-8e6a9",
  storageBucket: "veda-8e6a9.appspot.com",
  messagingSenderId: "822739487411",
  appId: "1:822739487411:web:31e322b57044851941fec6",
  measurementId: "G-T0SFCKF0J2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) :getApp();
const auth = getAuth(app);

export {app, auth};
