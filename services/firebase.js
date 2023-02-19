import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const config = {
  apiKey: "AIzaSyDjHcJfFHtZpZAPdk08RIyridZITboSdAI",
  authDomain: "sterlingstock-2a203.firebaseapp.com",
  projectId: "sterlingstock-2a203",
  storageBucket: "sterlingstock-2a203.appspot.com",
  messagingSenderId: "646843345876",
  appId: "1:646843345876:web:ec7304a639be2a6d594441"
}

const app = initializeApp(config)

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

