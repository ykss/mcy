import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const getMcyMemberApi = async () => {
  try {
    // mcyMember 컬렉션의 memberInfo 문서 참조
    const docRef = doc(db, "mcyMember", "memberInfo")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서 데이터 가져오기
      const memberInfo = docSnap.data().mcyMember
      return memberInfo ? memberInfo.sort((a, b) => Number(a.history) - Number(b.history)) : {}
    } else {
      console.log("No such document!")
      return {}
    }
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
    return {}
  }
}

export { getMcyMemberApi }
