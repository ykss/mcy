import React from "react";
import dayjs from "dayjs";
import { Stack, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import ChurchIcon from "@mui/icons-material/Church";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";
import Layout from "../components/Layout/Layout";
import Title from "../components/shared/Title";

const Attendance = () => {
  const [value, setValue] = React.useState(new Date());
  const [openCalendar, setOpenCalendar] = React.useState(false);

  const handleChange = (newData) => {
    setValue(newData);
    setOpenCalendar(false);
  };

  const settings = {
    MuiInputBase: {
      input: {
        // fontSize: "200px",
        backgroundColor: "blue",
        color: "red",
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
        },
      },
    },
  };
  return (
    <Layout>
      <AttendanceWapper>
        <TitleWapper sx={{ height: "20%" }}>
          <ChurchIcon sx={{ fontSize: 40 }} />
          <Title>출석</Title>
        </TitleWapper>
        <CalendarWapper sx={{ height: "10%" }}>
          <ArrowLeftIcon />
          <LocalizationProvider dateAdapter={AdapterDayjs} {...settings}>
            <MobileDatePicker
              defaultValue={dayjs(value)}
              onChange={handleChange}
              format="YYYY.MM.DD"
              open={openCalendar}
              onOpen={() => setOpenCalendar(true)}
              onClose={() => setOpenCalendar(false)}
            />
          </LocalizationProvider>
          <ArrowRightIcon />
          <SettingsIcon />
        </CalendarWapper>
        <ReaderWapper sx={{ height: "20%" }}></ReaderWapper>
        <CounterWapper sx={{ height: "5%" }}></CounterWapper>
        <DataWapper sx={{ height: "50%" }}></DataWapper>
      </AttendanceWapper>
    </Layout>
  );
};
export default Attendance;

const AttendanceWapper = styled(Stack)`
  width: 90%;
  height: calc(90dvh - 120px);
`;

const TitleWapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 10%;
  gap: 15px;
  padding: 0 10px;
`;

const CalendarWapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
`;

const ReaderWapper = styled(Stack)`
  border: 1px solid green;
`;
const CounterWapper = styled(Stack)`
  border: 1px solid red;
`;
const DataWapper = styled(Stack)`
  border: 1px solid purple;
`;
