import { useState } from "react"

// import MenuDrawer from "./MenuDrawer"
import Header from "./Header"
// import Footer from "./Footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  return (
    <div className="max-w-[450px] w-full h-[100dvh] bg-[#fffcf6] mx-auto">
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      {/* <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
