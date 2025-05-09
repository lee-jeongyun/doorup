import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBr4wB6cB91kwzMhPisTvd3qJaYwIFzxDQ',
  authDomain: 'doorup-f3a06.firebaseapp.com',
  projectId: 'doorup-f3a06',
  storageBucket: 'doorup-f3a06.firebasestorage.app',
  messagingSenderId: '37294924157',
  appId: '1:37294924157:web:99422f0dfb89dc3f532c14',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
