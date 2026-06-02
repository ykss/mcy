import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuDrawer from "../components/Layout/MenuDrawer"
import MainHeader from "../components/Main/MainHeader"
import HeroSection from "../components/Main/HeroSection"
import MissionSection from "../components/Main/MissionSection"
import GoalsSection from "../components/Main/GoalsSection"
import WeeklySection from "../components/Main/WeeklySection"
import MainFooter from "../components/Main/MainFooter"

const Main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="bg-[#FAF5EA] text-[#2C2722] min-h-screen border-0">
      <MainHeader onMenuClick={() => setIsDrawerOpen(true)} />
      <HeroSection />
      <MissionSection />
      <GoalsSection />
      <WeeklySection />
      <MainFooter />
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} />
    </div>
  )
}

export default Main
