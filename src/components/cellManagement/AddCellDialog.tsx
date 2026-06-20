import { useState } from "react"
import toast from "react-hot-toast"
import { addCellApi } from "../../api/mcyMemberApi"
import { McyMember } from "../../types/McyMember"
import { CELL_COLORS } from "./CellCard"

interface Props {
  open: boolean
  onClose: () => void
  cells: McyMember[]
  onSuccess: () => void
}

const AddCellDialog = ({ open, onClose, cells, onSuccess }: Props) => {
  const [cellName, setCellName] = useState("")
  const [selectedColor, setSelectedColor] = useState(CELL_COLORS[0])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    const trimmedName = cellName.trim()
    if (!trimmedName) {
      toast.error("셀 이름을 입력해주세요.")
      return
    }
    if (cells.some(c => c.cell === trimmedName)) {
      toast.error("이미 존재하는 셀 이름입니다.")
      return
    }
    setLoading(true)
    try {
      await addCellApi({ cell: trimmedName, color: selectedColor, members: [], history: "99" })
      toast.success("셀이 추가됐습니다.")
      setCellName("")
      setSelectedColor(CELL_COLORS[0])
      onSuccess()
      onClose()
    } catch {
      toast.error("추가에 실패했습니다.")
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
          <h2 className="text-[22px] font-bold text-gray-800">셀 추가</h2>
          <p className="text-sm text-gray-400 mt-0.5">셀 이름과 색을 정하세요</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">셀 이름</label>
          <input
            className="w-full bg-white border-2 border-[#5B4FCF] rounded-2xl px-4 py-3.5 text-[15px] outline-none placeholder:text-gray-300"
            placeholder="예: 이화승 셀"
            value={cellName}
            onChange={e => setCellName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700">색상</label>
          <div className="flex gap-3">
            {CELL_COLORS.map(color => (
              <button
                key={color}
                className="w-14 h-14 rounded-2xl border-[3px] transition-all"
                style={{
                  backgroundColor: color,
                  borderColor: selectedColor === color ? "#1a1a1a" : "transparent",
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <button
          className="w-full bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[16px] disabled:opacity-50 mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  )
}

export default AddCellDialog
