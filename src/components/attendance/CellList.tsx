import { CellData } from "../../types/CheckedMember"

interface CellListProps {
  cellData: CellData[]
  maxRows: number
}

export const CellList = ({ cellData, maxRows }: CellListProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {cellData.map((cell, index) => (
        <div key={cell.cell + index} className="w-full box-border flex border border-solid border-black" style={{ height: `${Math.max(80, maxRows * 40)}px` }}>
          <div className="w-[30%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-r border-solid border-black">{cell.cell}</div>
          <div className="w-[55%] px-3 flex flex-wrap items-center gap-y-2 text-[12px] box-border py-3">
            {cell.checkedMember.length > 0 &&
              cell.checkedMember.map((member, index) => (
                <div key={member + index} className="w-1/4 flex justify-center items-center">
                  {member}
                </div>
              ))}
          </div>
          <div className="w-[15%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-l border-solid border-black">{cell.checkedMember.length}</div>
        </div>
      ))}
    </div>
  )
}
