import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { McyMember } from "../types/McyMember"
import { CellMember } from "../types/CellMember"

const COLLECTION = "mcyMember"
const DOCUMENT = "memberInfo"
const FIELD = "mcyMember"

const getMcyMemberApi = async (): Promise<McyMember[]> => {
  try {
    const docRef = doc(db, COLLECTION, DOCUMENT)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const memberInfo = docSnap.data()[FIELD] as McyMember[]
      return memberInfo
        ? memberInfo.sort((a, b) => Number(a.history) - Number(b.history))
        : []
    }
    return []
  } catch (error) {
    console.error("문서 가져오기 에러: ", error)
    return []
  }
}

const saveMcyMembersApi = async (members: McyMember[]): Promise<void> => {
  const docRef = doc(db, COLLECTION, DOCUMENT)
  await updateDoc(docRef, { [FIELD]: members })
}

const addCellApi = async (newCell: McyMember): Promise<void> => {
  const current = await getMcyMemberApi()
  await saveMcyMembersApi([...current, newCell])
}

const updateCellApi = async (
  cellName: string,
  updates: Partial<Pick<McyMember, "cell" | "color">>
): Promise<void> => {
  const current = await getMcyMemberApi()
  const updated = current.map((c) =>
    c.cell === cellName ? { ...c, ...updates } : c
  )
  await saveMcyMembersApi(updated)
}

const deleteCellApi = async (cellName: string): Promise<void> => {
  const current = await getMcyMemberApi()
  await saveMcyMembersApi(current.filter((c) => c.cell !== cellName))
}

const addMemberApi = async (
  cellName: string,
  member: CellMember
): Promise<void> => {
  const current = await getMcyMemberApi()
  const updated = current.map((c) =>
    c.cell === cellName ? { ...c, members: [...c.members, member] } : c
  )
  await saveMcyMembersApi(updated)
}

const updateMemberApi = async (
  cellName: string,
  memberName: string,
  updates: Partial<CellMember>
): Promise<void> => {
  const current = await getMcyMemberApi()
  const updated = current.map((c) =>
    c.cell === cellName
      ? {
          ...c,
          members: c.members.map((m) =>
            m.name === memberName ? { ...m, ...updates } : m
          ),
        }
      : c
  )
  await saveMcyMembersApi(updated)
}

const deleteMemberApi = async (
  cellName: string,
  memberName: string
): Promise<void> => {
  const current = await getMcyMemberApi()
  const updated = current.map((c) =>
    c.cell === cellName
      ? { ...c, members: c.members.filter((m) => m.name !== memberName) }
      : c
  )
  await saveMcyMembersApi(updated)
}

// 체크된 멤버들을 다른 셀로 일괄 이동
const moveMembersApi = async (
  fromCellName: string,
  toCellName: string,
  memberNames: string[]
): Promise<void> => {
  const current = await getMcyMemberApi()
  const nameSet = new Set(memberNames)

  const fromCell = current.find((c) => c.cell === fromCellName)
  if (!fromCell) return

  const movingMembers = fromCell.members.filter((m) => nameSet.has(m.name))

  const updated = current.map((c) => {
    if (c.cell === fromCellName) {
      return { ...c, members: c.members.filter((m) => !nameSet.has(m.name)) }
    }
    if (c.cell === toCellName) {
      return { ...c, members: [...c.members, ...movingMembers] }
    }
    return c
  })

  await saveMcyMembersApi(updated)
}

export {
  getMcyMemberApi,
  saveMcyMembersApi,
  addCellApi,
  updateCellApi,
  deleteCellApi,
  addMemberApi,
  updateMemberApi,
  deleteMemberApi,
  moveMembersApi,
}
