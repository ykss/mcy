
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const McyBirthdayApi = async () => {
  try {
    // 특정 문서(BirthDayList)를 가져오기
    const docRef = doc(db, "birthDay", "BirthDayList")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서에서 birthDayInfo 배열을 가져오기
      const newsList = docSnap.data().birthDayInfo
      return newsList ? newsList : []
    } else {
      console.log("No such document!")
      return []
    }
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
  }
}
export { McyBirthdayApi }
