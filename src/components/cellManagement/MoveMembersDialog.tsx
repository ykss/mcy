import toast from "react-hot-toast"
import { useState } from "react"
import { moveMembersApi } from "../../api/mcyMemberApi"
import { McyMember } from "../../types/McyMember"
import { CELL_COLORS } from "./CellCard"

interface Props {
  open: boolean
  onClose: () => void
  checkedMembers: Map<string, Set<string>>
  cells: McyMember[]
  onSuccess: () => void
}

const MoveMembersDialog = ({ open, onClose, checkedMembers, cells, onSuccess }: Props) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const totalCount = Array.from(checkedMembers.values()).reduce((acc, s) => acc + s.size, 0)
  const sourceCells = Array.from(checkedMembers.keys())

  const handleMove = async () => {
    if (!selectedTarget) {
      toast.error("이동할 셀을 선택해주세요.")
      return
    }
    setLoading(true)
    try {
      for (const fromCell of sourceCells) {
        const members = Array.from(checkedMembers.get(fromCell) ?? [])
        if (members.length > 0 && fromCell !== selectedTarget) {
          await moveMembersApi(fromCell, selectedTarget, members)
        }
      }
      toast.success(`${totalCount}명을 이동했습니다.`)
      onSuccess()
      onClose()
    } catch {
      toast.error("이동에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full bg-[#FFFCF6] rounded-t-3xl px-5 pt-4 pb-10 flex flex-col gap-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        <div>
          <h2 className="text-[22px] font-bold text-gray-800">셀 이동</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {totalCount}명을 이동할 셀을 선택하세요
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {cells
            .filter(c => !sourceCells.includes(c.cell))
            .map((c, index) => {
              const color = c.color || CELL_COLORS[index % CELL_COLORS.length]
              const isSelected = selectedTarget === c.cell
              return (
                <button
                  key={c.cell}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: isSelected ? color : "#FFFFFF",
                    borderColor: isSelected ? "#5B4FCF" : "#F0F0F0",
                  }}
                  onClick={() => setSelectedTarget(c.cell)}
                >
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-semibold text-gray-800">{c.cell}</span>
                  <span className="text-sm text-gray-400 ml-auto">
                    {c.members?.length ?? 0}명
                  </span>
                </button>
              )
            })}
        </div>

        <button
          className="w-full bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[16px] disabled:opacity-50"
          onClick={handleMove}
          disabled={loading || !selectedTarget}
        >
          {loading ? "이동 중..." : "이동하기"}
        </button>
      </div>
    </div>
  )
}

export default MoveMembersDialog
