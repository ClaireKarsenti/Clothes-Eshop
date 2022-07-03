import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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

// Google authentification
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //If user data exists return userDocRef
  return userDocRef;
};
