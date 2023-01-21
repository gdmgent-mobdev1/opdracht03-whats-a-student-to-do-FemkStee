/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/prefer-default-export */
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  DocumentReference,
  CollectionReference, DocumentData, getFirestore, onSnapshot, query, where, Query, collection, doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlcZTX9MbSBk9Mbh5Baq8-zRUIPzk--IA',
  authDomain: 'mylo-48315.firebaseapp.com',
  projectId: 'mylo-48315',
  storageBucket: 'mylo-48315.appspot.com',
  messagingSenderId: '949548352024',
  appId: '1:949548352024:web:fc1fc222eb7f07caeb396d',
};

const app = initializeApp(firebaseConfig) as FirebaseApp;
const db = getFirestore();

// export function loadUser(user_UID: String) {
//   const colRef = collection(db, 'Users') as CollectionReference<DocumentData>;
//   const q = query(colRef, where('UserUID', '==', user_UID)) as Query<DocumentData>;
//   return onSnapshot(q, (snapshot) => snapshot);
// }

export function getdocs(path: string, fieldpath: string, UID: String) {
  const colRef = collection(db, path) as CollectionReference<DocumentData>;
  const q = query(colRef, where(fieldpath, '==', UID)) as Query<DocumentData>;
  onSnapshot(q, (snapshot) => {
    const array = [];
    const array2 = [];
    snapshot.docs.forEach((doc) => {
      array.push({ ...doc.data() });
      array2.push({ ...doc });
    });
    localStorage.removeItem(path);
    localStorage.setItem(path, JSON.stringify(array));
    const pathUID = `${path}UID`;
    localStorage.setItem(pathUID, JSON.stringify(array2));
  });
}

export function getdocs2(path: string, fieldpath: string, UID: String) {
  const colRef = collection(db, path) as CollectionReference<DocumentData>;
  const q = query(colRef, where(fieldpath, '!=', UID)) as Query<DocumentData>;
  onSnapshot(q, (snapshot) => {
    const array = [];
    const array2 = [];
    snapshot.docs.forEach((doc) => {
      array.push({ ...doc.data() });
      array2.push({ ...doc });
    });
    localStorage.removeItem(path);
    localStorage.setItem(path, JSON.stringify(array));
    const pathUID = `${path}UID`;
    localStorage.setItem(pathUID, JSON.stringify(array2));
  });
}

export function getdoc(path: string, UID: string) {
  const docRef = doc(db, path, UID) as DocumentReference<DocumentData>;
  onSnapshot(docRef, (doc) => {
    const data = doc.data() as DocumentData;
    localStorage.removeItem(path);
    localStorage.setItem(path, JSON.stringify(data));
  });
}

export function getdoc2(path: string, name: string, UID: string) {
  const docRef = doc(db, path, UID) as DocumentReference<DocumentData>;
  onSnapshot(docRef, (doc) => {
    const data = doc.data() as DocumentData;
    localStorage.setItem(name, JSON.stringify(data));
  });
}

export function getAlldocs(path: string) {
  const docRef = collection(db, path) as CollectionReference<DocumentData>;
  onSnapshot(docRef, (snapshot) => {
    const array = [];
    const array2 = [];
    snapshot.docs.forEach((doc) => {
      array.push({ ...doc.data() });
      array2.push({ ...doc });
    });
    localStorage.removeItem(path);
    localStorage.setItem(path, JSON.stringify(array));
    const pathUID = `${path}UID`;
    localStorage.setItem(pathUID, JSON.stringify(array2));
  });
}
