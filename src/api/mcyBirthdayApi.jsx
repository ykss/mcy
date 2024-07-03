import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const McyBirthdayApi = async () => {
  const birthdayCollection = collection(db, "birthDay")

  const birthdaySnapShot = await getDocs(birthdayCollection)

  const birthDayList = birthdaySnapShot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))

  return birthDayList
}
export { McyBirthdayApi }
