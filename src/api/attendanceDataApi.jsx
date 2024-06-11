import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const getAttendanceApi = async () => {
  try {
    const attendanceCollection = collection(db, "attendanceData")
    const attendanceSnapShot = await getDocs(attendanceCollection)

    const attendanceList = attendanceSnapShot.docs.map(doc => ({
      ...doc.data(),
    }))
    return attendanceList
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

export { getAttendanceApi }
