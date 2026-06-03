import { CellData } from "../../types/CheckedMember"

interface CellListProps {
  cellData: CellData[]
  maxRows: number
}

const CELL_COLORS = [
  "#DCD5F7",
  "#F6E4A4",
  "#F9C5C8",
  "#C4E6CC",
  "#C8DDF4",
  "#E8D5F7",
  "#F6CCD0",
]

export const CellList = ({ cellData }: CellListProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-[#2C2722]">셀별 출석</p>
        <p className="text-xs text-[#9B9B9B]">{cellData.length}개 셀</p>
      </div>

      {cellData.map((cell, index) => {
        const isSaroyak = !cell.cell.endsWith(" 셀")
        const leaderName = isSaroyak ? null : cell.cell.replace(" 셀", "")
        const leaderInitial = leaderName ? leaderName[0] : "+"
        const color = CELL_COLORS[index % CELL_COLORS.length]
        const accentStyle = isSaroyak
          ? { background: `repeating-linear-gradient(45deg, #F9C5C8, #F9C5C8 4px, #fff 4px, #fff 8px)` }
          : { backgroundColor: color }

        return (
          <div key={cell.cell + index} className="w-full bg-white rounded-2xl overflow-hidden border border-black/10">
            <div className="flex">
              <div className="w-1.5 shrink-0" style={accentStyle} />
              <div className="flex-1 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 text-[#2C2722]"
                    style={{ backgroundColor: color }}
                  >
                    {leaderInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#2C2722] text-sm">{cell.cell}</p>
                    <p className="text-xs text-[#9B9B9B]">
                      {isSaroyak ? "MINISTRY" : `LED BY ${leaderName}`}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 text-[#2C2722]"
                    style={{ backgroundColor: color }}
                  >
                    <span className="font-bold text-sm leading-none">{cell.checkedMember.length}</span>
                    <span className="text-[10px] leading-tight">명</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cell.checkedMember.map((member, i) => {
                    const isLeader = member === leaderName
                    return (
                      <span
                        key={member + i}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap text-[#2C2722] ${
                          isLeader ? "" : "border border-black/15"
                        }`}
                        style={isLeader ? { backgroundColor: color } : {}}
                      >
                        {isLeader ? `★ ${member}` : member}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
