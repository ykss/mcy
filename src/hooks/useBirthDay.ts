import { useState, useEffect } from "react"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { McyBirthdayApi } from "../api/mcyBirthdayApi"
import { BirthdayInfo } from "../types/BirthdayInfo"

dayjs.extend(customParseFormat)

const useBirthDay = () => {
  const [birthDayData, setBirthDayData] = useState<BirthdayInfo[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month() + 1)

  useEffect(() => {
    McyBirthdayApi()
      .then(data => setBirthDayData(data))
      .catch(error => console.error("Error fetching data: ", error))
  }, [])

  const selectedData = birthDayData.filter(item => {
    if (!item.date) return false
    const month = parseInt(item.date.split("-")[0], 10)
    return month === selectedMonth
  })

  return { selectedMonth, setSelectedMonth, selectedData }
}

export default useBirthDay
