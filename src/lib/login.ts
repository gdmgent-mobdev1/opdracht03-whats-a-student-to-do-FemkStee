import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
export const login = ():void => {
  const inlogMailInp = document.getElementById('inlogMailInp') as HTMLInputElement;
  const inlogMailInpVal = inlogMailInp.value as string;
  const inlogPassw = document.getElementById('inlogPassw') as HTMLInputElement;
  const inlogPasswInp = document.getElementById('inlogPasswInp') as HTMLInputElement;
  const inlogPasswInpVal = inlogPasswInp.value as string;

  signInWithEmailAndPassword(auth, inlogMailInpVal, inlogPasswInpVal)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      localStorage.setItem('user_UID', user.uid);
      window.location.pathname = '/dashboard';
      functions.loginPageTOprojectPage();
    })
    .catch((err) => {
      const error = err.message as string;
      const errorMessage = variables.errorMessage as HTMLElement;
      // show error
      errorMessage?.classList.remove('hidden');
      if (error === 'Firebase: Error (auth/user-not-found).') {
        errorMessage.innerHTML = '<p>User not found &#x1F62C</p>';
        inlogMailInp?.classList.add('formpage__input-wrong');
      } else if (error === 'Firebase: Error (auth/wrong-password).') {
        errorMessage.innerHTML = '<p>wrong password &#128532 </p>';
        inlogPassw?.classList.add('formpage__input-wrong');
      } else if (error === 'Firebase: Error (auth/internal-error).') {
        errorMessage.innerHTML = '<p>No empty fields please! </p>';
      } else {
        errorMessage.innerHTML = '<p>something went wrong &#128532 </p>';
      }
    });
};
