import dayjs from "dayjs"
import Layout from "../components/Layout/Layout"
import useFadeIn from "../hooks/useFadeIn"
import useCellManagement from "../hooks/useCellManagement"
import CellManagementStats from "../components/cellManagement/CellManagementStats"
import CellCard from "../components/cellManagement/CellCard"
import MemberRow from "../components/cellManagement/MemberRow"
import AddCellDialog from "../components/cellManagement/AddCellDialog"
import AddMemberDialog from "../components/cellManagement/AddMemberDialog"
import EditMemberDialog from "../components/cellManagement/EditMemberDialog"
import EditCellDialog from "../components/cellManagement/EditCellDialog"
import MoveMembersDialog from "../components/cellManagement/MoveMembersDialog"

const CellManagement = () => {
  const ref = useFadeIn()
  const year = dayjs().year()
  const {
    cells,
    expandedCells,
    addCellOpen, setAddCellOpen,
    addMemberOpen, setAddMemberOpen,
    editTarget, setEditTarget,
    editCellTarget, setEditCellTarget,
    moveOpen, setMoveOpen,
    checkedMembers,
    totalChecked,
    fetchCells,
    toggleCell,
    toggleMemberCheck,
    clearChecked,
    handleMoveSuccess,
  } = useCellManagement()

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
              <button
                className="flex-1 bg-[#5B4FCF] text-white font-bold py-4 rounded-2xl text-[15px]"
                onClick={() => setAddMemberOpen(true)}
              >
                + 멤버 추가
              </button>
              <button
                className="flex-1 bg-white border border-black/10 text-gray-700 font-bold py-4 rounded-2xl text-[15px]"
                onClick={() => setAddCellOpen(true)}
              >
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
                onSettingsClick={() => setEditCellTarget(cell)}
              >
                {(cell.members ?? []).map((member, i) => {
                  const isChecked = checkedMembers.get(cell.cell)?.has(member.name) ?? false
                  return (
                    <div key={member.name}>
                      {i > 0 && <div className="mx-4 border-t border-black/5" />}
                      <MemberRow
                        member={member}
                        checked={isChecked}
                        onCheck={() => toggleMemberCheck(cell.cell, member.name)}
                        onEditClick={() => setEditTarget({ cellName: cell.cell, member })}
                      />
                    </div>
                  )
                })}
              </CellCard>
            ))}
          </div>
        </section>
      </Layout>

      {totalChecked > 0 && (
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-3 bg-[#FFFCF6]/95 backdrop-blur-sm border-t border-black/5 flex items-center gap-3 z-40">
          <div className="flex-1">
            <p className="text-[15px] font-bold text-gray-800">{totalChecked}명 선택됨</p>
            <p className="text-xs text-gray-400">다른 셀로 이동할 수 있어요</p>
          </div>
          <button
            className="px-5 py-3 rounded-2xl bg-white border border-black/10 text-gray-600 font-semibold text-sm"
            onClick={clearChecked}
          >
            취소
          </button>
          <button
            className="px-5 py-3 rounded-2xl bg-[#5B4FCF] text-white font-bold text-sm"
            onClick={() => setMoveOpen(true)}
          >
            이동하기
          </button>
        </div>
      )}

      <AddCellDialog
        open={addCellOpen}
        onClose={() => setAddCellOpen(false)}
        onSuccess={fetchCells}
      />
      <AddMemberDialog
        open={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        cells={cells}
        onSuccess={fetchCells}
      />
      <EditMemberDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        member={editTarget?.member ?? null}
        cellName={editTarget?.cellName ?? ""}
        cells={cells}
        onSuccess={fetchCells}
      />
      <EditCellDialog
        open={!!editCellTarget}
        onClose={() => setEditCellTarget(null)}
        cell={editCellTarget}
        onSuccess={fetchCells}
      />
      <MoveMembersDialog
        open={moveOpen}
        onClose={() => setMoveOpen(false)}
        checkedMembers={checkedMembers}
        cells={cells}
        onSuccess={handleMoveSuccess}
      />
    </div>
  )
}

export default CellManagement
