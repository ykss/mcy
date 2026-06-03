import { Pencil } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { CellMember, MemberRole } from "../../types/CellMember"

interface Props {
  member: CellMember
  checked?: boolean
  onCheck?: () => void
  onEditClick?: () => void
}

const ROLE_STYLES: Record<MemberRole, string> = {
  리더: "bg-[#DCD5F7] text-[#5B4FCF]",
  셀원: "bg-[#F0F0F0] text-gray-500",
  임원: "bg-[#C4E6CC] text-[#2E7D32]",
}

const MemberRow = ({ member, checked = false, onCheck, onEditClick }: Props) => {
  const initial = member.name[0]

  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <Checkbox
        checked={checked}
        onCheckedChange={() => onCheck?.()}
        className="rounded-lg border-gray-300 data-[state=checked]:bg-[#5B4FCF] data-[state=checked]:border-[#5B4FCF]"
      />
      <div className="w-10 h-10 rounded-2xl bg-[#E4DDD5] flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-gray-600">{initial}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-[17px] leading-tight">{member.name}</p>
        <div className="flex gap-1 mt-1 flex-wrap">
          {member.position && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFCECE] text-[#C45050]">
              {member.position}
            </span>
          )}
          {(member.roles ?? []).map(role => (
            <span
              key={role}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_STYLES[role]}`}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="shrink-0 text-gray-400" onClick={onEditClick}>
        <Pencil />
      </Button>
    </div>
  )
}

export default MemberRow
