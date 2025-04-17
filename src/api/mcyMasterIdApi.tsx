import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

interface MasterData {
  id: string
  password: string
}

export const getMcyMasterIdApi = async (): Promise<MasterData | undefined> => {
  try {
    const masterInfoDocRef = doc(db, "masterAccount", "masterInfo")

    // 문서 데이터 가져오기
    const masterInfoDocSnap = await getDoc(masterInfoDocRef)

    // 문서가 존재하면 데이터를 반환
    return masterInfoDocSnap.data() as MasterData
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
    return undefined
  }
}
