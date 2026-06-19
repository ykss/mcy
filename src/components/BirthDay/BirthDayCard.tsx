import dayjs from "dayjs"

const calendar = "/birthday/calendar.svg"

const BirthDayCard = ({ name, date }: { name: string; date: string }) => {
  const [month, day] = date.split("-")
  const dayNum = day ? day.replace(/^0/, "") : ""
  const safeDate = month && day ? `2000-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : ""
  const weekDay = safeDate ? dayjs(safeDate).format("ddd") : ""

  return (
    <div className="w-full h-[22vw] xs:h-[22vw] sm:h-[23vw] lg:h-[24vw] bg-white flex flex-row items-center justify-start rounded-[13px] border border-solid border-[#E5E5E5] overflow-hidden box-border">
      {/* 왼쪽 라인 */}
      <div className="w-[3vw] h-full bg-[#F3C5C5]  "></div>
      {/* 내용 */}
      <div className="w-full h-full p-[3.5vw] box-border flex flex-col justify-between">
        {/* 상단: 날짜 */}
        <div className="w-full h-[25%] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-[1.5vw]">
            <div className="w-[4.5vw] h-[4.5vw]">
              <img src={calendar} alt="calendar" className="w-full" />
            </div>
            <div className="text-[clamp(11px,3.2vw,14px)] font-semibold text-gray-700">{dayNum}일</div>
          </div>
          <div className="text-[#999999] text-[clamp(11px,3.2vw,14px)]">{weekDay}</div>
        </div>
        {/* 하단: 이름 */}
        <div className="w-full h-[50%] flex flex-row items-center justify-start box-border">
          <div className="text-[clamp(15px,4.8vw,20px)] font-bold text-gray-800">{name}</div>
        </div>
      </div>
    </div>
  )
}

export default BirthDayCard
