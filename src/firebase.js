// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    return {
      user: userCredential.user,
      userData: userDoc.data()
    };
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Helper function to get readable error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/invalid-email':
      return 'Invalid email address';
    default:
      return 'An error occurred during authentication';
  }
};

export default app;