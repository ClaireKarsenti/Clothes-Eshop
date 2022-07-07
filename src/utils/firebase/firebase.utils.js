import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB51SviP2NIfsh8o5k_ZAKd1LMEk5DDrsE",
  authDomain: "crwn-clothing-db-89865.firebaseapp.com",
  projectId: "crwn-clothing-db-89865",
  storageBucket: "crwn-clothing-db-89865.appspot.com",
  messagingSenderId: "558515317340",
  appId: "1:558515317340:web:a4e9a2a862650294f99499",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; //If we don't have a userAuth we want a return

  const userDocRef = doc(db, "users", userAuth.uid); // (database, 'collection', identifier) identifier = unique id

  const userSnapshot = await getDoc(userDocRef);

  //If user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date(); //when the user is sign-in

    //create / set the document with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //If user data exists return userDocRef
  return userDocRef;
};

// Email & password create with sign-up
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; //If we don't have an email or password we want a return

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Email & password authentication with sign-in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; //If we don't have an email or password we want a return

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const signOutUser = async () => await signOut(auth);
