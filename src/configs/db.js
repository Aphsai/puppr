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

export const getListOfImages = () =>
  db.ref('images/').once('value');

export const getRefOfImages = () =>
  db.ref('images/');

export const addFavouriteToUser = (uid, public_id) => {
  db.ref(`users/${uid}/favourites/${public_id}`).push(public_id);
}

export const destroyFavouriteFromUser = (uid, public_id) => {
  db.ref(`users/${uid}/favourites/${public_id}`).remove();
}

export const getRefOfFavourites = (uid) =>
  db.ref(`users/${uid}/favourites`);

export const addImageToUser = (uid, public_id) => {
  db.ref(`users/${uid}/uploaded/${public_id}`).push(public_id);
}

export const destroyImageFromUser = (uid, public_id) => {
  db.ref(`users/${uid}/uploaded/${public_id}`).remove();
}

export const getRefOfUploads = (uid) =>
  db.ref(`users/${uid}/uploaded`);

export const doCreateImage = (id, img_width, img_height) =>
  db.ref(`images/`).push({
    public_id: id,
    upvote: 0,
    width: img_width,
    height: img_height,
  });
