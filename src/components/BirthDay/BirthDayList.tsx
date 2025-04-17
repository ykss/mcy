import dayjs from "dayjs"

const BirthDayList = ({ date, name }: { date: string; name: string }) => {
  return (
    <div className="text-sm font-bold w-[100px] h-[34px] bg-white flex flow-row items-center justify-around rounded-[5px] border border-solid border-black ">
      <div>{dayjs(date).format("DD")}일</div>
      <div>{name}</div>
    </div>
  )
}

export default BirthDayList
