import React from "react";
import { Stack, styled } from "@mui/material";

import MenuDrawer from "./MenuDrawer";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <MenuDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  );
};

export default Layout;

const ContentWrapper = styled(Stack)`
  height: calc(100dvh - 120px);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
