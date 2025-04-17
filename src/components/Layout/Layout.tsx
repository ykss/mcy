import { useState } from "react"

// import MenuDrawer from "./MenuDrawer"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  return (
    <div className="max-w-[450px] w-full h-[100dvh] bg-[#fffcf6] mx-auto">
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      {/* <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} /> */}
      <div className="w-full h-[calc(100dvh-160px)] bg-[#FFFCF6]">{children}</div>

      <Footer />
    </div>
  )
}

export default Layout
