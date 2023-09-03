import {initializeApp} from 'firebase/app';

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'; //from docs

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore' //DOC is what you need to get the document, get doc gets the data, and set doc sets it. Also want to change false to true in the firebase rules.

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-hYlXAKYzHC0n6rS3satDkIQcRb1wObQ",
  authDomain: "ecommerce-site-a238b.firebaseapp.com",
  projectId: "ecommerce-site-a238b",
  storageBucket: "ecommerce-site-a238b.appspot.com",
  messagingSenderId: "331334478333",
  appId: "1:331334478333:web:84c3708995436089321194",
  measurementId: "G-QCF0GV75D2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//aLl of the above is basic code needed to set this up

const googleProvider = new GoogleAuthProvider(); //gauthprov is a class.

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); //Tracks the authentication state of the whole thing. The functions below are related to exactly how you authenticated or logged in, like google or facebook.
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider); //If you want  to use facebook or github to login we can import a facebookauthprovider or something above, and use a similar formula as to here.

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
    //if the collection name does not exist, it will automatically create one.s
    const collectionRef = collection(db, collectionKey); //within the db, find the collection by the name of collectionKey.
    //Below we store each of the objectstoAdd into the collection. That is the purpose of this.
    //We use a batch to ensure success when adding to collection.
    const batch = writeBatch(db); //batch instance. We attach writes, deletes, and sets to this batch.

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase()); //we have 5 titles, like mens and womens for example, they are our overall 5 categories.
        batch.set(docRef, object); //set that location in the collection we want to the value of the object.
    });
    
    await batch.commit();
};
//collectionKey here is just the name of the collection as a string, like Users for example.You add async because you are adding info to firestore database, which is an external source.

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  }; //related to products.context.jsx

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
   // console.log(userSnapshot);
   // console.log(userSnapshot.exists());
 //When you sign in with google pop up and console log it, we get a set of data. We are calling it userAuth here. That data has stuff like name, email, number, all of which can be accessed by using userAuth.name and etc. So uid here is just a unique id also generated in the data.

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log('error creating the user', error.message);
        }

    }
   return userDocRef; 

//check if user data exists
//if not then set the document with data from userAuth

//if it does exist, return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; //if we dont get an email and password do nothing.

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthstateChangedListener = (callback) => onAuthStateChanged(auth, callback); //always listening for changes in the auth state


//This document shows you how to authenticate and create users. In firebase, we see 3 lines, displayName, email, and createdAt.