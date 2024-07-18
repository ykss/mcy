import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@mui/material/styles"

import Main from "./pages/Main"
import MyPage from "./pages/MyPage"
import BirthDay from "./pages/BirthDay"
import Attendance from "./pages/Attendance"
import AttendanceStatus from "./pages/AttendanceStatus"
import News from "./pages/News"
import UserSelect from "./pages/UserSelect"
import Login from "./pages/Login"
// import ReaderAdmin from "./pages/ReaderAdmin.jsx";
// import MemberAdmin from "./pages/MemberAdmin.jsx";
import theme from "./assets/theme/theme.js"

import "./App.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/birthDay" element={<BirthDay />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendancestatus" element={<AttendanceStatus />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          {/* 셀 관리 페이지 */}
          {/* <Route path="/reader-admin" element={<ReaderAdmin />} /> */}
          {/* <Route path="/member-admin" element={<MemberAdmin />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
