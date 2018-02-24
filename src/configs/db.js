import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getSpecificUser = (uid) =>
  db.ref('users/' + uid).once('value');

export const addFavouriteToUser = (uid, public_id) => {
  db.ref(`users/${uid}/favourites`).set({
    public_id: public_id
  });
}

export const addImageToUser = (uid, public_id) => {
  db.ref(`users/${uid}/uploaded`).set({
    public_id: public_id
  });
}
