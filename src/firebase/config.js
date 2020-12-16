//Firebase


import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
   apiKey: "AIzaSyB7GPoXYXNwAMnouAHijIURea6TqFch13A",
   authDomain: "react-final-chat-d31da.firebaseapp.com",
   projectId: "react-final-chat-d31da",
   storageBucket: "react-final-chat-d31da.appspot.com",
   messagingSenderId: "419652754963",
   appId: "1:419652754963:web:95b39194773dfc032d29e6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();


// Nombre público del proyecto
// project-478839331781


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB7GPoXYXNwAMnouAHijIURea6TqFch13A",
//     authDomain: "react-final-chat-d31da.firebaseapp.com",
//     projectId: "react-final-chat-d31da",
//     storageBucket: "react-final-chat-d31da.appspot.com",
//     messagingSenderId: "419652754963",
//     appId: "1:419652754963:web:95b39194773dfc032d29e6"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>
