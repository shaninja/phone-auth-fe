import React, { useEffect } from 'react'

import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'

const PhoneAuth: React.FC = () => {
  useEffect(() => {
    const uiConfig = {
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/profilepage',
    }

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }, [])

  return <div id="firebaseui-auth-container"></div>
}

export default PhoneAuth
