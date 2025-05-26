import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { Button } from "../ui/button"
import dayjs from "dayjs"

interface DateSelectorProps {
  currentSunday: dayjs.Dayjs
  onPrevWeek: () => void
  onNextWeek: () => void
}

export const DateSelector = ({ currentSunday, onPrevWeek, onNextWeek }: DateSelectorProps) => {
  return (
    <div className="w-full px-[5%] flex flex-row items-center justify-center gap-[30px] box-border ">
      <Button className="bg-[#F0F0F0] border-none shadow-none" variant="outline" size="icon" onClick={onPrevWeek}>
        <ChevronLeftIcon className="w-5 h-5 stroke-[2px] cursor-pointer" />
      </Button>
      <div className="text-[20px] font-semibold">{currentSunday.format("YYYY.MM.DD")}</div>
      <Button className="bg-[#F0F0F0] border-none shadow-none" variant="outline" size="icon" onClick={onNextWeek}>
        <ChevronRightIcon className="w-5 h-5 stroke-[2px] cursor-pointer" />
      </Button>
    </div>
  )
}
