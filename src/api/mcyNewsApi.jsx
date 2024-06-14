import { doc, collection, getDocs, query, orderBy, updateDoc, addDoc } from "firebase/firestore"
import { db } from "../firebase"

const McyNewsApi = async () => {
  try {
    // timestamp 필드를 기준으로 내림차순으로 문서를 정렬하는 쿼리 생성
    const mcyNewsQuery = query(collection(db, "news"), orderBy("timestamp", "desc"))
    const newsSnapShot = await getDocs(mcyNewsQuery)

    const newsList = newsSnapShot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))

    return newsList
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
  }
}
// 파이어 베이스 저장
const handleSave = async (selectedDateInfo, setTextValue, textValue, fetchData) => {
  try {
    const dateString = selectedDateInfo // 날짜를 문자열로 변환
    await addDoc(collection(db, "news"), {
      timestamp: new Date(), // 시간순서대로 정렬하기 위해 추가
      date: dateString,
      content: textValue,
    })
    alert("Data saved successfully!")
    setTextValue("")
    fetchData()
  } catch (e) {
    console.error("Error adding document: ", e)
    alert("Error saving data.")
  }
}
// 파이어 베이스 수정
const handleUpdate = async (selectedDocId, textValue, fetchData) => {
  try {
    if (selectedDocId) {
      // 기존 문서 업데이트
      const docRef = doc(db, "news", selectedDocId)
      await updateDoc(docRef, {
        content: textValue,
      })
      alert("Data updated successfully!")
      fetchData()
    } else {
      alert("No document found to update.")
    }
  } catch (e) {
    console.error("Error updating document: ", e)
    alert("Error updating data.")
  }
}

export { McyNewsApi, handleUpdate, handleSave }
