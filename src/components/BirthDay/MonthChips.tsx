const MonthChips = ({ selectedMonth, onSelect }: { selectedMonth: number; onSelect: (month: number) => void }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-[clamp(14px,4vw,18px)] font-bold">월 선택</div>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`w-full aspect-square rounded-xl text-[clamp(10px,2.8vw,13px)] font-medium whitespace-nowrap transition-colors ${
              month === selectedMonth ? "bg-[#B95D63] text-white" : "bg-white text-[#7C7C7C] border border-[#E5E5E5]"
            }`}>
            {month}월
          </button>
        ))}
      </div>
    </div>
  )
}

export default MonthChips
