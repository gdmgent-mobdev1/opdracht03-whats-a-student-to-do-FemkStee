import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
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
const auth = getAuth(app) as Auth;

// eslint-disable-next-line import/prefer-default-export
export const register = ():void => {
  const regNameInp = document.getElementById('regNameInp') as HTMLInputElement;
  const regNameInpVal = regNameInp.value as string;
  const regMailInp = document.getElementById('regMailInp') as HTMLInputElement;
  const regMailInpVal = regMailInp.value as string;
  const regPassw = document.getElementById('regPassw') as HTMLInputElement;
  const regPasswInp = document.getElementById('regPasswInp') as HTMLInputElement;
  const regPasswInpVal = regPasswInp.value as string;

  createUserWithEmailAndPassword(auth, regMailInpVal, regPasswInpVal)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      localStorage.setItem('user_UID', user.uid);
      functions.registerPageTOprojectPage();
    })
    .catch((err) => {
      const error = err.message as string;
      const errorMessage = variables.errorMessage2 as HTMLElement;
      // show error
      errorMessage.classList.remove('hidden');
      if (error === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        errorMessage.innerHTML = '<p>Password should be at least 6 characters</p>';
        regPassw.classList.add('formpage__input-wrong');
      } else if (error === 'Firebase: Error (auth/invalid-email).') {
        errorMessage.innerHTML = '<p>Give an valid email please.</p>';
        regNameInp.classList.add('formpage__input-wrong');
      } else if (error === 'Firebase: Error (auth/internal-error).') {
        errorMessage.innerHTML = '<p>No empty fields please! </p>';
      } else {
        errorMessage.innerHTML = '<p>something went wrong &#128532 </p>';
      }
    });
};
