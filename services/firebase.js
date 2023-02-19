import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const config = {
  apiKey: "AIzaSyBzAMS0E2iSMgP7VmtM7jw6rNub7BAl0Ak",
  authDomain: "profitpointtrade-6b9f4.firebaseapp.com",
  projectId: "profitpointtrade-6b9f4",
  storageBucket: "profitpointtrade-6b9f4.appspot.com",
  messagingSenderId: "556293838489",
  appId: "1:556293838489:web:7cbdaa964c45fb9b6c4a08"
}

const app = initializeApp(config)

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

