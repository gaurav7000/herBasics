import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCySWeAbu4BaQdsBhFaZwCUn3tukrY-sjA",
  authDomain: "her-basics.firebaseapp.com",
  projectId: "her-basics",
  storageBucket: "her-basics.appspot.com",
  messagingSenderId: "722548980884",
  appId: "1:722548980884:web:87a23b1a80a4db8c870881",
  measurementId: "G-XG933BQM28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, storage, database };