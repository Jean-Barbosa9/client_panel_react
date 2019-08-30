import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Custom reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBQ7XHLUm6x3oBVCntpO03kd_1IT6kIuW8",
  authDomain: "client-panel-react-jb9.firebaseapp.com",
  databaseURL: "https://client-panel-react-jb9.firebaseio.com",
  projectId: "client-panel-react-jb9",
  storageBucket: "client-panel-react-jb9.appspot.com",
  messagingSenderId: "885180527516"
};

//React Redux Firebase Config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true //Firestore for profile instead of Real Time DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Get settings from localStorage
if (localStorage.getItem("settings") == null) {
  const defaultSettings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false
  };

  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

const REDUX__DEVTOOLS__EXTENSION =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create store
const store =
  window.location.port >= 3000 &&
  window.navigator.userAgent.indexOf("Chrome") >= 0
    ? createStoreWithFirebase(
        rootReducer,
        initialState,
        compose(
          reactReduxFirebase(firebase),
          REDUX__DEVTOOLS__EXTENSION
        )
      )
    : createStoreWithFirebase(
        rootReducer,
        initialState,
        compose(reactReduxFirebase(firebase))
      );

export default store;
