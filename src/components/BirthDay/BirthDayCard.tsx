import dayjs from "dayjs"
import calendar from "../../../public/birthday/calendar.svg"
const BirthDayCard = ({ name, date }: { name: string; date: string }) => {
  return (
    <div className="text-sm font-bold w-[160px] h-[91px] bg-white flex flow-row items-center justify-start rounded-[13px] border border-solid border-black overflow-hidden box-border">
      {/* 왼쪽 라인  */}
      <div className="w-[18px] h-full bg-[#F3C5C5] border border-solid border-r-black border-l-0"></div>
      {/* 날짜 */}
      <div className="w-full h-full p-[16px] box-border flex flex-col justify-between">
        {/* 날짜 = 상단 */}
        <div className="w-full h-[25%] flex flow-row items-center justify-between">
          {/* 왼쪽 영역 */}
          <div className="flex flow-row items-center justify-start gap-2">
            <div className="w-[20px] h-[20px]">
              <img src={calendar} alt="calendar" className="w-full" />
            </div>
            <div className="text-[14px]">{dayjs(date).format("DD")}일</div>
          </div>
          {/* 오른쪽 영역 */}
          <div className="text-[#999999] text-[14px]">{dayjs(date).format("ddd")}</div>
        </div>
        {/* 하단 이름 */}
        <div className="w-full h-[50%] flex flow-row items-center justify-start box-border">
          <div className="text-[20px]">{name}</div>
        </div>
      </div>

      {/* <div>{dayjs(date).format("DD")}일</div>
      <div>{name}</div> */}
    </div>
  )
}

export default BirthDayCard
