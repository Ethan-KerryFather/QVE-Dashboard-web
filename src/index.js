import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// routing
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import DashboardMain from "./Pages/DashboardMain";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj5YyP7yCu8ff4MlsKXHahTALwQmyH0Y0",
  authDomain: "qve-dashboard.firebaseapp.com",
  projectId: "qve-dashboard",
  storageBucket: "qve-dashboard.appspot.com",
  messagingSenderId: "24861475976",
  appId: "1:24861475976:web:cbeb08ff72ca90c82c8b3d",
  measurementId: "G-GL348YL4HW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const userAuth = getAuth();
const analytics = getAnalytics(app);

//

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: <DashboardMain /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
