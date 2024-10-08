import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@mui/material/styles"

import Main from "./pages/Main"
import MyPage from "./pages/MyPage"
import BirthDay from "./pages/BirthDay"
import Attendance from "./pages/Attendance"
import News from "./pages/News"
import Login from "./pages/Login"
import theme from "./assets/theme/theme.js"
import AttendanceStatus from "./pages/AttendanceStatus.jsx"

import "./App.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/birthDay" element={<BirthDay />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/news" element={<News />} />
          <Route path="/" element={<Login />} />
          <Route path="/attendanceStatus" element={<AttendanceStatus />} />
          {/* 셀 관리 페이지 */}
          {/* <Route path="/reader-admin" element={<ReaderAdmin />} /> */}
          {/* <Route path="/member-admin" element={<MemberAdmin />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
