// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/storage';
import apiKey from '@/data/apiKey';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${apiKey}`,
    authDomain: 'pomodoro-storage.firebaseapp.com',
    projectId: 'pomodoro-storage',
    storageBucket: 'pomodoro-storage.appspot.com',
    messagingSenderId: '6851556988',
    appId: '1:6851556988:web:de4e18caa674aa39e0bbf9'
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
