// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrUNypBJr4XJPueYfMsSl45KREhrICzDY",
  authDomain: "nextjs-task-management-4c2d7.firebaseapp.com",
  projectId: "nextjs-task-management-4c2d7",
  storageBucket: "nextjs-task-management-4c2d7.appspot.com",
  messagingSenderId: "370023505351",
  appId: "1:370023505351:web:395c1e8bd56fd7174ecde2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
