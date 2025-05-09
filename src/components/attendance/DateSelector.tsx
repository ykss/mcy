import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"

interface DateSelectorProps {
  currentSunday: dayjs.Dayjs
  onPrevWeek: () => void
  onNextWeek: () => void
}

export const DateSelector = ({ currentSunday, onPrevWeek, onNextWeek }: DateSelectorProps) => {
  return (
    <div className="w-full px-[5%] flex flex-row items-center justify-center gap-[30px] box-border">
      <ChevronLeftIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={onPrevWeek} />
      <div className="text-[20px] font-semibold">{currentSunday.format("YYYY.MM.DD")}</div>
      <ChevronRightIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={onNextWeek} />
    </div>
  )
}
