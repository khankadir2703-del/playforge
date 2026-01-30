// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDjBHx3xSsfswnaY20PpR8T4YTe9ckFr6E", // यह आपका लेटेस्ट API Key है
  authDomain: "playforge-dda06.firebaseapp.com",
  projectId: "playforge-dda06",
  storageBucket: "playforge-dda06.firebasestorage.app",
  messagingSenderId: "540319303458",
  appId: "1:540319303458:web:47b4e09d33282fb658077b"
};

// Initialize Firebase (आसान तरीका)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("Firebase Connected!");
