import firebase from 'firebase'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDviuNLO5te9345137aB6Q1zWIz-AzAmxo',
  authDomain: 'instagram-clone-276aa.firebaseapp.com',
  projectId: 'instagram-clone-276aa',
  storageBucket: 'instagram-clone-276aa.appspot.com',
  messagingSenderId: '1076905192744',
  appId: '1:1076905192744:web:da4e899ca31a7c34dc341d',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
