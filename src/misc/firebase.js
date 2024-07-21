// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSwm5Un60j8g000vCcAjVrwnJX9ynCLHE',
  authDomain: 'chat-app-8a8f5.firebaseapp.com',
  projectId: 'chat-app-8a8f5',
  storageBucket: 'chat-app-8a8f5.appspot.com',
  messagingSenderId: '668934627837',
  appId: '1:668934627837:web:b1d3f9cf3d6aa8e279b994',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
