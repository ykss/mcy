import { useState } from "react"
import { useLocation } from "react-router-dom"

import MainHeader from "../Main/MainHeader"
import { useNavigate } from "react-router-dom"
import MenuDrawer from "./MenuDrawer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const isRootPath = location.pathname === "/"

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className="w-full h-full mx-auto bg-[#FAF5EA]">
      {!isRootPath && <MainHeader onMenuClick={() => setIsDrawerOpen(true)} solid />}
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} />
      <div className={`w-full mt-16 h-main-calc`}>{children}</div>
    </div>
  )
}

export default Layout
