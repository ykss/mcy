import { useEffect, useState } from "react"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import { McyMember } from "../types/McyMember"
import { CellMember } from "../types/CellMember"

const useCellManagement = () => {
  const [cells, setCells] = useState<McyMember[]>([])
  const [expandedCells, setExpandedCells] = useState<Set<string>>(new Set())
  const [addCellOpen, setAddCellOpen] = useState(false)
  const [addMemberOpen, setAddMemberOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<{ cellName: string; member: CellMember } | null>(null)
  const [editCellTarget, setEditCellTarget] = useState<McyMember | null>(null)
  const [moveOpen, setMoveOpen] = useState(false)
  const [checkedMembers, setCheckedMembers] = useState<Map<string, Set<string>>>(new Map())

  const fetchCells = () => getMcyMemberApi().then(setCells)

  useEffect(() => {
    fetchCells()
  }, [])

  const totalChecked = Array.from(checkedMembers.values()).reduce((acc, s) => acc + s.size, 0)

  const toggleCell = (cellName: string) => {
    setExpandedCells(prev => {
      const next = new Set(prev)
      next.has(cellName) ? next.delete(cellName) : next.add(cellName)
      return next
    })
  }

  const toggleMemberCheck = (cellName: string, memberName: string) => {
    setCheckedMembers(prev => {
      const next = new Map(prev)
      const cellSet = new Set(next.get(cellName) ?? [])
      cellSet.has(memberName) ? cellSet.delete(memberName) : cellSet.add(memberName)
      cellSet.size > 0 ? next.set(cellName, cellSet) : next.delete(cellName)
      return next
    })
  }

  const clearChecked = () => setCheckedMembers(new Map())

  const handleMoveSuccess = () => {
    clearChecked()
    fetchCells()
  }

  return {
    cells,
    expandedCells,
    addCellOpen,
    setAddCellOpen,
    addMemberOpen,
    setAddMemberOpen,
    editTarget,
    setEditTarget,
    editCellTarget,
    setEditCellTarget,
    moveOpen,
    setMoveOpen,
    checkedMembers,
    totalChecked,
    fetchCells,
    toggleCell,
    toggleMemberCheck,
    clearChecked,
    handleMoveSuccess,
  }
}

export default useCellManagement
