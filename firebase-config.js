const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "playforge-app.firebaseapp.com",
    projectId: "playforge-app",
    storageBucket: "playforge-app.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
