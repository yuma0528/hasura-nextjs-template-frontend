import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import firebase from 'firebase/compat'

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databeseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

if (process.env.NODE_ENV !== "production" && process.env.FIREBASE_AUTH_EMULATOR_URL) {
  const auth = firebase.auth();
  auth.useEmulator(process.env.FIREBASE_AUTH_EMULATOR_URL);
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
