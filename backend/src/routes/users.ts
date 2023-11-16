import { Request, Response, Router } from 'express';
import admin from 'firebase-admin';

const router: Router = Router();

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

router.post('/updateUserDetails', async (req: Request, res: Response) => {
  console.log('IN updateUserDetails');
  try {
    // TODO add server side validation for the fields, preferably use a validation library (for example Joi)
    const phone = req.body.phone;
    console.log("🚀 ~~ phone:", phone)
    console.log("🚀 ~ ~ req.body:", req.body)
    // TODO send to firestore
    
    res.status(200).json({message: "Document updated successfully"});
  } catch (error) {
    console.log("🚀 ~ file: users.ts:30 ~ router.post ~ error:", error)
    res.status(500).json({message: "Error updating document: ", error});
  }
});

export default router;
