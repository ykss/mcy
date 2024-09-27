import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"


// MCY member 불러오기
const getAttendanceApi = async selectedDateInfo => {

  try {
    // 특정 문서를 가져오기
    const docRef = doc(db, "attendanceData", selectedDateInfo)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서에서 list 배열을 가져오기
      const checkList = docSnap.data()


      return checkList
    } else {
      console.log("No such document!")
      return []
    }

  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
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
    throw error
  }
}
export { getAttendanceApi, updateAttendanceApi }
