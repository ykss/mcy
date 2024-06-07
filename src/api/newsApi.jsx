import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const getMcyNewsApi = async () => {
  try {
    const mcyNewsCollection = collection(db, "news")
    const newsSnapShot = await getDocs(mcyNewsCollection)

    const newsList = newsSnapShot.docs.map(doc => ({
      ...doc.data(),
    }))
    return newsList
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

export { getMcyNewsApi }
