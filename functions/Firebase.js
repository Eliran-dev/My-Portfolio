import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCkWPxWvJyA5tWiY-sG5dRe5mYAiQBl5hM",
    authDomain: "my-portfolio-82da0.firebaseapp.com",
    projectId: "my-portfolio-82da0",
    storageBucket: "my-portfolio-82da0.appspot.com",
    messagingSenderId: "755601102317",
    appId: "1:755601102317:web:86a56cba975386a46a83e4"
  };


  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, firebaseConfig};
  export default db;