import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const MenuDrawer = ({ open, setOpen }) => {
  const Navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(false);
  };

  const handleGoToNews = () => {
    Navigate("/news");
  };

  const handleGoToAttendance = () => {
    Navigate("/attendance");
  };

  const handleGoToBirthday = () => {
    Navigate("/birthday");
  };

  const DrawerList = (
    <Box rol="presentation">
      <DrawerTop>
        <ExitIcon onClick={toggleDrawer} />
      </DrawerTop>
      <List>
        <ListButton>
          <ListIcon>
            <ListCheckIcon />
          </ListIcon>
          <ListText onClick={handleGoToNews}>소식</ListText>
        </ListButton>
        <ListButton>
          <ListIcon>
            <ListCheckIcon />
          </ListIcon>
          <ListText onClick={handleGoToAttendance}>출석</ListText>
        </ListButton>
        <ListButton>
          <ListIcon>
            <ListCheckIcon />
          </ListIcon>
          <ListText onClick={handleGoToBirthday}>생일</ListText>
        </ListButton>
      </List>
    </Box>
  );

  return (
    <>
      <DrawerWrapper open={open} onClose={toggleDrawer} anchor="right">
        {DrawerList}
      </DrawerWrapper>
    </>
  );
};

const DrawerTop = styled(Stack)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 48px;
  margin-bottom: 12px;
  background-color: #fffcf6;
  box-sizing: border-box;
  box-shadow: 0px 5px 5px -1px rgba(0, 0, 0, 0.1);
`;

const ExitIcon = styled(ClearIcon)`
  margin: auto 10px;
  font-size: 25px;
`;

const ListButton = styled(ListItemButton)`
  margin-left: 10px;
`;

const ListIcon = styled(ListItemIcon)`
  min-width: 30px;
`;

const ListCheckIcon = styled(CheckIcon)`
  font-weight: 900;
  color: black;
`;

const ListText = styled(ListItemText)`
  display: flex;
  margin: 5px;
  font-family: Inter;
  font-weight: 700;
  font-size: 20px;
`;

const DrawerWrapper = styled(Drawer)`
  .MuiDrawer-paper {
    width: 70%;
  }
`;

export default MenuDrawer;
