interface AttendanceStatsProps {
  adultCount: number
  memberCount: number
  totalCount: number
}

export const AttendanceStats = ({ adultCount, memberCount, totalCount }: AttendanceStatsProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-[#C4E6CC]">
          <p className="text-xs font-medium text-[#2A6049]">출석</p>
          <p className="text-2xl font-bold text-[#2A6049]">
            {memberCount}
            <span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-white border border-black/10">
          <p className="text-xs font-medium text-[#6A6157]">기타</p>
          <p className="text-2xl font-bold text-[#2C2722]">
            {adultCount}
            <span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-[#DCD5F7]">
          <p className="text-xs font-medium text-[#5A3E8A]">총인원</p>
          <p className="text-2xl font-bold text-[#5A3E8A]">
            {totalCount}
            <span className="text-sm font-medium ml-0.5">명</span>
          </p>
        </div>
      </div>
    </div>
  )
}
