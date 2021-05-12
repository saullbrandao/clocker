import { firebaseServer } from "../../config/firebase/server"

const db = firebaseServer.firestore()
const profile = db.collection('profiles')

const getProfile = async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')

  try {

    const { user_id } = await firebaseServer.auth().verifyIdToken(token)

    const snapshot = await profile
      .where('userId', '==', user_id)
      .get()

    const docs = snapshot.docs[0].data()

    return res.status(200).json(docs)
  } catch (error) {
    console.log('FB ERROR:', error)
    res.status(401).end()
  }
}

const setProfile = async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')

  try {

    const { user_id } = await firebaseServer.auth().verifyIdToken(token)

    profile.doc(req.body.username).set({
      username: req.body.username,
      userId: user_id,
    })

    res.status(200).end()
  } catch (error) {
    res.status(401).end()
  }
}

const methods = {
  POST: setProfile,
  GET: getProfile,
}

export default async (req, res) => methods[req.method]
  ? methods[req.method](req, res)
  : res.status(405)
