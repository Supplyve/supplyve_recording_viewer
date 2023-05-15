import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZR-MQ3Dq8bfxYxano_0MV5gr_agU0PbE",
  authDomain: "supplyveqa.firebaseapp.com",
  projectId: "supplyveqa",
  storageBucket: "supplyveqa.appspot.com",
  messagingSenderId: "1054912846643",
  appId: "1:1054912846643:web:e501a47cb65357f6c1fc46",
  measurementId: "G-HC0Y3BXN4Y",
};

const app = initializeApp(firebaseConfig);
const cs = getStorage(app);
const fs = getFirestore(app);

export { cs, fs };
