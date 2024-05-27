import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const getMcyMemberApi = async () => {
  const membersCollection = collection(db, "mcyMember")

  const membersSnapShot = await getDocs(membersCollection)

  const membersList = membersSnapShot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
  return membersList
}

export { getMcyMemberApi }
