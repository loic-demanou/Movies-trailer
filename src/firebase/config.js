import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Remplacez ces valeurs par vos propres configurations Firebase
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  apiKey: "AIzaSyAucfvVOtFOSv1w3GFtKgqcJFkRg6sG3ow",
  authDomain: "movies-trailer-9bec8.firebaseapp.com",
  projectId: "movies-trailer-9bec8",
  storageBucket: "movies-trailer-9bec8.firebasestorage.app",
  messagingSenderId: "495839978794",
  appId: "1:495839978794:web:442a9501d61156c65a2a53",
  measurementId: "G-7D6NPZHDN5"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 