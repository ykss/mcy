interface AttendanceStatsProps {
  adultCount: number
  memberCount: number
  totalCount: number
}

export const AttendanceStats = ({ adultCount, memberCount, totalCount }: AttendanceStatsProps) => {
  const attendanceRate = totalCount > 0 ? Math.round((memberCount / totalCount) * 100) : 0

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-[#C4E6CC]">
          <p className="text-xs font-medium text-[#2A6049]">출석</p>
          <p className="text-2xl font-bold text-[#2A6049]">
            {memberCount}<span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-white border border-black/10">
          <p className="text-xs font-medium text-[#6A6157]">기타</p>
          <p className="text-2xl font-bold text-[#2C2722]">
            {adultCount}<span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-[#DCD5F7]">
          <p className="text-xs font-medium text-[#5A3E8A]">총인원</p>
          <p className="text-2xl font-bold text-[#5A3E8A]">
            {totalCount}<span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-black/10">
        <p className="text-sm font-medium text-[#2C2722] shrink-0">출석률</p>
        <div className="flex-1 h-2.5 bg-black/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#5BAD7F]" style={{ width: `${attendanceRate}%` }} />
        </div>
        <p className="text-sm font-bold text-[#5BAD7F] shrink-0">{attendanceRate}%</p>
      </div>
    </div>
  )
}
