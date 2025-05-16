import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Remplacez ces valeurs par vos propres configurations Firebase
  apiKey: "AIzaSyAucfvVOtFOSv1w3GFtKgqcJFkRg6sG3ow",
  authDomain: "movies-trailer-9bec8.firebaseapp.com",
  projectId: "movies-trailer-9bec8",
  storageBucket: "movies-trailer-9bec8.firebasestorage.app",
  messagingSenderId: "495839978794",
//   messagingSenderId: "votre-messaging-sender-id",
  appId: "1:495839978794:web:442a9501d61156c65a2a53",
  measurementId: "G-7D6NPZHDN5"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 