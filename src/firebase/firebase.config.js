import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKzV-Yuy9M_4y3Gj7P36wRKVP36ppGCy4",
  authDomain: "todo-a2e62.firebaseapp.com",
  projectId: "todo-a2e62",
  storageBucket: "todo-a2e62.appspot.com",
  messagingSenderId: "7794748628",
  appId: "1:7794748628:web:9685efad7b89ce3f9b1f41",
  measurementId: "G-2PJDX6CERL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { auth, provider };
