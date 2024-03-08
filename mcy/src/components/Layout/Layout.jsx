/* eslint-disable react/prop-types */

import { Stack, Typography, styled } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </>
  );
};

const ContentWrapper = styled(Stack)`
height: calc(100dvh - 120px);
flex-direction: row;
justify-content: center;
align-items: center;
`;
export default Layout;
