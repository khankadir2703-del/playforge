// Aapke naye project ka configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_ed7CPLdUtM2vFWJLjT7r-7n5iw1XlVU",
  authDomain: "playforge-d46a3.firebaseapp.com",
  projectId: "playforge-d46a3",
  storageBucket: "playforge-d46a3.firebasestorage.app",
  messagingSenderId: "347695622009",
  appId: "1:347695622009:web:f8fe89ddc24363ab4571a8",
  measurementId: "G-KRXZE9XC5S"
};

// Firebase initialize karein
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
