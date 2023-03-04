import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBXRSzWp4D11sWIp2Lu6bP2aA6rSH5bNRU",
  authDomain: "dungeons-e8bb6.firebaseapp.com",
  projectId: "dungeons-e8bb6",
  storageBucket: "dungeons-e8bb6.appspot.com",
  messagingSenderId: "808772147825",
  appId: "1:808772147825:web:3a579b3a75dd65341059d0"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }