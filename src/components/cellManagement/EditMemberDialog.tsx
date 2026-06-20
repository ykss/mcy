import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { updateMemberApi, deleteMemberApi, moveMembersApi } from "../../api/mcyMemberApi"
import { McyMember } from "../../types/McyMember"
import { CellMember, MemberRole } from "../../types/CellMember"

interface Props {
  open: boolean
  onClose: () => void
  member: CellMember | null
  cellName: string
  cells: McyMember[]
  onSuccess: () => void
}

const ROLES: MemberRole[] = ["임원", "리더", "셀원"]

const ROLE_ACTIVE_STYLE: Record<MemberRole, { bg: string; text: string }> = {
  임원: { bg: "#FFCECE", text: "#C45050" },
  리더: { bg: "#DCD5F7", text: "#5B4FCF" },
  셀원: { bg: "#C4E6CC", text: "#2E7D32" },
}

const DEFAULT_POSITIONS = ["회장", "부회장", "총무", "서기", "대표리더"]

const EditMemberDialog = ({ open, onClose, member, cellName, cells, onSuccess }: Props) => {
  const [selectedRoles, setSelectedRoles] = useState<Set<MemberRole>>(new Set())
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)
  const [newPosition, setNewPosition] = useState("")
  const [addingPosition, setAddingPosition] = useState(false)
  const [selectedCell, setSelectedCell] = useState(cellName)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (member) {
      setSelectedRoles(new Set(member.roles ?? []))
      setSelectedPosition(member.position ?? null)
      setSelectedCell(cellName)
    }
  }, [member, cellName])

  const toggleRole = (role: MemberRole) => {
    setSelectedRoles(prev => {
      const next = new Set(prev)
      if (next.has(role)) {
        next.delete(role)
        if (role === "임원") setSelectedPosition(null)
      } else {
        next.add(role)
      }
      return next
    })
  }

  const handleAddPosition = () => {
    const trimmed = newPosition.trim()
    if (!trimmed || positions.includes(trimmed)) return
    setPositions(prev => [...prev, trimmed])
    setSelectedPosition(trimmed)
    setNewPosition("")
    setAddingPosition(false)
  }

  const handleDeletePosition = (pos: string) => {
    setPositions(prev => prev.filter(p => p !== pos))
    if (selectedPosition === pos) setSelectedPosition(null)
  }

  const handleSave = async () => {
    if (!member) return
    if (selectedRoles.size === 0) {
      toast.error("역할을 선택해주세요.")
      return
    }
    setLoading(true)
    try {
      if (selectedCell !== cellName) {
        await moveMembersApi(cellName, selectedCell, [member.name])
      }
      await updateMemberApi(selectedCell, member.name, {
        roles: Array.from(selectedRoles),
        position: selectedPosition ?? undefined,
      })
      toast.success("수정됐습니다.")
      onSuccess()
      onClose()
    } catch {
      toast.error("수정에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!member) return
    setLoading(true)
    try {
      await deleteMemberApi(cellName, member.name)
      toast.success("멤버가 삭제됐습니다.")
      onSuccess()
      onClose()
    } catch {
      toast.error("삭제에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  if (!open || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full bg-[#FFFCF6] rounded-t-3xl px-5 pt-4 pb-10 flex flex-col gap-6 max-h-[90dvh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-gray-800">{member.name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">역할과 직책을 수정하세요</p>
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-200 bg-red-50"
            onClick={handleDelete}
            disabled={loading}
          >
            삭제
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700">역할 (여러 개 선택 가능)</label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map(role => {
              const active = selectedRoles.has(role)
              const style = ROLE_ACTIVE_STYLE[role]
              return (
                <button
                  key={role}
                  className="py-4 rounded-2xl text-[15px] font-bold border-2 transition-all"
                  style={{
                    backgroundColor: active ? style.bg : "#FFFFFF",
                    color: active ? style.text : "#374151",
                    borderColor: active ? "#5B4FCF" : "transparent",
                  }}
                  onClick={() => toggleRole(role)}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        {selectedRoles.has("임원") && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700">
              임원 직책 <span className="font-normal text-gray-400">· 하나 선택</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {positions.map(pos => (
                <div
                  key={pos}
                  style={{
                    backgroundColor: selectedPosition === pos ? "#DCD5F7" : "#FFFFFF",
                    borderColor: selectedPosition === pos ? "#5B4FCF" : "#E5E7EB",
                  }}
                  className="inline-flex items-center gap-4 pl-4 pr-3 py-2.5 rounded-xl text-sm font-medium border transition-all"
                >
                  <div
                    style={{ color: selectedPosition === pos ? "#5B4FCF" : "#374151" }}
                    className="cursor-pointer"
                    onClick={() => setSelectedPosition(prev => (prev === pos ? null : pos))}
                  >
                    {pos}
                  </div>
                  <div
                    style={{ color: selectedPosition === pos ? "#9B8FE8" : "#D1D5DB" }}
                    className="text-base hover:text-gray-500 transition-colors cursor-pointer"
                    onClick={() => handleDeletePosition(pos)}
                  >
                    ✕
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-dashed border-[#9B8FE8] text-[#5B4FCF] shrink-0"
                onClick={() => setAddingPosition(prev => !prev)}
              >
                + 직책 추가
              </button>
              {addingPosition && (
                <>
                  <input
                    autoFocus
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm border-2 border-[#5B4FCF] outline-none bg-white placeholder:text-gray-300"
                    placeholder="새 직책"
                    value={newPosition}
                    onChange={e => setNewPosition(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAddPosition()}
                  />
                  <button
                    className="px-4 py-2.5 rounded-xl text-sm font-bold bg-[#5B4FCF] text-white shrink-0"
                    onClick={handleAddPosition}
                  >
                    추가
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">소속 셀</label>
          <select
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-[15px] outline-none text-gray-800 appearance-none"
            value={selectedCell}
            onChange={e => setSelectedCell(e.target.value)}
          >
            {cells.map(c => (
              <option key={c.cell} value={c.cell}>
                {c.cell}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[16px] disabled:opacity-50"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  )
}

export default EditMemberDialog
