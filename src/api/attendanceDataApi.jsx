import { collection, getDocs, getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

// MCY member 불러오기
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

// 출석 데이터 수정하기
const updateAttendanceApi = async (id, attendanceData) => {
  try {
    const docRef = doc(db, "attendanceData", id)
    const docSnap = await getDoc(docRef)

    // 문서가 이미 존재하는 경우 업데이트, 존재하지 않는 경우 새로 생성
    if (docSnap.exists()) {
      await updateDoc(docRef, attendanceData)
      console.log("Document updated successfully!")
    } else {
      await setDoc(docRef, attendanceData)
      console.log("New document created!")
    }
  } catch (error) {
    console.error("Error updating document: ", error)
    throw error // Optionally rethrow the error for handling in the caller function
  }
}
export { getAttendanceApi, updateAttendanceApi }
