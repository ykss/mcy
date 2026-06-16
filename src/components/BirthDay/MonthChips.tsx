const MonthChips = ({
  selectedMonth,
  onSelect,
}: {
  selectedMonth: number
  onSelect: (month: number) => void
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-[clamp(14px,4vw,18px)] font-bold">월 선택</div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`px-4 py-1.5 rounded-full text-[clamp(12px,3.2vw,14px)] font-medium border transition-colors ${
              month === selectedMonth
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-[#7C7C7C] border-[#D9D9D9]"
            }`}
          >
            {month}월
          </button>
        ))}
      </div>
    </div>
  )
}

export default MonthChips
