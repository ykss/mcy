import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const getMcyMasterIdApi = async () => {
  try {
    // 'masterAccount' 컬렉션의 'masterInfo' 문서 참조
    const masterInfoDocRef = doc(db, "masterAccount", "masterInfo")

    // 문서 데이터 가져오기
    const masterInfoDocSnap = await getDoc(masterInfoDocRef)

    // 문서가 존재하면 데이터를 반환
    return masterInfoDocSnap.data()
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
  }
}

export { getMcyMasterIdApi }
