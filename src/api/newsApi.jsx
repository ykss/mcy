import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const getMcyNewsApi = async () => {
  try {
    const mcyNewsCollection = collection(db, "news")
    const newsSnapShot = await getDocs(mcyNewsCollection)

    const membersList = newsSnapShot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    return membersList
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

export { getMcyNewsApi }
