import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
  UserCredential,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// My web app's Firebase configuration
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
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Database
export const db = getFirestore();

// New type
type ObjectToAdd = {
  title: string;
};

//I create a new collection
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey); //This is the new collection
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

type CategoryItem = {	
  id: number;	
  imageUrl: string;	
  name: string;	
  price: number;	
};	
type CategoryData = {	
  imageUrl: string;	
  items: CategoryItem[];	
  title: string;
};

export const getCategoriesAndDocuments = async (): Promise<CategoryData[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as CategoryData
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  email: string;
  createdAt: Date;
  displayName: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return; //If I don't have a userAuth I want a return

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
      console.log("error creating the user", error);
    }
  }

  //If user data exists return userSnapshot
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Email & password create with sign-up
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return; //If we don't have an email or password we want a return

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Email & password authentication with sign-in
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return; //If we don't have an email or password we want a return

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const signOutUser = async (): Promise<void> => await signOut(auth);

//When ever a user is authenticated in or out
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  //The moment I call this onAuthStateChanged method, It's like I said "create a listerner for me using this callback"
  //This is a permanently open listerner
  onAuthStateChanged(auth, callback);

//I want to see if there is an active user that's been authenticated
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
