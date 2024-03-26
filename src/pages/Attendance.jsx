import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Stack, styled } from "@mui/material";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChurchIcon from "@mui/icons-material/Church";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";
import Layout from "../components/Layout/Layout";
import Title from "../components/shared/Title";
import { mcyMember } from "../data/mcyMember";

const Attendance = () => {
  const [value, setValue] = React.useState(dayjs());
  const [isOpenCalendar, setIsOpenCalendar] = React.useState(false);
  const [selectedLeader, setSelectedLeader] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (newData) => {
    setValue(newData);
    setIsOpenCalendar(false);
  };

  const handlePrevDayClick = () => {
    const newDate = dayjs(value).subtract(1, "day");
    setValue(newDate);
  };

  const handleNextDayClick = () => {
    const newDate = dayjs(value).add(1, "day");
    setValue(newDate);
  };

  const handleLeaderClick = (cell) => {
    setSelectedLeader(cell);
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const handleCalendarClick = () => {
    setIsOpenCalendar(true);
  };
  return (
    <Layout>
      <AttendanceWrapper>
        <TitleWrapper sx={{ height: "20%" }}>
          <ChurchIcon sx={{ fontSize: 40 }} />
          <Title>출석</Title>
        </TitleWrapper>
        <CalendarWrapper sx={{ height: "10%" }}>
          <DateWrapper>
            <ArrowIconWrapper
              onClick={handlePrevDayClick}
              icon={ArrowLeftIcon}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <CalendarMonthIcon
                onClick={handleCalendarClick}
                onChange={handleChange}
              />
              <MobileDateWrapper
                value={value}
                onChange={handleChange}
                format="YYYY.MM.DD"
                open={isOpenCalendar}
                onClose={() => setIsOpenCalendar(false)}
              />
            </LocalizationProvider>
            <ArrowIconWrapper
              onClick={handleNextDayClick}
              icon={ArrowRightIcon}
            />
          </DateWrapper>
          <SettingsWrapper>
            <SettingsIcon />
          </SettingsWrapper>
        </CalendarWrapper>
        <LeaderWrapper>
          {mcyMember.map((item) => {
            return (
              <ChipItem key={item.id}>
                <Chip
                  label={item.cell}
                  onClick={() => handleLeaderClick(item.cell)}
                  color={selectedLeader === item.cell ? "secondary" : "info"}
                  sx={{
                    width: "100%",
                    height: "80%",
                    border: "2px solid #c27979",
                    fontWeight: "700",
                    fontSize: "10px",
                    color: selectedLeader === item.cell ? "#fff" : "#000",
                  }}
                />
              </ChipItem>
            );
          })}
        </LeaderWrapper>
        <CounterWrapper sx={{ height: "5%" }}></CounterWrapper>
        <DataWrapper>
          {mcyMember.map((leader) => {
            if (leader.cell === selectedLeader) {
              return leader.cellMember.map((member) => (
                <Stack
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={member.member}
                >
                  <Checkbox onClick={handleCheck} isChecked={isChecked} />
                  <Typography>{member.member}</Typography>
                </Stack>
              ));
            }
            return null;
          })}
        </DataWrapper>
      </AttendanceWrapper>
    </Layout>
  );
};
export default Attendance;

const AttendanceWrapper = styled(Stack)`
  width: 90%;
  height: calc(90dvh - 120px);
`;

const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 10%;
  gap: 15px;
  padding: 0 10px;
`;

const CalendarWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateWrapper = styled(Stack)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ArrowIconWrapper = styled(({ icon: IconComponent, ...props }) => (
  <IconComponent {...props} />
))`
  color: #69535f;
  font-size: 35px;
  font-weight: 700;
`;

const MobileDateWrapper = styled(MobileDatePicker)`
  width: 40%;
  & .MuiInputBase-root {
    justify-content: center;
    align-items: center;
    font-family: "Inter";
    font-weight: 600;
    font-size: 15px;
    padding: 0px;
  }
  & .MuiInputBase-input {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0px;
  }
`;

const SettingsWrapper = styled(Stack)`
  margin-left: auto;
`;

const LeaderWrapper = styled(Stack)`
  height: 20%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
`;

const ChipItem = styled(Stack)`
  width: 30%;
  height: 25%;
  margin-left: 10px;
`;

const CounterWrapper = styled(Stack)`
  border: 1px solid red;
`;

const DataWrapper = styled(Stack)`
  width: 100%;
  height: 50%;
  border: 1px solid #986c6c;
  border-radius: 8px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
