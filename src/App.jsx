import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ThemeProvider } from "@mui/material/styles"

import Main from "./pages/Main"
import MyPage from "./pages/MyPage"
import BirthDay from "./pages/BirthDay"
import Attendance from "./pages/Attendance"
import News from "./pages/News"
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
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/birthDay" element={<BirthDay />} />
          <Route path="/news" element={<News />} />
          <Route path="/attendance" element={<Attendance />} />
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
