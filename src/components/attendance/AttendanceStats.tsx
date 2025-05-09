interface AttendanceStatsProps {
  adultCount: number
  memberCount: number
  totalCount: number
}

export const AttendanceStats = ({ adultCount, memberCount, totalCount }: AttendanceStatsProps) => {
  return (
    <div className="w-full h-[60px] flex flex-row gap-x-2 justify-between text-[12px]">
      {/* 왼쪽 */}
      <div className="w-[50%] h-full border border-solid border-black">
        {/* 상단 출석 */}
        <div className="w-full h-[50%] flex flex-row items-center justify-between">
          <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-b border-solid border-black">출석</div>
          <div className="w-[70%] h-full flex items-center justify-center border-0 border-b border-solid border-black">{memberCount}명</div>
        </div>
        {/* 하단 기타 */}
        <div className="w-full h-[50%] flex flex-row items-center justify-between">
          <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">기타</div>
          <div className="w-[70%] h-full flex items-center justify-center">{adultCount}명</div>
        </div>
      </div>
      {/* 오른쪽 */}
      <div className="w-[50%] h-full border border-solid border-black">
        <div className="w-full h-full flex flex-row items-center justify-between">
          <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">총인원</div>
          <div className="w-[70%] h-full flex items-center justify-center">{totalCount}명</div>
        </div>
      </div>
    </div>
  )
}
