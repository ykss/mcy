import { useState } from "react"

// import Stack from "@mui/material/Stack"
// import { styled } from "@mui/material"

// import MenuDrawer from "./MenuDrawer"
// import Header from "./Header"
// import Footer from "./Footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  return (
    <div className="w-[200px] h-[100vh] bg-red-600">
      안녕
      {/* <Header setIsDrawerOpen={setIsDrawerOpen} /> */}
      {/* <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
