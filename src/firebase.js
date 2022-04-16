import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import env from "react-dotenv"



const firebaseConfig = {
 
  apiKey: "AIzaSyANwU41Pb7LoF-CHb7VQr2EE5DEwWrw_kc",
  authDomain: "weddingsite-8c552.firebaseapp.com",
  databaseURL: "https://weddingsite-8c552-default-rtdb.firebaseio.com",
  projectId: "weddingsite-8c552",
  storageBucket: "weddingsite-8c552.appspot.com",
  messagingSenderId: "210741518155",
  appId: "1:210741518155:web:145ee1eba41d98356f52ce",
  measurementId: "G-T092F4MK4G"
  
    // apiKey: env.REACT_APP_API_KEY,
    // authDomain: env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: env.REACT_APP_DATABASE_URL,
    // projectId: env.REACT_APP_PROJECT_ID,
    // storageBucket: env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: env.REACT_APP_MESSAGE_SENDER_ID,
    // appId: env.REACT_APP_APP_ID,
    // measurementId: env.REACT_APP_MEASUREMENT_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);
  
  