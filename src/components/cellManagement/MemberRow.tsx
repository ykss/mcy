import { PencilIcon } from "@heroicons/react/24/outline"
import { CellMember, MemberRole } from "../../types/CellMember"

interface Props {
  member: CellMember
  onEditClick?: () => void
}

const ROLE_STYLES: Record<MemberRole, string> = {
  대표리더: "bg-[#FFCECE] text-[#C45050]",
  리더: "bg-[#DCD5F7] text-[#5B4FCF]",
  셀원: "bg-[#F0F0F0] text-gray-500",
  임원: "bg-[#C4E6CC] text-[#2E7D32]",
}

const MemberRow = ({ member, onEditClick }: Props) => {
  const initial = member.name[0]

  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-5 h-5 rounded-md border-[1.5px] border-gray-200 shrink-0" />
      <div className="w-9 h-9 rounded-full bg-[#E8E8E8] flex items-center justify-center shrink-0">
        <span className="text-sm font-semibold text-gray-600">{initial}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-[15px]">{member.name}</p>
        <div className="flex gap-1 mt-0.5 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_STYLES[member.role]}`}
          >
            {member.role}
          </span>
          {member.position && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#F0F0F0] text-gray-500">
              {member.position}
            </span>
          )}
        </div>
      </div>
      <button
        className="w-8 h-8 flex items-center justify-center shrink-0 text-gray-300 active:text-gray-500 transition-colors"
        onClick={onEditClick}
      >
        <PencilIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default MemberRow
