import dayjs from "dayjs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { updateCellApi, deleteCellApi } from "../../api/mcyMemberApi"
import { renameCellInAttendanceApi } from "../../api/mcyAttendanceDataApi"
import { McyMember } from "../../types/McyMember"
import { CELL_COLORS } from "./CellCard"

interface Props {
  open: boolean
  onClose: () => void
  cell: McyMember | null
  cells: McyMember[]
  onSuccess: () => void
}

const EditCellDialog = ({ open, onClose, cell, cells, onSuccess }: Props) => {
  const [cellName, setCellName] = useState("")
  const [selectedColor, setSelectedColor] = useState(CELL_COLORS[0])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cell) {
      setCellName(cell.cell)
      setSelectedColor(cell.color || CELL_COLORS[0])
    }
  }, [cell])

  const handleSave = async () => {
    if (!cell) return
    if (!cellName.trim()) {
      toast.error("셀 이름을 입력해주세요.")
      return
    }
    setLoading(true)
    const trimmedName = cellName.trim()
    if (trimmedName !== cell.cell && cells.some(c => c.cell === trimmedName)) {
      toast.error("이미 존재하는 셀 이름입니다.")
      setLoading(false)
      return
    }
    try {
      await updateCellApi(cell.cell, { cell: trimmedName, color: selectedColor })
      if (trimmedName !== cell.cell) {
        const currentSunday = dayjs().day(0).format("YYYY-MM-DD")
        await renameCellInAttendanceApi(cell.cell, trimmedName, currentSunday)
      }
      toast.success("셀이 수정됐습니다.")
      onSuccess()
      onClose()
    } catch {
      toast.error("수정에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!cell) return
    setLoading(true)
    try {
      await deleteCellApi(cell.cell)
      toast.success("셀이 삭제됐습니다.")
      onSuccess()
      onClose()
    } catch {
      toast.error("삭제에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  if (!open || !cell) return null

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
          <h2 className="text-[22px] font-bold text-gray-800">셀 수정</h2>
          <p className="text-sm text-gray-400 mt-0.5">셀 이름과 색을 정하세요</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">셀 이름</label>
          <input
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-[15px] outline-none focus:border-[#5B4FCF] transition-colors"
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

        <div className="flex items-center gap-3 mt-2">
          <button
            className="text-red-400 font-semibold text-[15px] px-4 py-4 disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            삭제
          </button>
          <button
            className="flex-1 bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[16px] disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCellDialog
