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

export const addFavouriteToUser = (uid, public_id, image_width, image_height) => {
  db.ref(`users/${uid}/favourites/${public_id}`).set({
    image_width,
    image_height,
  });
}

export const addImageToUser = (uid, public_id, image_width, image_height) => {
  db.ref(`users/${uid}/uploaded/${public_id}`).set({
    image_width,
    image_height,
  });
}
