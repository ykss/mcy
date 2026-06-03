import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { Settings } from "lucide-react"
import { McyMember } from "../../types/McyMember"

export const CELL_COLORS = ["#DCD5F7", "#F6E4A4", "#F9C5C8", "#C8DDF4", "#C4E6CC", "#E8D5F7"]

interface Props {
  cell: McyMember
  index: number
  isExpanded: boolean
  onToggle: () => void
  onSettingsClick?: () => void
  children?: React.ReactNode
}

const CellCard = ({ cell, index, isExpanded, onToggle, onSettingsClick, children }: Props) => {
  const color = cell.color || CELL_COLORS[index % CELL_COLORS.length]
  const memberCount = cell.members?.length ?? 0

  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <div
        className="flex items-center gap-3 px-4 py-4 cursor-pointer select-none"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      >
        <div
          className="w-5 h-5 rounded-md border-2 border-white/70 bg-white/30 shrink-0"
          onClick={e => e.stopPropagation()}
        />
        <span className="flex-1 font-bold text-[17px] text-gray-800">
          {cell.cell}
          <span className="ml-2 text-sm font-semibold text-[#5B4FCF]">{memberCount}명</span>
        </span>
        <button
          className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0"
          onClick={e => {
            e.stopPropagation()
            onSettingsClick?.()
          }}
        >
          <Settings className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
        </button>
        {isExpanded ? (
          <ChevronDownIcon className="w-5 h-5 text-gray-600 shrink-0" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-gray-600 shrink-0" />
        )}
      </div>

      {isExpanded && (
        <div className="bg-white rounded-b-2xl border-x border-b border-black/5">
          {children}
        </div>
      )}
    </div>
  )
}

export default CellCard
