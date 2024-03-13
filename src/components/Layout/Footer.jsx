import { Stack, Typography, styled } from "@mui/material";

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <Typography fontSize="12px">MCY</Typography>
        <Typography fontSize="12px">
          Copyright 2024. MCY all rights reserved.
        </Typography>
      </FooterWrapper>
    </>
  );
};

const FooterWrapper = styled(Stack)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  background-color: #f4f1e9;
`;
export default Footer;
