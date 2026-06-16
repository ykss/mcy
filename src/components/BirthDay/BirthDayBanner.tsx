const BirthDayBanner = ({ month, count }: { month: number; count: number }) => {
  return (
    <div className="w-full bg-[#FDEAEA] rounded-2xl px-5 py-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
        🎂
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-[clamp(15px,4vw,18px)] font-bold text-gray-800">{month}월의 생일</div>
        <div className="text-[clamp(12px,3.2vw,14px)] text-gray-500">{count}명을 축하해요</div>
      </div>
    </div>
  )
}

export default BirthDayBanner
