import dayjs from "dayjs"

const BirthDayCard = ({ name, date }: { name: string; date: string }) => {
  const [month, day] = date.split("-")
  const dayNum = day ? day.replace(/^0/, "") : ""
  const safeDate = month && day ? `2000-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : ""
  const weekDay = safeDate ? dayjs(safeDate).format("ddd") : ""

  return (
    <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[clamp(12px,3.2vw,14px)]">📅</span>
          <span className="text-[clamp(12px,3.2vw,14px)] font-semibold">{dayNum}일</span>
        </div>
        <span className="text-[clamp(11px,3vw,13px)] text-[#999999]">{weekDay}</span>
      </div>
      <div className="text-[clamp(15px,4.5vw,20px)] font-bold">{name}</div>
    </div>
  )
}

export default BirthDayCard
