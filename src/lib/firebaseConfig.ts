// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQC4BbXySohR-HHVTVbTe-ieijhgD8gao",
  authDomain: "ai-task-prioritizer.firebaseapp.com",
  projectId: "ai-task-prioritizer",
  storageBucket: "ai-task-prioritizer.firebasestorage.app",
  messagingSenderId: "63341045322",
  appId: "1:63341045322:web:be896cdec67c374c1028b3",
  measurementId: "G-V3RW5KXCKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);