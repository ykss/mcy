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
    <div className="w-full flex flex-col items-center gap-1 py-4">
      <p className="text-xs text-[#9B9B9B] tracking-widest font-medium">출석 현황 · ATTENDANCE</p>
      <div className="flex items-center gap-6 mt-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevWeek}
          className="w-10 h-10 rounded-xl bg-white border border-black/10 shadow-sm text-[#2C2722] hover:bg-white"
        >
          <ChevronLeftIcon className="w-4 h-4 stroke-[2px]" />
        </Button>
        <p className="text-[clamp(26px,8vw,32px)] font-bold text-[#2C2722] tracking-tight">
          {currentSunday.format("YYYY.MM.DD")}
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextWeek}
          className="w-10 h-10 rounded-xl bg-white border border-black/10 shadow-sm text-[#2C2722] hover:bg-white"
        >
          <ChevronRightIcon className="w-4 h-4 stroke-[2px]" />
        </Button>
      </div>
      <p className="text-xs text-[#9B9B9B] font-medium">주일</p>
    </div>
  )
}
