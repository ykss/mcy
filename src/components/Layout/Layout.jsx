import { useState } from "react"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"

import MenuDrawer from "./MenuDrawer"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  )
}

const ContentWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100dvh - 120px);
`

export default Layout
