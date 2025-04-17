import "./index.css"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import MyPage from "./pages/MyPage"
import BirthDay from "./pages/BirthDay.tsx"
// import Attendance from "./pages/Attendance"
// import News from "./pages/News"
import { Login, Main } from "./pages/index"
import PAGE_PATH from "./constants/path"
// import theme from "./assets/theme/theme"
// import AttendanceStatus from "./pages/AttendanceStatus"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_PATH.MAIN} element={<Main />} />
        <Route path={PAGE_PATH.LOGIN} element={<Login />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        <Route path={PAGE_PATH.BIRTHDAY} element={<BirthDay />} />
        {/* <Route path="/attendance" element={<Attendance />} /> */}
        {/* 소식 페이지(나중에 사용하면 다시 주석 해제) */}
        {/* <Route path="/news" element={<News />} /> */}
        {/* <Route path="/attendanceStatus" element={<AttendanceStatus />} /> */}
        {/* 셀 관리 페이지 */}
        {/* <Route path="/reader-admin" element={<ReaderAdmin />} /> */}
        {/* <Route path="/member-admin" element={<MemberAdmin />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
