import { Request, Response, Router } from 'express'
import admin from 'firebase-admin'

let serviceAccountKey
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
}

const router: Router = Router()

// TODO extract this to a place that can be used for the FE and BE alike?
const firebaseConfig = {
  apiKey: 'AIzaSyBOYVQZkD49hYqnLEYZxGJM7QI1V0-s4rk',
  authDomain: 'phone-auth-12.firebaseapp.com',
  projectId: 'phone-auth-12',
  storageBucket: 'phone-auth-12.appspot.com',
  messagingSenderId: '501699185310',
  appId: '1:501699185310:web:0b85add1f990d32217898f',
  measurementId: 'G-QJWHNVEF4B',
  credential: admin.credential.cert(serviceAccountKey),
}

admin.initializeApp(firebaseConfig)

const db = admin.firestore()

router.post('/updateUserDetails', async (req: Request, res: Response) => {
  try {
    // TODO add server side validation for the fields, preferably use a validation library (for example Joi)
    const { name, email, phone } = req.body
    const userRef = db.collection('users').doc(phone)
    const doc = await userRef.get()

    if (!doc.exists) {
      await db.collection('users').doc(phone).set({ name, email })
    } else {
      await db.collection('users').doc(phone).update({ name, email })
    }

    res.status(200).json({ message: 'Document updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating document: ', error })
  }
})

router.get('/getUserDetails/:phone', async (req, res) => {
  try {
    const savedUser = await db.collection('users').doc(req.params.phone).get()
    if (savedUser.exists) {
      res.status(200).json(savedUser.data())
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data: ', error })
  }
})

export default router
