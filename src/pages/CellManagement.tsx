import dayjs from "dayjs"
import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import useFadeIn from "../hooks/useFadeIn"
import { McyMember } from "../types/McyMember"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import CellManagementStats from "../components/cellManagement/CellManagementStats"
import CellCard from "../components/cellManagement/CellCard"
import MemberRow from "../components/cellManagement/MemberRow"

const CellManagement = () => {
  const ref = useFadeIn()
  const year = dayjs().year()
  const [cells, setCells] = useState<McyMember[]>([])
  const [expandedCells, setExpandedCells] = useState<Set<string>>(new Set())

  useEffect(() => {
    getMcyMemberApi().then(setCells)
  }, [])

  const toggleCell = (cellName: string) => {
    setExpandedCells(prev => {
      const next = new Set(prev)
      next.has(cellName) ? next.delete(cellName) : next.add(cellName)
      return next
    })
  }

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Layout>
        <section ref={ref} className="w-full flex flex-col px-5 pt-6 pb-32 gap-6">
          <div data-fade data-delay="0" className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400 font-medium tracking-widest">
                셀 편성 · ORGANIZE
              </span>
              <h1 className="text-[28px] font-bold tracking-tight text-gray-800">청년부 명단</h1>
            </div>
            <span className="mt-1 px-4 py-1.5 rounded-full bg-[#5B4FCF] text-white text-sm font-semibold">
              {year} 편성
            </span>
          </div>

          <div data-fade data-delay="100">
            <CellManagementStats cells={cells} />
          </div>

          <div data-fade data-delay="200" className="flex flex-col gap-2">
            <div className="flex gap-3">
              <button className="flex-1 bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[15px]">
                + 멤버 추가
              </button>
              <button className="flex-1 bg-white border border-black/10 text-gray-700 font-bold py-4 rounded-2xl text-[15px]">
                + 셀 추가
              </button>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              셀 헤더를 탭하면 접기/펼치기. 멤버를 체크해 다른 셀로 한꺼번에 옮기고, 이름을 탭하면
              역할·직책을 수정해요. 임원을 켜면 직책(회장·총무...)을 고를 수 있습니다.
            </p>
          </div>

          <div data-fade data-delay="300" className="flex flex-col gap-3">
            {cells.map((cell, index) => (
              <CellCard
                key={cell.cell}
                cell={cell}
                index={index}
                isExpanded={expandedCells.has(cell.cell)}
                onToggle={() => toggleCell(cell.cell)}
              >
                {(cell.members ?? []).map((member, i) => (
                  <div key={member.name}>
                    {i > 0 && <div className="mx-4 border-t border-black/5" />}
                    <MemberRow member={member} />
                  </div>
                ))}
              </CellCard>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default CellManagement
