import { Stack, styled } from "@mui/material";
import React from "react";

import MenuDrawer from "./MenuDrawer";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  );
};

const ContentWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default Layout;
