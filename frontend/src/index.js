import firebase from 'firebase/compat/app'
import { getAnalytics } from 'firebase/analytics'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: 'AIzaSyBOYVQZkD49hYqnLEYZxGJM7QI1V0-s4rk',
  authDomain: 'phone-auth-12.firebaseapp.com',
  projectId: 'phone-auth-12',
  storageBucket: 'phone-auth-12.appspot.com',
  messagingSenderId: '501699185310',
  appId: '1:501699185310:web:0b85add1f990d32217898f',
  measurementId: 'G-QJWHNVEF4B',
}

const app = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const ui = new firebaseui.auth.AuthUI(firebase.auth())

const uiConfig = {
  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  signInSuccessUrl: '/profilepage',
  // callbacks: {
  //   signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //     window.location.pathname = '/userdetails'
  //     return false
  //   },
  // },
}

ui.start('#firebaseui-auth-container', uiConfig)
