import firebase from 'firebase';
import request from 'superagent';

export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const REQUEST_GIFS = 'REQUEST_GIFS';

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';
const API_KEY = '3NPmnY44OnumyMDI1p8AT4V1FRsaShAI';

// Normally firebaseConfig would never be exposed but for the sake of this demo and eaze of use, I am leaving it in.
const firebaseConfig = {
  apiKey: "AIzaSyB9Lpw9tNFriki7666zpA0htR3hRwhtaUI",
  authDomain: "playgroundreact.firebaseapp.com",
  databaseURL: "https://playgroundreact.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

export function signUpUser(credentials) {
  return function(dispatch) {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        dispatch(authError(error));
      })
  }
}

export function signOutUser() {
    return function(dispatch) {
      firebase.auth().signOut()
        .then(() => {
          dispatch({
            type: SIGN_OUT_USER
          })
        });
    }
}

export function validateAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    })
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function getTrendingGifs(limit = null, offset) {
  var urlParams = '&limit=' + limit + '&offset=' + offset;

  return function(dispatch) {
    request.get(`${API_TRENDING_URL}?api_key=${API_KEY}${urlParams}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function getGifsBySearchOptions({ searchTerm, limit, sort }) {
  if (!searchTerm) {
    return getTrendingGifs({ searchTerm, limit, sort });
  }

  const urlParams = `&limit=${limit}`;

  return function(dispatch) {
    request.get(`${API_URL}?api_key=${API_KEY}&q=${searchTerm.replace(/\s/g, '+')}${urlParams}`).then(response => {
      response.body.data = sortByUploadDate(response.body.data, sort);

      dispatch({
        type: REQUEST_GIFS,
        payload: response
      })
    })
  }
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = firebase.auth().currentUser.uid;

    firebase.database().ref(userUid+'/favorites').on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}

export function favoriteGif({selectedGif}) {
  const userUid = firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;
  return dispatch => firebase.database().ref(userUid+'/favorites').update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userUid = firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;
  return dispatch => firebase.database().ref(userUid+'/favorites').child(gifId).remove();
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

function sortByUploadDate(data, sort) {
  const sortModifier = sort === 'ascending' ? 1 : -1;
  return data.sort((a, b) => (a.import_datetime < b.import_datetime) ? -sortModifier : (a.import_datetime > b.import_datetime) ? sortModifier : 0);
};
