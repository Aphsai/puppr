import { auth } from './firebase'


//SIGNUP
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

//SIGNIN
  export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//SIGNOUT
export const doSignOut = () =>
  auth.signOut();
