import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "qve-dashboard.firebaseapp.com",
  projectId: "qve-dashboard",
  storageBucket: "qve-dashboard.appspot.com",
  messagingSenderId: "24861475976",
  appId: "1:24861475976:web:cbeb08ff72ca90c82c8b3d",
  measurementId: "G-GL348YL4HW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
