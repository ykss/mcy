import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ setOpen }) => {
  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Typography fontWeight="bold">MCY</Typography>
        </LogoWrapper>
        <MenuIconWrapper>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcons />
          </IconButton>
        </MenuIconWrapper>
      </HeaderWrapper>
    </>
  );
};

const LogoWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw; 
`;

const MenuIconWrapper = styled(Stack)`
  position: absolute;
  top: 5px;
  right: 1%; 
`;

const MenuIcons = styled(MenuIcon)`
  color: #000;
`;

const HeaderWrapper = styled(Stack)`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #feedcd;
  width: 100vw;
`;

export default Header;