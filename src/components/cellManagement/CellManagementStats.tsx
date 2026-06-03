import { McyMember } from "../../types/McyMember"

interface Props {
  cells: McyMember[]
}

const CellManagementStats = ({ cells }: Props) => {
  const totalMembers = cells.reduce((acc, cell) => acc + (cell.members?.length ?? 0), 0)
  const cellCount = cells.length
  const leaderCount = cells.reduce(
    (acc, cell) =>
      acc + (cell.members?.filter(m => m.roles?.includes("리더")).length ?? 0),
    0,
  )
  const imwonCount = cells.reduce(
    (acc, cell) => acc + (cell.members?.filter(m => m.roles?.includes("임원")).length ?? 0),
    0,
  )

  const stats = [
    { label: "전체 인원", value: totalMembers },
    { label: "셀", value: cellCount },
    { label: "리더", value: leaderCount },
    { label: "임원", value: imwonCount },
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white rounded-2xl py-3 px-2 flex flex-col items-center gap-1 border border-black/5"
        >
          <span className="text-[22px] font-bold text-gray-800">{value}</span>
          <span className="text-[11px] text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default CellManagementStats
