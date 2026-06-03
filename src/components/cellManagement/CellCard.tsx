import { Settings, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl bg-white/50 text-gray-600 shrink-0 hover:bg-white/70"
          onClick={e => {
            e.stopPropagation()
            onSettingsClick?.()
          }}
        >
          <Settings strokeWidth={1.5} />
        </Button>
        {isExpanded ? (
          <ChevronDown className="size-5 text-gray-600 shrink-0" />
        ) : (
          <ChevronRight className="size-5 text-gray-600 shrink-0" />
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
