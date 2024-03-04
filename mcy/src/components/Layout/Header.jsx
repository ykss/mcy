import { Stack, styled, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <>
      <HeaderWrapper
        borderBottom="1px solid #000"
        justifyContent="center"
        padding="5px"
      >
        <Typography fontWeight="bold">MCY</Typography>
      </HeaderWrapper>
      <HeaderWrapper justifyContent="flex-end">
        <IconButton>
          <MenuIcon></MenuIcon>
        </IconButton>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  width: 100vw;
  position: fixed;
  top: 0;
`;

export default Header;
