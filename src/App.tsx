import "./index.css"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import MyPage from "./pages/MyPage"
// import Attendance from "./pages/Attendance"
// import News from "./pages/News"
import { Login, Main, BirthDay, AttendanceCheck, AttendanceStatus } from "./pages/index"
import PAGE_PATH from "./constants/path"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_PATH.MAIN} element={<Main />} />
        <Route path={PAGE_PATH.LOGIN} element={<Login />} />
        <Route path={PAGE_PATH.BIRTHDAY} element={<BirthDay />} />
        <Route path={PAGE_PATH.ATTENDANCE_CHECK} element={<AttendanceCheck />} />
        <Route path={PAGE_PATH.ATTENDANCE_STATUS} element={<AttendanceStatus />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
