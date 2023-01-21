import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential, Auth,
} from 'firebase/auth';
import * as variables from './Variables';
import * as functions from './Functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAlcZTX9MbSBk9Mbh5Baq8-zRUIPzk--IA',
  authDomain: 'mylo-48315.firebaseapp.com',
  projectId: 'mylo-48315',
  storageBucket: 'mylo-48315.appspot.com',
  messagingSenderId: '949548352024',
  appId: '1:949548352024:web:fc1fc222eb7f07caeb396d',
};

const app = initializeApp(firebaseConfig) as FirebaseApp;
const auth = getAuth() as Auth;
const provider = new GoogleAuthProvider() as GoogleAuthProvider;

// eslint-disable-next-line import/prefer-default-export
export const googleLogin = ():void => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
      const token = credential.accessToken as string;
      // The signed-in user info.
      const { user } = result;
      localStorage.setItem('user_UID', user.uid);
      functions.registerORloginPageTOprojectPage();
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error.customData;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error) as OAuthCredential;
    });
};
