//import * as firebase from 'firebase/app';
//var firebase = require('firebase');
//var firebase = require('firebase');


import firebase from 'firebase/app'
import 'firebase/storage'
//import { createStore, combineReducers, compose } from 'redux'
//import {ReactReduxFirebaseProvider,    firebaseReducer  } from 'react-redux-firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDGBIeksxfTZmvdsZsEuastiOeR2m559mI",
    authDomain: "galeria-react-abf4d.firebaseapp.com",
    projectId: "galeria-react-abf4d",
    storageBucket: "galeria-react-abf4d.appspot.com",
    messagingSenderId: "391968572871",
    appId: "1:391968572871:web:6fa57ad17af420e42805e2",
    measurementId: "G-JDP8XJFGYZ"
  };
  
  //var app = firebase.initializeApp(firebaseConfig);
  


  const fireApp = firebase.initializeApp(firebaseConfig);
//  console.log(fireapp);
//  const db = app.firestore();

  export default fireApp;
