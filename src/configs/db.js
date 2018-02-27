import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) => {
  let favourites = {placeholder: 'empty_child'};
  let uploaded = {placeholder: 'empty_child'}
  let upvoted = {placeholder: 'empty_child' }
  return db.ref(`users/${id}`).set({
    favourites,
    uploaded,
    upvoted,
    username,
    email,
  });
}

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getSpecificUser = (uid) =>
  db.ref('users/' + uid).once('value');

export const getListOfImages = () =>
  db.ref('images').once('value');

export const getRefOfImages = () =>
  db.ref('images');

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

export const destroyImage = (uid, public_id) => {
  db.ref(`users/${uid}/uploaded/${public_id}`).remove();
  db.ref(`images/${public_id}`).remove();
}

export const upvoteImage = (uid, public_id) => {
  db.ref(`users/${uid}/upvoted/${public_id}`).push(public_id);
  let imageRef = db.ref(`images/${public_id}`);
  imageRef.transaction(data => {
    data.upvote++;
    return data;
  });
}

export const downvoteImage = (public_id) => {
  let imageRef = db.ref(`images/${public_id}`);
  imageRef.transaction(data => {
    console.log("Data values: " + data);
    data.upvote--;
    return data;
  });
}

export const destroyUpvote = (uid, public_id) => {
  db.ref(`users/${uid}/upvoted/${public_id}`).remove();
}

export const getRefOfUploads = (uid) =>
  db.ref(`users/${uid}/uploaded`);

export const doCreateImage = (id, img_width, img_height) =>
  db.ref(`images/${id}`).set({
    public_id: id,
    upvote: 0,
    width: img_width,
    height: img_height,
  });
