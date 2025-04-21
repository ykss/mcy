import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"

// import MenuDrawer from "./MenuDrawer"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const isRootPath = location.pathname === "/"

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  return (
    <div className="max-w-[450px] w-full h-full mx-auto bg-[#FFFCF6]">
      <Toaster />
      {!isRootPath && <Header setIsDrawerOpen={setIsDrawerOpen} />}
      {/* <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} /> */}
      <div className={`w-full h-main-calc`}>{children}</div>
    </div>
  )
}

export default Layout
