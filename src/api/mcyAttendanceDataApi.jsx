import toast from "react-hot-toast" // react-toastify 대신 react-hot-toast 사용
import { collection, getDocs, getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

// 출석 데이터 불러오기
const getAttendanceApi = async selectedDateInfo => {
  try {
    // 특정 문서(NewsList)를 가져오기
    const docRef = doc(db, "attendanceData", selectedDateInfo)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서에서 list 배열을 가져오기
      const memberList = docSnap.data()
      return memberList
    } else {
      toast.error("출석 데이터가 없습니다.", {
        duration: 1000, // 자동 닫힘 시간 (밀리초), 필요 시 수정 가능
      })
      return []
    }
  } catch (error) {
    toast.error("출석 데이터를 불러오는 중 에러가 발생했습니다.") // 에러 발생 시 toast로 알림
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
    } else {
      await setDoc(docRef, attendanceData)
    }
  } catch (error) {
    toast.error("출석 데이터를 업데이트하는 중 에러가 발생했습니다.") // 에러 발생 시 toast로 알림
    throw error
  }
}

export { getAttendanceApi, updateAttendanceApi }
