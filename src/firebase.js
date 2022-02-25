import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
 
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseURL: env.DATABASE_URL,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGE_SENDER_ID,
    appId: env.APP_ID,
    measurementId: env.MEASUREMENT_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);
  
  