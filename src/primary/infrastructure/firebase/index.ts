import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: 'pomodoro-storage.firebaseapp.com',
    projectId: 'pomodoro-storage',
    storageBucket: 'pomodoro-storage.appspot.com',
    messagingSenderId: '6851556988',
    appId: '1:6851556988:web:de4e18caa674aa39e0bbf9'
};

export default firebase.initializeApp(firebaseConfig);
