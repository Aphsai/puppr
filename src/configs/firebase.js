import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAtDGmvb8KQd4Q9Vp_s5074sB3ntWy_PZk",
  authDomain: "puppr-cd401.firebaseapp.com",
  databaseURL: "https://puppr-cd401.firebaseio.com",
  projectId: "puppr-cd401",
  storageBucket: "puppr-cd401.appspot.com",
  messagingSenderId: "647500434690"
};

firebase.initializeApp(config);
export default firebase;
