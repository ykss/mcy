import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase"

const McyNewsApi = async () => {
  try {
    // 특정 문서(NewsList)를 가져오기
    const docRef = doc(db, "news", "NewsList")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서에서 list 배열을 가져오기
      const newsList = docSnap.data().list
      // entries 배열을 각 인덱스의 date를 기준으로 내림차순 정렬
      return newsList ? newsList.sort((a, b) => new Date(b.date) - new Date(a.date)) : []
    } else {
      console.log("No such document!")
      return []
    }
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
  }
}
// 파이어 베이스 저장
const handleSave = async (selectedDateInfo, setTextValue, textValue, fetchData) => {
  try {
    const dateString = selectedDateInfo // 날짜를 문자열로 변환
    const docRef = doc(db, "news", "NewsList")

    // 문서가 존재하는지 확인
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // 문서가 존재하면 기존 데이터에 새로운 데이터를 추가
      await setDoc(
        docRef,
        {
          list: arrayUnion({
            date: dateString,
            content: textValue,
          }),
        },
        { merge: true },
      )
    } else {
      // 문서가 존재하지 않으면 새로 생성
      await setDoc(docRef, {
        list: [
          {
            date: dateString,
            content: textValue,
          },
        ],
      })
    }
    alert("Data saved successfully!")
    setTextValue("")
    fetchData()
  } catch (e) {
    console.error("Error saving document: ", e)
    alert("Error saving data.")
  }
}

// 파이어 베이스 수정
const handleUpdate = async (selectedDateInfo, textValue, fetchData) => {
  try {
    if (selectedDateInfo) {
      // selectedDateInfo가 있으면 기존 문서 가져오기
      const docRef = doc(db, "news", "NewsList")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const list = docSnap.data().list // docRef 문서에서 entries 필드를 가져옵니다

        // 주어진 날짜에 해당하는 인덱스 값 찾기
        const entryIndex = list.findIndex(entry => entry.date === selectedDateInfo)
        /* 메서드는 배열의 요소를 순회하면서 주어진 조건에 맞는 첫 번째 요소의 인덱스를 반환합니다.
        조건에 맞는 요소가 없으면 -1을 반환합니다.*/

        //entryIndex의 유효성 검사
        if (entryIndex !== -1) {
          // 해당 날짜의 content 업데이트
          list[entryIndex].content = textValue

          // 업데이트된 배열을 Firestore에 저장
          await updateDoc(docRef, { list })
          alert("Data updated successfully!")
        } else {
          alert("No matching date found.")
        }

        fetchData()
      } else {
        alert("Document does not exist.")
      }
    } else {
      alert("No document found to update.")
    }
  } catch (e) {
    console.error("Error updating document: ", e)
    alert("Error updating data.")
  }
}

export { McyNewsApi, handleUpdate, handleSave }
