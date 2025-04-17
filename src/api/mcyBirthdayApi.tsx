import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { BirthdayInfo } from "../types/BirthdayInfo"

const McyBirthdayApi = async (): Promise<BirthdayInfo[]> => {
  try {
    // 특정 문서(BirthDayList)를 가져오기
    const docRef = doc(db, "birthDay", "BirthDayList")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서에서 birthDayInfo 배열을 가져오기
      const birthdayList = docSnap.data().birthDayInfo
      return birthdayList ? birthdayList : []
    } else {
      console.log("No such document!")
      return []
    }
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
    return []
  }
}

export { McyBirthdayApi, type BirthdayInfo }
